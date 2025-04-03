import { useRef, useEffect, useState } from 'react';
import './sw.css'

export default function Stopwatch(props){
    const [timeStr, setTimeStr] = useState("00:00,000");
    const [swState, setSwState] = useState(0); // bit 1 - started once, bit 0 - working now
    let timeStart = useRef(0);
    let swVal = useRef(0);
    let swValOnPause = useRef(0);
    
    useEffect(() => {         
        if(swState & 1) {
            let temp = Math.trunc(performance.now()) - timeStart.current - swValOnPause.current;
            let mins = Math.trunc((temp-(temp%1000))/60000);
            let secs = Math.trunc(((temp-(temp%1000))/1000)%60);
            let msecs = temp%1000;
            setTimeStr(mins + ":" + secs.toString().padStart(2, '0') + "," + msecs.toString().padStart(3, '0'));
            swVal.current = temp;
        }     
        else {
            if(swValOnPause.current != swVal.current)
                swValOnPause.current = swVal.current;
        }   
    }, [props])

    function startSW() {
        setSwState(3);
        timeStart.current = Math.trunc(performance.now());
    }

    function swPauseResume() {
        if(!(swState & 1)) timeStart.current += (Math.trunc(performance.now()) - timeStart.current - swValOnPause.current - swValOnPause.current);
        setSwState(swState ^ 1);
    }

    function swClear() {
        swVal.current = 0;
        swValOnPause.current = 0;
        timeStart.current = 0;
        setSwState(0);
        setTimeStr("00:00,000");
    }
   

    return(
        <>
            <div className="sw">
                <div className="cifr"><strong>{timeStr}</strong></div>
                <button className={"swBtn" + (!(swState & 2) ? " bVis" : " bInvis")} onClick={startSW}>START</button>
                <button className={"swBtn" + ((swState & 2) ? " bVis" : " bInvis")} onClick={swPauseResume}>{(swState & 1) ? "PAUSE" : "RESUME"}</button>
                <button className={"swBtn" + ((swState & 2) ? " bVis" : " bInvis")} onClick={swClear}>CLEAR</button>
                <button className={"swBtn"} onClick={() => props.rmHandler(props.id)}>REMOVE</button>
            </div>
        </>
    );
}
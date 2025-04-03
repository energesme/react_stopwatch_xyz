import { useEffect, useState, useCallback } from 'react'
import './App.css'
import Stopwatch from './sw'

function App() {
  const [stopWatches, setStopwatches] = useState([]);
  const [headText, setHeadText] = useState('ГДЕ МНЕ НАЙТИ СПИРТ?');
  const [curTime, setCurTime] = useState(performance.now());
  useEffect(() => { const interval = setInterval(() => setCurTime(Math.trunc(performance.now())), 33);
    return () => clearInterval(interval);
  }, []);

  const swRemove = useCallback((swId) => {
      stopWatches.splice(stopWatches.indexOf(swId), 1);
      if(stopWatches.length == 0) 
        setHeadText("ГДЕ МНЕ НАЙТИ СПИРТ?");
    }
  )
  
  return (
    <>
      <div id="header">{headText}</div>
      <div id="pole">     
          {stopWatches.map((sw) => (<Stopwatch key={sw} time={curTime} id={sw} rmHandler={swRemove}/>))}  
      </div>
      <div className='menu'>
        <button className="menuBtn" onClick={() => { 
            if(stopWatches.length == 0) 
              setHeadText("Я НАШЁЛ АЛКОГОЛЬ!!!"); 
            setStopwatches([...stopWatches, stopWatches.length])
          }
        }>ADD</button>
      </div>
    </>
  )
}

export default App
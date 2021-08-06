import React from 'react';

const ComponentB = ({counter,onHandleCounter}) => {
   
    return ( 
        
         <div >
                  <div className="counter-label">{counter.name}   : </div>
                  <div  style = {{display : "inline-block"}}> {counter.count}</div>
                   {(counter.status === 'set' || counter.status === 'stopped') && <button className="counter-label " 
                            onClick = {()=>onHandleCounter(counter.name,'start')}>Start</button> }
                   {(counter.status === 'on') && <button className="counter-label" 
                           onClick = {()=>onHandleCounter(counter.name,'stop')}>Stop</button>}
                    {( counter.status === 'on') && <button className="counter-label" 
                    onClick = {()=>onHandleCounter(counter.name,'reset')}>Reset</button>}
                    
        </div>
        
        


    
     );
}
 
export default ComponentB;
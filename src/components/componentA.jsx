import React,{ useEffect,useReducer,useMemo, useRef} from 'react';
import ComponentB from './componentB';


function reducer(states,action){
    console.log(`TYPE : ${action.type}` )
    switch(action.type){
        case  'initialize':
            return [{name : 'count_A' , count : 0 ,status : 'set'},
                    {name : 'count_B' , count : 0 , status : 'set'},
                    {name : 'count_C' , count : 0 , status : 'set'},
                    {name : 'count_D' , count : 0 ,status : 'set'}];
         case 'start':   
                   
              return states.map(counter => { 
                 if(counter.name === action.payload.name){
                    counter.count = counter.count+1;                    
                 return {...counter,status : 'on'}
                }
                return counter;
              });
        case 'stop' :      
        
            return states.map(counter => {
                if(counter.name === action.payload.name){
            
                return {...counter, status : 'stopped' }
                }
                return counter;

            })
        case  'reset':
            return states.map(counter => { 
                if(counter.name === action.payload.name){
                   counter.count = 0;                   
                return {...counter,status : 'set'}
               }
               return counter;
             });

          default : 
            return states; 

            }

}



const ComponentA = () => {
   const [states,dispatch] = useReducer(reducer,[])
   const interval  = useRef([]);

   const handleCounter = (name,type) => {
    
    if (type === 'start'){
        
       interval.current[name] =  setInterval( () => {dispatch({type : type, payload : {name : name}})},1)  
    //    return () => clearInterval(interval);
    }
    else
      { 
        clearInterval(interval.current[name]); 
       dispatch({type : type, payload : {name : name}})
      } 
   }
     
  useEffect(()=> {
         dispatch({type : "initialize"});   
        //  return () => clearInterval(interval.current); 
    },[]);

 

 const memoComponent = useMemo(() => {
     return states.map( counter => 
        <ComponentB key = {counter.name} counter = {counter} onHandleCounter = {handleCounter}/>
    )
 },[states]);

    return (
        <> 
          <h1> Counters</h1>
          {/* {states.map( counter => 
              <ComponentB key = {counter.name} counter = {counter} onHandleCounter = {handleCounter}/>
          )} */}
          {memoComponent}
        </>
     );
}
 
export default ComponentA;
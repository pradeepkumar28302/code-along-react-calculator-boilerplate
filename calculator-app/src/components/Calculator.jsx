import React, { useReducer } from 'react';

const initState = {
  input:"",
  res:""
}
let operators = ["+","-","/","*"]
function reducer(state = initState,{type,payload}){
  switch(type){
    case "ADDITION":{
      let addOps = true;

      if(operators.includes(payload) && operators.includes(state.input.slice(state.input.length-1,state.input.length))){
        addOps = false;
      }
      else{
        addOps = true;
      }
      if(addOps){
        return{...state,input:state.input + payload}
      }
      return{...state}

    }
    case "CALCULATE":{
      const inpLen = state.input.length;

      if(!operators.includes(state.input.slice(inpLen-1,inpLen))){
        try{
          const result = eval(state.input);

          if(!Number.isFinite(result)){
            throw new Error("Cannot be divide by 0");
          }
          const newInp = {
            ...state,
            res: "",
            input:result.toString()
          }
          return newInp


        }catch(error){
          console.log(error)

        }

      }
      else{
        return{
          ...state,
          input:eval(state.input.slice(0,inpLen-1)).toString(),
          res:""
        }
      }

    }
    case "DELETE":{
      return{
        ...state,
        input: state.input.slice(0,state.input.length-1)
      }

    }
    case "CLEAR":{
      return{...state,input:"",res:""}

    }
    default:{
      return state;
    }
  }

}
const Calculator = () => {

  const[state,dispatch] = useReducer(reducer,initState)

  let handleClick = (val)=>{
    dispatch({type:"ADDITION",payload:val})
 
  }
  let handleCalc = ()=>{
    dispatch({type:"CALCULATE"})
  }
  let handleClear = ()=>{
    dispatch({type:"CLEAR"})
  }
  let handleDel = ()=>{
    dispatch({type:"DELETE"})
  }
  

  return (
    <div className="calculator">
      <div className="calculator-screen">
        <div id="div">{state.input}</div>
      </div>
      <div className="calculator-keys">
        <button className="key1" onClick={handleClear}>AC</button>
        <button className="key2" onClick={handleDel}>DEL</button>
        <button className="key3" onClick={handleCalc}>=</button>
        <button className="key" onClick={()=>handleClick("1")}>1</button>
        <button className="key" onClick={()=>handleClick("2")}>2</button>
        <button className="key" onClick={()=>handleClick("3")}>3</button>
        
        <button className="key" onClick={()=>handleClick("4")}>4</button>
        <button className="key" onClick={()=>handleClick("5")}>5</button>
        <button className="key" onClick={()=>handleClick("6")}>6</button>
        
        <button className="key" onClick={()=>handleClick("7")}>7</button>
        <button className="key" onClick={()=>handleClick("8")}>8</button>
        <button className="key" onClick={()=>handleClick("9")}>9</button>
        <button className="key" onClick={()=>handleClick("-")}>-</button>
        <button className="key" onClick={()=>handleClick("+")}>+</button>
        <button className="key" onClick={()=>handleClick("/")}>/</button>
        <button className="key" onClick={()=>handleClick(".")}>.</button>
        <button className="key" onClick={()=>handleClick("0")}>0</button>
        <button className="key" onClick={()=>handleClick("*")}>*</button>
      </div>
    </div>
  );
};

export default Calculator;
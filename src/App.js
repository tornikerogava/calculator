import React from 'react';
import './App.scss';
import { useState } from 'react';
import { evaluate} from 'mathjs';

const buttonArray=[
  {key:"0", id:"zero", func:"0", type:"num", trigger:13},
  {key:"1", id:"one", func:"1", type:"num", trigger:13},
  {key:"2", id:"two", func:"2", type:"num", trigger:13},
  {key:"3", id:"three", func:"3", type:"num", trigger:13},
  {key:"4", id:"four", func:"4", type:"num", trigger:13},
  {key:"5", id:"five", func:"5", type:"num", trigger:13},
  {key:"6", id:"six", func:"6", type:"num", trigger:13},
  {key:"7", id:"seven", func:"7", type:"num", trigger:13},
  {key:"8", id:"eight", func:"8", type:"num", trigger:13},
  {key:"9", id:"nine", func:"9", type:"num", trigger:13},
  {key:"×", id:"multiply", func:"*", type:"op", trigger:13},
  {key:"÷", id:"divide", func:"/", type:"op", trigger:13},
  {key:"+", id:"add", func:"+", type:"op", trigger:13},
  {key:".", id:"decimal", func:".", type:"dot", trigger:13},
  {key:"-", id:"subtract", func:"-", type:"minus", trigger:13},
  {key:"=", id:"equals", func:"=", type:"equals", trigger:13},
  {key:"AC", id:"clear", func:"AC", type:"AC", trigger:13},
  {key:"⌫", id:"backspace", func:"back", type:"back", trigger:13},
  {key:"M+", id:"memory add", func:"M+", type:"memory add", trigger:13},
  {key:"M-", id:"memory subtract", func:"M-", type:"memory subtract", trigger:13},
  {key:"MR", id:"memory recall", func:"MR", type:"memory recall", trigger:13},
  {key:"MC", id:"memory clear", func:"MC", type:"memory clear", trigger:13}
];
const operationsArray=["-", "+", "×", "÷"];
const numbersArray=["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

function App() {
  const [Calc, setCalc] = useState("0");
  const [Memory, setMemory] = useState("0");
  


  const handleClick = (obj) =>{
    switch (obj.type){
      case "AC":
       setCalc("0");
       break;
      
      case "num":
        if (Calc!="0"){
          setCalc(Calc + obj.key);
        } else{
          setCalc(obj.key);
        }
        break;
        
      case "op": 
        if (Calc[Calc.length-1] == "-" && operationsArray.includes(Calc[Calc.length-2])){
          setCalc(Calc.slice(0, Calc.length-2) + obj.key);
        }else if (operationsArray.includes(Calc[Calc.length-1])){
          setCalc(Calc.slice(0, Calc.length-1) + obj.key);
        } else {
          setCalc(Calc + obj.key);
        }
        break;

      case "minus":
        if (Calc[Calc.length-1] == "-" && operationsArray.includes(Calc[Calc.length-2])){
          setCalc(Calc.slice(0, Calc.length-2) + "-");
        } else {
          setCalc(Calc + "-")
        }
        break;

      case "dot":
        let lastIndex = Calc.lastIndexOf(".");
        let testString = Calc.substring(lastIndex);
        let operationBefore = false
        for (let i=0; i < operationsArray.length; i++){
          if (testString.includes(operationsArray[i])){
            operationBefore = true;
            break;
          }
        }
        if(!Calc.includes(".") && numbersArray.includes(Calc[Calc.length-1])){
         setCalc(Calc + ".")
        }else if(operationBefore && numbersArray.includes(Calc[Calc.length-1])){
          setCalc(Calc + ".")
        }
        break;

      case "back":
        if(Calc.length == 1){
          setCalc("0");
        } else {
          setCalc(Calc.slice(0, -1));
        }
        break;

      case "equals":
        let finalCalc = Calc.replace(/×/g, "*").replace(/÷/g, "/");
        setCalc(evaluate(finalCalc));
        break;

      case "memory add":
        setMemory(evaluate(Memory + "+" + Calc));
        break;

      case "memory subtract":
        setMemory(evaluate(Memory + "-" + Calc));
        break;
      
      case "memory clear":
        setMemory("0");
        break;

      case "memory recall":
        setCalc(Memory);
        break;
   }
  }

  const CreateButtons = () =>{
    return buttonArray.map((obj, index) => {
      return(
          <button className="button" id={obj.id} key={index} onClick={() => handleClick(obj)}>
            {obj.key}
          </button>
      )
    })
  };


  return (
    <div className="page">
      <div className="calculator">
        <div id="display-container">
          <div id="top-display">
          </div>
          <div id="display">
            {Calc}
            
          </div>
        </div>

        <div className="button-grid">
          {CreateButtons()}
        </div>
      </div>
    </div>
  );
}

export default App;

import React from 'react';
import './App.scss';
import { useState } from 'react';
import { evaluate, string } from 'mathjs';
import { callExpression } from '@babel/types';




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
  {key:"M+", id:"memory add", func:"M+", type:"memory", trigger:13},
  {key:"M-", id:"memory subtract", func:"M-", type:"memory", trigger:13},
  {key:"MR", id:"memory recall", func:"MR", type:"memory", trigger:13},
  {key:"MC", id:"memory clear", func:"MC", type:"memory", trigger:13}
]

const operationsArray=[
  "-", "+", "×", "÷"
]

function App() {
  const [Calc, setCalc] = useState("15");
  const [NumB, setNumB] = useState("");
  const [CurrentOP, setCurrentOP] = useState("");




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
        if (Calc[Calc.lenght-1] != "."){
          setCalc(Calc + ".")
        }
        break;

      case "equals":
        let calcTemp = Calc
        let finalCalc = calcTemp.replace(/×/, "*").replace(/÷/, "/");
        setCalc(evaluate(finalCalc));
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

import { useEffect, useState } from 'react'
import { Button } from './components/Button';
import { NumberButton } from './components/NumberButton';
import { OperationButton } from './components/OperationButton';

export interface Operation{
  value: string,
  symbol: string,
}

enum keys{
  Numpad0 = "Numpad0",
  Numpad1 = "Numpad1",
  Numpad2 = "Numpad2",
  Numpad3 = "Numpad3",
  Numpad4 = "Numpad4",
  Numpad5 = "Numpad5",
  Numpad6 = "Numpad6",
  Numpad7 = "Numpad7",
  Numpad8 = "Numpad8",
  Numpad9 = "Numpad9",
  NumpadDecimal = "NumpadDecimal",
  OperationDivide = "NumpadDivide",
  OperationMultiply = "NumpadMultiply",
  OperationSubtract = "NumpadSubtract",
  OperationAdd = "NumpadAdd",
  OperationSquareroot = "KeyS",
  OperationExponentiation = "KeyE",
  Backspace = "Backspace",
  Result = "NumpadEnter"
}

export enum operationSymbols{
  add= "+",
  subtract = "-",
  multiply = "x",
  divide = "/",
  exponentiation = "X²",
  squareRoot = "√x"
}

function App() {
  const [actualNumber, setActualNumber] = useState("");
  const [displayOutput, setDisplayOutput] = useState("0");
  const [lastOperationsText, setLastOperationsText] = useState<String>();
  const [isFirstText, setIsFirstText] = useState<Boolean>(true);
  const [numbers, setNumbers] = useState<Array<number>>([]);
  const [operations, setOperations] = useState<Operation[]>([])
  const [actualKey, setActualKey] = useState<string>()
  const [keyDetected, setKeyDetected] = useState<KeyboardEvent>();

  useEffect(() => {
    if(operations.length > 0) {
      let lastOp = operations[operations.length - 1];

      if(lastOp.value == "exponentiation" || lastOp.value == "squareRoot") {
        getResult();
      }
    }
  }, [operations])

  console.log(displayOutput);

  useEffect(() => {
    document.addEventListener("keydown", detectKeyUp, true);
  }, [])

  function detectKeyUp(e:KeyboardEvent){
    setKeyDetected(e);
    setActualKey(e.code); 
  }

  useEffect(() => {
    if(actualKey == keys.Backspace) ClearNumbers()
    if(actualKey == keys.Result) getResult()
  },[actualKey])

  function handleSetNumberText(num:  string) {
    if(!isFirstText) {
      setActualNumber(`${actualNumber}${num}`)
      setDisplayOutput(`${displayOutput}${num}`)
    }
    else {
      setActualNumber(num)
      setDisplayOutput(num)
      setIsFirstText(false);
    }
  }

  function handleSetNumbers(num: number) {
    let numbersArray: number[] = numbers;
    numbersArray.push(num);
    setNumbers(numbersArray);
  }

  function handleSetOperation(operation: string, symbol: string) {
    let lastOp = operations[operations.length - 1];
    if(isNaN(parseFloat(actualNumber)) == false) {
      handleSetNumbers(parseFloat(actualNumber))      
    } 
    
    if(displayOutput.length > 0) {
      if(isNaN(parseFloat(actualNumber)) == false) {
        setOperations([...operations,{value: operation, symbol: symbol}]) 
        setDisplayOutput(`${displayOutput} ${symbol} `)
      } else {
        const opsArray:Operation[] = operations;
        opsArray[operations.length - 1] = {value: operation, symbol: symbol}
        setOperations(opsArray)
        let text:string = displayOutput.replace(/.$/,symbol);
        console.log(text)
        setDisplayOutput(text)
      } 
    }
    setActualNumber("");
  }
  function Calculate() {
    let result: number = numbers[0];

    operations.forEach((op, index) => {
      switch (op.value) {
        case "add":
          result = result + numbers[index + 1]
          break;
        case "subtract":
          result = result - numbers[index + 1]
          break;
        case "multiply":
          console.log(`result: ${result}, index + 1: ${numbers[index + 1]}`)
          result = result * numbers[index + 1]
          break;
        case "divide":
          result = result / numbers[index + 1]
          break;
        case "exponentiation":
          console.log("exponentiation");
          result = result * result;
          break;
        case "squareRoot":
          result = Math.sqrt(result);
          break;
        default: result = 0
          break;
      }
    })

    return result;
  }

  function getResult() {
    handleSetNumbers(Number(actualNumber))
    let result = Calculate();   
    
    setNumbers([]);
    setOperations([])
    setActualNumber(result.toString());
    setIsFirstText(true);
    setLastOperationsText(displayOutput);
    setDisplayOutput(result.toString());
  }

  function ClearNumbers() {
    setDisplayOutput("0");
    setActualNumber("");
    setLastOperationsText("")
    setIsFirstText(true);
    setNumbers([]);
    setOperations([]);
  }

  return (
    <div className="App">
    <div className='calculator__container'>
      <h1>Calculator</h1>
    
    <div className='input-button__container'>
      <div className='input__container'>
       <input className='bg__light font__bold' type="text" value={displayOutput} readOnly/>
       <span>{lastOperationsText}</span>
      </div>
      <div className="buttons__container">
      <Button 
        text={"C"} 
        keycode={keys.Backspace} 
        actualKeyCode={actualKey} 
        keyDetected={keyDetected} 
        callback={ClearNumbers}
        styles={"button__clear button bg__light font__bold"}
      />

      <OperationButton 
        operation='exponentiation'
        operationSymbol='X²'
        handleSetOperation={handleSetOperation}
        keycode={keys.OperationExponentiation}
        actualKeyCode={actualKey}
        keyDetected={keyDetected }
      />
      <OperationButton 
        operation='squareRoot'
        operationSymbol='√x'
        handleSetOperation={handleSetOperation}
        keycode={keys.OperationSquareroot}
        actualKeyCode={actualKey}
        keyDetected={keyDetected }
      />
      <OperationButton 
        operation='divide'
        operationSymbol='/'
        handleSetOperation={handleSetOperation}
        keycode={keys.OperationDivide}
        actualKeyCode={actualKey}
        keyDetected={keyDetected }
      />

      {/* numbers */}
      
      
      <NumberButton num={"7"} setNumber={handleSetNumberText} keycode={keys.Numpad7      } actualKeyCode={actualKey} keyDetected={keyDetected}/>
      <NumberButton num={"8"} setNumber={handleSetNumberText} keycode={keys.Numpad8      } actualKeyCode={actualKey} keyDetected={keyDetected}/>
      <NumberButton num={"9"} setNumber={handleSetNumberText} keycode={keys.Numpad9      } actualKeyCode={actualKey} keyDetected={keyDetected}/>
      <OperationButton 
        operation='multiply'
        operationSymbol='x'
        handleSetOperation={handleSetOperation}
        keycode={keys.OperationMultiply}
        actualKeyCode={actualKey}
        keyDetected={keyDetected }
      />
      <NumberButton num={"4"} setNumber={handleSetNumberText} keycode={keys.Numpad4      } actualKeyCode={actualKey} keyDetected={keyDetected}/>
      <NumberButton num={"5"} setNumber={handleSetNumberText} keycode={keys.Numpad5      } actualKeyCode={actualKey} keyDetected={keyDetected}/>
      <NumberButton num={"6"} setNumber={handleSetNumberText} keycode={keys.Numpad6      } actualKeyCode={actualKey} keyDetected={keyDetected}/>
      <OperationButton 
        operation='subtract'
        operationSymbol='-'
        handleSetOperation={handleSetOperation}
        keycode={keys.OperationSubtract}
        actualKeyCode={actualKey}
        keyDetected={keyDetected }
      />
      <NumberButton num={"1"} setNumber={handleSetNumberText} keycode={keys.Numpad1      } actualKeyCode={actualKey} keyDetected={keyDetected}/>
      <NumberButton num={"2"} setNumber={handleSetNumberText} keycode={keys.Numpad2      } actualKeyCode={actualKey} keyDetected={keyDetected}/>
      <NumberButton num={"3"} setNumber={handleSetNumberText} keycode={keys.Numpad3      } actualKeyCode={actualKey} keyDetected={keyDetected}/>

      {/* operations */}
      <OperationButton 
        operation='add'
        operationSymbol='+'
        handleSetOperation={handleSetOperation}
        keycode={keys.OperationAdd}
        actualKeyCode={actualKey}
        keyDetected={keyDetected }
      />
      
      

      <NumberButton num={"0"} setNumber={handleSetNumberText} keycode={keys.Numpad0      } actualKeyCode={actualKey} keyDetected={keyDetected}/>
      <NumberButton num={"."} setNumber={handleSetNumberText} keycode={keys.NumpadDecimal} actualKeyCode={actualKey} keyDetected={keyDetected}/>
      {/* <button className='button button__result font__bold' onClick={getResult}>=</button> */}
      <Button 
        text={"="} 
        keycode={keys.Result} 
        actualKeyCode={actualKey} 
        keyDetected={keyDetected} 
        callback={getResult}
        styles={"button__result button bg__light"}
      />
      </div>
    </div>
    
    </div>
    <footer>
      <span>Made by: <a target="blank" href="https://github.com/h3nrey">Pedro Novaes</a> </span>
    </footer>
    </div>
  )
}

export default App

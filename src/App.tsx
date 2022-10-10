import { useEffect, useState } from 'react'
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
  const [displayOutput, setDisplayOutput] = useState("");
  const [numbers, setNumbers] = useState<Array<number>>([]);
  const [operations, setOperations] = useState<Operation[]>([])
  const [actualKey, setActualKey] = useState<string>()
  const [keyDetected, setKeyDetected] = useState<KeyboardEvent>();

  useEffect(() => {
    console.log("atualizou operations: "+ operations)
    if(operations.length > 0) {
      let lastOp = operations[operations.length - 1];
      handleSetNumbers(parseFloat(actualNumber))
      setActualNumber("");
      setDisplayOutput(`${displayOutput} ${lastOp.symbol}`)
      console.log("display: " + displayOutput);

      if(lastOp.value == "exponentiation" || lastOp.value == "squareRoot") {
        let result = Calculate();

        setNumbers([]);
        setOperations([])
        setActualNumber(result.toString());
        setDisplayOutput(result.toString());
      }
    }
  }, [operations])

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
    setActualNumber(`${actualNumber}${num}`)
    setDisplayOutput(`${displayOutput}${num}`)
  }

  function handleSetNumbers(num: number) {
    let numbersArray: number[] = numbers;
    numbersArray.push(num);
    setNumbers(numbersArray);
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
      let result: number = numbers[0];

      result = Calculate();   
      
      setNumbers([]);
      setOperations([])
      setActualNumber(result.toString());
      setDisplayOutput(result.toString());
  }

  function ClearNumbers() {
    setDisplayOutput("");
    setActualNumber("");
    setNumbers([]);
    setOperations([]);
  }

  return (
    <div className="App">
     <h1>Calculator</h1>


     <input type="text" value={displayOutput} readOnly/>
    
    <button onClick={ClearNumbers}>C</button>


     {/* numbers */}
    <NumberButton num={"."} setNumber={handleSetNumberText} keycode={keys.NumpadDecimal} actualKeyCode={actualKey} keyDetected={keyDetected}/>
    <NumberButton num={"0"} setNumber={handleSetNumberText} keycode={keys.Numpad0      } actualKeyCode={actualKey} keyDetected={keyDetected}/>
    <NumberButton num={"1"} setNumber={handleSetNumberText} keycode={keys.Numpad1      } actualKeyCode={actualKey} keyDetected={keyDetected}/>
    <NumberButton num={"2"} setNumber={handleSetNumberText} keycode={keys.Numpad2      } actualKeyCode={actualKey} keyDetected={keyDetected}/>
    <NumberButton num={"3"} setNumber={handleSetNumberText} keycode={keys.Numpad3      } actualKeyCode={actualKey} keyDetected={keyDetected}/>
    <NumberButton num={"4"} setNumber={handleSetNumberText} keycode={keys.Numpad4      } actualKeyCode={actualKey} keyDetected={keyDetected}/>
    <NumberButton num={"5"} setNumber={handleSetNumberText} keycode={keys.Numpad5      } actualKeyCode={actualKey} keyDetected={keyDetected}/>
    <NumberButton num={"6"} setNumber={handleSetNumberText} keycode={keys.Numpad6      } actualKeyCode={actualKey} keyDetected={keyDetected}/>
    <NumberButton num={"7"} setNumber={handleSetNumberText} keycode={keys.Numpad7      } actualKeyCode={actualKey} keyDetected={keyDetected}/>
    <NumberButton num={"8"} setNumber={handleSetNumberText} keycode={keys.Numpad8      } actualKeyCode={actualKey} keyDetected={keyDetected}/>
    <NumberButton num={"9"} setNumber={handleSetNumberText} keycode={keys.Numpad9      } actualKeyCode={actualKey} keyDetected={keyDetected}/>

     {/* operations */}
     <OperationButton 
      operation='add'
      operationSymbol='+'
      operations={operations}
      handleSetOperation={setOperations}
      keycode={keys.OperationAdd}
      actualKeyCode={actualKey}
      displayOutput={displayOutput}
      keyDetected={keyDetected }
     />
     <OperationButton 
      operation='subtract'
      operationSymbol='-'
      operations={operations}
      handleSetOperation={setOperations}
      keycode={keys.OperationSubtract}
      actualKeyCode={actualKey}
      displayOutput={displayOutput}
      keyDetected={keyDetected }
     />
     <OperationButton 
      operation='multiply'
      operationSymbol='x'
      operations={operations}
      handleSetOperation={setOperations}
      keycode={keys.OperationMultiply}
      actualKeyCode={actualKey}
      displayOutput={displayOutput}
      keyDetected={keyDetected }
     />
     <OperationButton 
      operation='divide'
      operationSymbol='/'
      operations={operations}
      handleSetOperation={setOperations}
      keycode={keys.OperationDivide}
      actualKeyCode={actualKey}
      displayOutput={displayOutput}
      keyDetected={keyDetected }
     />
     <OperationButton 
      operation='exponentiation'
      operationSymbol='X²'
      operations={operations}
      handleSetOperation={setOperations}
      keycode={keys.OperationExponentiation}
      actualKeyCode={actualKey}
      displayOutput={displayOutput}
      keyDetected={keyDetected }
     />
     <OperationButton 
      operation='squareRoot'
      operationSymbol='√x'
      operations={operations}
      handleSetOperation={setOperations}
      keycode={keys.OperationSquareroot}
      actualKeyCode={actualKey}
      displayOutput={displayOutput}
      keyDetected={keyDetected }
     />


     <button onClick={getResult}>=</button>
    </div>
  )
}

export default App

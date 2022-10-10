import { useEffect } from "react";
import { Operation, operationSymbols } from "../App";

interface OperationButtonProps {
  operation: string;
  operationSymbol: string;
  operations: Operation[];
  handleSetOperation(ops: Operation[]): void;
  displayOutput: string;
  actualKeyCode: string | undefined;
  keycode: string;
  keyDetected: KeyboardEvent | undefined;
}


export function OperationButton({handleSetOperation, 
  operation, 
  operations, 
  operationSymbol, 
  actualKeyCode, 
  keycode, 
  keyDetected,
  displayOutput}: OperationButtonProps) {

  useEffect(() => {
    if(actualKeyCode == keycode) {
      handleAddOperation()
    }
  }, [keyDetected])

  function handleAddOperation() {
    if(operations.length <= 0)
      handleSetOperation([...operations,{value: operation, symbol: operationSymbol}]) 
    else {
      const lastCharDisplay:string = displayOutput.charAt(displayOutput.length - 1);
      console.log("last char: " + lastCharDisplay);

      if(lastCharDisplay == operationSymbols.add || lastCharDisplay == operationSymbols.subtract ||  lastCharDisplay == operationSymbols.multiply || lastCharDisplay == operationSymbols.divide ||lastCharDisplay == operationSymbols.exponentiation ||lastCharDisplay == operationSymbols.squareRoot) {
          console.log("teste")
          const opArray = operations;
          opArray[opArray.length - 1] = {value: operation, symbol: operationSymbol};
          handleSetOperation([{value: operation, symbol: operationSymbol}]);
          console.log(operations);
      } else {
        handleSetOperation([...operations, {value: operation, symbol: operationSymbol}])
      }
    } 
  }
  return(
    <button onClick={() => {
      handleAddOperation()
    }}
    >
      {operationSymbol}
    </button>
  )
}
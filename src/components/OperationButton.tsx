import { useEffect } from "react";
import { Operation, operationSymbols } from "../App";

interface OperationButtonProps {
  operation: string;
  operationSymbol: string;
  handleSetOperation(operation: string, symbol: string): void;
  actualKeyCode: string | undefined;
  keycode: string;
  keyDetected: KeyboardEvent | undefined;
}


export function OperationButton({handleSetOperation, 
  operation,
  operationSymbol, 
  actualKeyCode, 
  keycode, 
  keyDetected}: OperationButtonProps) {

  useEffect(() => {
    if(actualKeyCode == keycode) {
      handleSetOperation(operation, operationSymbol)
    }
  }, [keyDetected])

  return(
    <button onClick={() => handleSetOperation(operation, operationSymbol)}
    >
      {operationSymbol}
    </button>
  )
}
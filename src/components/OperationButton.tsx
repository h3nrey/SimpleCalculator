import { useEffect, useState } from "react";
import { Operation, operationSymbols } from "../App";

interface OperationButtonProps {
  operation: string;
  operationSymbol: string;
  handleSetOperation(operation: string, symbol: string): void;
  actualKeyCode: string | undefined;
  keycode: string;
  keyDetected: KeyboardEvent | undefined;
}

const stylesClasses = "button bg__light"
export function OperationButton({handleSetOperation, 
  operation,
  operationSymbol, 
  actualKeyCode, 
  keycode, 
  keyDetected}: OperationButtonProps) {
  const [activeClasses, setActiveClasses] = useState<string>();

  useEffect(() => {
    if(actualKeyCode == keycode) {
      handleSetOperation(operation, operationSymbol)
      setActiveClasses(`${stylesClasses} active`)
    } else setActiveClasses(`${stylesClasses}`)
  }, [keyDetected])

  return(
    <button className={activeClasses} onClick={() => handleSetOperation(operation, operationSymbol)}
    >
      {operationSymbol}
    </button>
  )
}
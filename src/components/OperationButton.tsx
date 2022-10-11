import { useEffect, useState } from "react";
import { Operation, operationSymbols } from "../App";
import { Button } from "./Button";

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
  return(
    // <button className={activeClasses} onClick={() => handleSetOperation(operation, operationSymbol)}
    // >
    //   {operationSymbol}
    // </button>
    <Button 
    text={operationSymbol} 
    keycode={keycode} 
    actualKeyCode={actualKeyCode} 
    keyDetected={keyDetected} 
    callback={() => handleSetOperation(operation, operationSymbol)}
    styles={"button bg__light"}
    />
  )
}
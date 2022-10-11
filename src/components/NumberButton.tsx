import { useEffect, useState } from "react";
import { Button } from "./Button";

interface NumberButtonProps {
  num: string;
  setNumber(num: string): void;
  keycode: string;
  actualKeyCode: string | undefined;
  keyDetected: KeyboardEvent | undefined;
}

const stylesClasses = "button bg__light"
export function NumberButton({num, setNumber, keycode, actualKeyCode, keyDetected}: NumberButtonProps) {

  return(
    <Button 
    text={num} 
    keycode={keycode} 
    actualKeyCode={actualKeyCode} 
    keyDetected={keyDetected} 
    callback={() => setNumber(num)}
    styles="button bg__light"
    />
  )
}
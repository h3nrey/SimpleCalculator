import { useEffect } from "react";

interface NumberButtonProps {
  num: string;
  setNumber(num: string): void;
  keycode: string;
  actualKeyCode: string | undefined;
  keyDetected: KeyboardEvent | undefined;
}

export function NumberButton({num, setNumber, keycode, actualKeyCode, keyDetected}: NumberButtonProps) {
  useEffect(() => {
    if(actualKeyCode == keycode) {
      setNumber(num);
    }
  }, [keyDetected])
  
  return(
    <button onClick={() => setNumber(num)}>{num}</button>
  )
}
import { useEffect, useState } from "react";

interface NumberButtonProps {
  num: string;
  setNumber(num: string): void;
  keycode: string;
  actualKeyCode: string | undefined;
  keyDetected: KeyboardEvent | undefined;
}

const stylesClasses = "button bg__light"
export function NumberButton({num, setNumber, keycode, actualKeyCode, keyDetected}: NumberButtonProps) {
  const [activeClasses, setActiveClasses] = useState<string>();

  useEffect(() => {
    if(actualKeyCode == keycode) {
      setNumber(num);
      setActiveClasses(`${stylesClasses} active`)
    } else setActiveClasses(`${stylesClasses}`)
  }, [keyDetected])
  
  return(
    <button className={activeClasses} onClick={() => setNumber(num)}>
      {num}
    </button>
  )
}
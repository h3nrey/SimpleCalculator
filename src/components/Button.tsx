import { useEffect, useState } from "react"
interface NumberButtonProps {
  text: string;
  keycode: string;
  actualKeyCode: string | undefined;
  keyDetected: KeyboardEvent | undefined;
  callback(...args:any): void;
  styles: string;
}

export function Button({text, keycode, actualKeyCode, keyDetected, callback, styles} : NumberButtonProps) {
  const [activeClasses, setActiveClasses] = useState<string>();
  useEffect(() => {
    if(actualKeyCode == keycode) {
      callback(...arguments);
      setActiveClasses(`${styles} active`)
    } else setActiveClasses(`${styles}`)
  }, [keyDetected])
  return(
    <button className={activeClasses} onClick={() => callback(...arguments)}>
      {text}
    </button>
  )
}
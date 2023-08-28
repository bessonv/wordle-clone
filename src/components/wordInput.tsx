import { KeyboardEvent, ChangeEvent, FormEvent, useState, useRef, BaseSyntheticEvent, useEffect } from "react";

interface InputProps {
  isDisabled: boolean;
  isIncorrectInput: (warn: boolean) => void;
  submitWord: (word: string) => void;
}

function WordInput({isDisabled = false, isIncorrectInput, submitWord}: InputProps) {

  const [inputArray, setInputArray] = useState<string[]>([...Array(5).fill("")]);
  const [currentFocusIndex, setCurrentFocusIndex] = useState<number>(0);
  const inputRefs = useRef<Array<HTMLInputElement> | []>([]);

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  const handleInput = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const inputValue = e.target.value;

    const prevArray = inputArray;
    prevArray[index] = String(inputValue).toLowerCase();
    setInputArray(prevArray);
    isIncorrectInput(false);
    if (inputValue === "") {
      return;
    }

    if (index <= inputArray.length - 2) {
      setCurrentFocusIndex(index + 1);
      if (inputRefs && inputRefs.current && index === currentFocusIndex) {
        inputRefs.current[index + 1].focus();
      }
    }
  }

  const handleSubmit = (e: FormEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const word = inputArray.join("");
    if (word.length !== 5) return isIncorrectInput(true);

    submitWord(word);
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Enter") {
      handleSubmit(e);
      return;
    }
    if (e.key === "Backspace") {
      if (index === 0) {
        setCurrentFocusIndex(0);
        return;
      }
      setCurrentFocusIndex(index - 1);
      if (inputRefs && inputRefs.current && index === currentFocusIndex) {
        inputRefs.current[index - 1].focus();
      }
      return;
    }
  }

  const onFocus = (e: BaseSyntheticEvent, index: number) => {
    setCurrentFocusIndex(index);
    e.target.focus();
  }

  return (
    <div className="input">
      {
        inputArray.map((_, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            disabled={isDisabled}
            ref={(el) => el && (inputRefs.current[index] = el)}
            onChange={e => handleInput(e, index)}
            onKeyUp={e => handleKeyPress(e, index)}
            onFocus={e => onFocus(e, index)}
          />
        ))
      }
      <button className="submit-button" disabled={isDisabled} onClick={e => handleSubmit(e)}>Submit</button>
    </div>
  )
}

export default WordInput;
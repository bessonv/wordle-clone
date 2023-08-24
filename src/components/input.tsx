import { ChangeEvent, FormEvent, useState } from "react";

interface InputProps {
  isIncorrectInput: (warn: boolean) => void;
  submitWord: (word: string) => void;
}

function Input({isIncorrectInput, submitWord}: InputProps) {

  const [word, setWord] = useState<string>('');

  const checkInput = (e: ChangeEvent<HTMLInputElement>) => {
    const word = e.target.value;
    setWord(word);
    if (word.length > 5) return isIncorrectInput(true);
    isIncorrectInput(false);
  }

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (word.length !== 5) return isIncorrectInput(true);

    submitWord(word);
  }

  return (
    <div className="input">
      <input type="text" maxLength={5} onChange={e => checkInput(e)} />
      <button onClick={e => handleSubmit(e)}>Submit</button>
    </div>
  )
}

export default Input;
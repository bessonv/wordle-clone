import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import './App.css'

const defaultWord = 'craft';
const array: string[] = [];
array.fill('', 0);

function App() {
  
  const [current, setCurrent] = useState(0);
  const [warning, setWarning] = useState<boolean>(false);
  const [currentWord, setCurrentWord] = useState<string>('');
  const [answers, setAnswers] = useState<string[]>([]);
  const [endMessage, setEndMessage] = useState<string>('');

  useEffect(() => {
  }, []);

  const checkInput = (e: ChangeEvent<HTMLInputElement>) => {
    const word = e.target.value;
    setCurrentWord(word);
    if (word.length > 5) return setWarning(true);
    setWarning(false);
  }

  const checkAnswer = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (currentWord.length > 5 || currentWord.length < 0) return setWarning(true);

    if (currentWord === defaultWord) {
      setEndMessage(`You Win! The word is ${defaultWord}`);
      return;
    }

    setAnswers([...answers, currentWord]);
    setCurrent(current + 1);
    setCurrentWord('');

    if (answers.length >= 4) {
      setEndMessage(`You Lose! The word is ${defaultWord}`);
      return;
    }
  }

  return (
    <>
      { warning ? <p className='warning'>Please input 5 letter word</p> : ''}
      { <p className="endMessage">{endMessage}</p> }
      {
        [...Array(5)].map((answer, index) => {
          if (index === current) {
            return (
              <p key={index}>
                <input onChange={e => checkInput(e)} />
                <button onClick={e => checkAnswer(e)}>Submit</button>
              </p>
            );
          } else {
            return <p key={index}>{answers[index] ?? ''}</p>;
          }
        })
      }
    </>
  )
}

export default App

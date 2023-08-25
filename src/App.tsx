import { useEffect, useState } from 'react';
import './App.css'
import GameBoard from './components/gameboard';

function App() {

  const [loading, setLoading] = useState<boolean>(true);
  const [word, setWord] = useState<string>('');
  useEffect(() => {
    fetch('https://random-word-api.herokuapp.com/word?length=5')
      .then(response => response.json())
      .then(data => {
        setWord(data[0]);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <header>Wordle-Clone</header>
      <div className="rules">
      <p>Welcome to wordle-clone.
      You have 6 chances to guess a 5-letter word. The color of the letter represent how close your guess to the word.</p>
      <p className='colors'><ul>
        <li><span className="green">green</span> - letter on the correct spot</li>
        <li><span className="yellow">yellow</span> - letter is in the word but in the wron spot</li>
        <li><span className="gray">gray</span> - letter is not in the word.</li>
      </ul></p>
      </div>
      {
        loading ? '' : <GameBoard answerWord={word}/>
      }
    </>
  )
}

export default App

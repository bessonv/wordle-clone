import './App.css'
import GameBoard from './components/gameboard';

const defaultWord = 'craft';

function App() {
  return (
    <>
      <header>Wordle-Clone</header>
      <div className="rules">
      <p>Welcome to wordle-clone.
      You have 6 chances to guess a 5-letter word. The color of the letter represent how close your guess to the word.</p>
      <ul>
        <li><span className="green">green</span> - letter on the correct spot</li>
        <li><span className="yellow">yellow</span> - letter is in the word but in the wron spot</li>
        <li><span className="gray">gray</span> - letter is not in the word.</li>
      </ul>
      </div>
      <GameBoard answerWord={defaultWord}/>
    </>
  )
}

export default App

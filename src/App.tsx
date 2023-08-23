import './App.css'
import GameBoard from './components/gameboard';

const defaultWord = 'craft';

function App() {
  return (
    <GameBoard answerWord={defaultWord}/>
  )
}

export default App

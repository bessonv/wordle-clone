import { useState } from "react";
import InfoMessage from "./infoMessage";
import WordInput from "./wordInput";
import Answer from "./answer";

interface GameBoardProps {
  answerWord: string;
}

type Answer = {
  word: string,
  colors: string[]
}

function GameBoard({answerWord}: GameBoardProps) {
  
  const [tryCount, setTryCount] = useState(0);
  const [warning, setWarning] = useState<boolean>(false);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const [endState, setEndState] = useState<boolean>(false);
  const [winState, setWinState] = useState<boolean>(false);

  const checkAnswer = (word: string) => {
    if (word.length !== 5) return setWarning(true);

    const colorsArray: string[] = [];
    word.split('').map((letter, index) => {
      let color = "gray";
      const answerLetterArray = answerWord.split('');
      for (let answerIndex = 0; answerIndex < answerLetterArray.length; answerIndex++) {
        const answerLetter = answerLetterArray[answerIndex];
        if (letter === answerLetter) {
          color = "yellow";
        }
        if (letter === answerLetter && index === answerIndex) {
          color = "green";
          break;
        }
      }
      colorsArray.push(color);
    });

    const answer: Answer = {
      word: word,
      colors: colorsArray
    }
    setAnswers([...answers, answer]);
    setTryCount(tryCount + 1);

    if (word === answerWord) {
      setEndState(true);
      setWinState(true);
      return;
    }

    if (answers.length >= 5) {
      setEndState(true);
      setWinState(false);
      return;
    }
  }

  return (
    <div className="game-board">
      <InfoMessage 
        showEndMessage={endState}
        isWin={winState}
        word={answerWord}
        showWarning={warning}
      />
      {
        [...Array(6)].map((_, index) => {
          if (index === tryCount) {
            return (
              <WordInput
                key={index}
                isDisabled={winState}
                isIncorrectInput={(showWarning) => setWarning(showWarning)}
                submitWord={(word) => checkAnswer(word)}
              />
            );
          } else {
            return (
              <Answer
                key={index}
                word={answers[index]?.word} 
                lettersColor={answers[index]?.colors}
              />
            )
          }
        })
      }
    </div>
  )
}

export default GameBoard
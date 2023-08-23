
interface AnswerProps {
  word: string;
  lettersColor: string[];
}

function Answer({word, lettersColor}: AnswerProps) {
  return (
    <>
    {
      (word && lettersColor) ?
      <p>
        {
          word.split('').map((letter, index) => (
            <span className={lettersColor[index]}>{letter}</span>
          ))
        }
      </p>
      :
      ''
    }
    </>
  )
}

export default Answer;

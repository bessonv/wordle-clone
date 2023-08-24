
interface AnswerProps {
  word: string;
  lettersColor: string[];
}

function Answer({word, lettersColor}: AnswerProps) {
  return (
    <div className="answer">
      {
        (word && lettersColor) ?
          word.split('').map((letter, index) => (
            <span key={index} className={lettersColor[index]}>{letter}</span>
          ))
        :
        [...Array(5)].map((_, index) => (
          <span key={index}>
            <b className="blank"></b>
          </span>
        ))
      }
    </div>
  )
}

export default Answer;

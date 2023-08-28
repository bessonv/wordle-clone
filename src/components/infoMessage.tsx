
interface InfoMessageProps {
  showEndMessage: boolean;
  isWin: boolean;
  word: string;
  showWarning: boolean;
}

function InfoMessage({showEndMessage = false, isWin, word, showWarning}: InfoMessageProps) {
  return (
    <>
      { 
        showEndMessage ? <p className="end-message">
          {
            (isWin ? 'You Win!' : 'You Lose!') + ' The word is '
          }<b>{word.toUpperCase()}</b></p>
        : '' }
      { showWarning ? <p className="warning-message">The word must be 5 letters long</p> : '' }
    </>
  )
}

export default InfoMessage;

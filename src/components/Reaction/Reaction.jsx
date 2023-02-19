import { useState } from 'react';
import './Reaction.css';
const Reaction = () => {
  const [timer, setTimer] = useState(0);
  const [difference, setDifference] = useState(0);
  const [gameState, setGameState] = useState(0);
  const [timeoutID, setTimeoutID] = useState('hello');
  const random = () => {
    setGameState(1);
    setTimeoutID(
      setTimeout(() => {
        setTimer(new Date());
        setGameState(2);
      }, Math.random() * 4000 + 1000)
    );
  };
  const stopTimer = () => {
    setDifference(new Date() - timer);
    setGameState(3);
  };
  const wrongClick = () => {
    clearTimeout(timeoutID);
    setGameState(4);
  };
  const restart = () => {
    setGameState(0);
    setDifference(0);
    setTimer(0);
  };
  return (
    <div>
      {gameState === 0 && (
        <div className="game-state-0" onClick={random}>
          Start
        </div>
      )}
      {gameState === 1 && (
        <div className="game-state-1" onClick={wrongClick}>
          Wait
        </div>
      )}
      {gameState === 2 && (
        <div className="game-state-2" onClick={stopTimer}>
          CLICK!!
        </div>
      )}
      {gameState === 3 && (
        <div>
          <div className="game-state-3">{difference} ms</div>
          <button type="button" onClick={restart}>
            Play Again
          </button>
        </div>
      )}
      {gameState === 4 && (
        <div>
          <div className="game-state-3">Too early</div>
          <button type="button" onClick={restart}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default Reaction;

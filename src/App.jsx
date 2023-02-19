import { useState } from 'react';
import './App.css';

const App = () => {
  const scoreArray = ['0', '15', '30', '40', 'AD'];
  const [player1Points, setPlayer1Points] = useState(0);
  const [player2Points, setPlayer2Points] = useState(0);
  const [winner, setWinner] = useState('');

  const player1Win = () => {
    if (
      (player1Points === 3 && player2Points < 3) ||
      (player1Points === 4 && player2Points === 3)
    ) {
      setPlayer1Points(0);
      setPlayer2Points(0);
      setWinner('Player1 win');
    } else if (player1Points === 3 && player2Points === 4) {
      setPlayer2Points((prev) => prev - 1);
    } else setPlayer1Points((prev) => prev + 1);
  };

  const player2Win = () => {
    if (
      (player2Points === 3 && player1Points < 3) ||
      (player2Points === 4 && player1Points === 3)
    ) {
      setPlayer2Points(0);
      setPlayer1Points(0);
      setWinner('Player2 win');
    } else if (player2Points === 3 && player1Points === 4) {
      setPlayer1Points((prev) => prev - 1);
    } else setPlayer2Points((prev) => prev + 1);
  };

  return (
    <div>
      <div>
        <div>{winner}</div>
        <div>{scoreArray[player1Points]}</div>
        <div>{scoreArray[player2Points]}</div>
      </div>
      <div>
        <div onClick={player1Win}>Player1</div>
        <div onClick={player2Win}>Player2</div>
      </div>
    </div>
  );
};

export default App;

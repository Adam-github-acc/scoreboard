import { useState } from 'react';
import './App.css';

const App = () => {
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
      setPlayer2Points((prev) => prev--);
    } else setPlayer1Points((prev) => prev++);
  };

  return <div className="App"></div>;
};

export default App;

import { useState } from 'react';
import './App.css';
import Reaction from './components/Reaction/Reaction';

const App = () => {
  const scoreArray = ['0', '15', '30', '40', 'AD'];
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [player1Points, setPlayer1Points] = useState(0);
  const [player2Points, setPlayer2Points] = useState(0);
  const [player1Game, setPlayer1Game] = useState(0);
  const [player2Game, setPlayer2Game] = useState(0);
  const [winner, setWinner] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlayer1Name(e.target[0].value);
    setPlayer2Name(e.target[1].value);
  };

  const winCheck = (winner) => {
    setPlayer1Game(0);
    setPlayer2Game(0);
    setWinner(winner);
  };

  const player1Win = () => {
    if (
      (player1Points === 3 && player2Points < 3) ||
      (player1Points === 4 && player2Points === 3)
    ) {
      setPlayer1Points(0);
      setPlayer2Points(0);
      if (
        player1Game >= 5 &&
        player1Game !== player2Game &&
        player1Game > player2Game
      )
        winCheck(player1Name);
      else setPlayer1Game((prev) => prev + 1);
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
      if (
        player2Game >= 5 &&
        player1Game !== player2Game &&
        player1Game < player2Game
      )
        winCheck(player2Name);
      else setPlayer2Game((prev) => prev + 1);
    } else if (player2Points === 3 && player1Points === 4) {
      setPlayer1Points((prev) => prev - 1);
    } else setPlayer2Points((prev) => prev + 1);
  };

  return !player1Name && !player2Name ? (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Player 1 name:
          <input type="text" name="Player1" defaultValue={''} />
        </label>
        <label>
          Player 2 name:
          <input type="text" name="Player2" defaultValue={''} />
        </label>
        <button type="submit">Play Game</button>
      </form>
    </div>
  ) : (
    <div>
      <div>
        {winner && <div>Winner: {winner}</div>}
        <div>
          {player1Name} {player1Game} {scoreArray[player1Points]}
        </div>
        <div>
          {player2Name} {player2Game} {scoreArray[player2Points]}
        </div>
      </div>
      <div>
        <div onClick={player1Win}>Player1</div>
        <div onClick={player2Win}>Player2</div>
      </div>
      <Reaction />
    </div>
  );
};

export default App;

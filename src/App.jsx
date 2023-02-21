import { useState } from 'react';
import './App.css';
import { Square } from './components/Square';

const App = () => {
  const scoreArray = ['0', '15', '30', '40', 'AD'];
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [player1Points, setPlayer1Points] = useState(0);
  const [player2Points, setPlayer2Points] = useState(0);
  const [player1Game, setPlayer1Game] = useState(0);
  const [player2Game, setPlayer2Game] = useState(0);
  const [winner, setWinner] = useState('');
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);
  const [starter, setStarter] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlayer1Name(e.target[0].value);
    setPlayer2Name(e.target[1].value);
  };

  const handleRestart = () => {
    setIsX(starter);
    setStarter((prev) => !prev);
    setSquares(Array(9).fill(null));
  };

  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = isX ? 'X' : 'O';
    setSquares(squares);
    setIsX(!isX);
  };

  const calculateWinner = (squares) => {
    const winningPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningPatterns.length; i++) {
      const [a, b, c] = winningPatterns[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        if (squares[a] === 'X') player1Win();
        else player2Win();
      }
    }
    return null;
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
      <form onSubmit={handleSubmit} className="name-input">
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
      {winner && <div>Winner: {winner}</div>}
      <div className="scoreboard">
        <div className="player-names">
          <div>{player1Name}</div>
          <div className="middle">Players</div>
          <div>{player2Name}</div>
        </div>
        <div className="games">
          <div>{player1Game}</div>
          <div className="middle">Game</div>
          <div>{player2Game}</div>
        </div>
        <div className="points">
          <div>{scoreArray[player1Points]}</div>
          <div className="middle">Points</div>
          <div>{scoreArray[player2Points]}</div>
        </div>
      </div>
      <div>
        <div onClick={player1Win}>Player1</div>
        <div onClick={player2Win}>Player2</div>
      </div>
      <div className="board">
        <div>
          {squares.map((square, i) => (
            <Square key={i} value={square} onClick={() => handleClick(i)} />
          ))}
        </div>
        <div className="status">{status}</div>
        <button className="restart" onClick={handleRestart}>
          Restart Game!
        </button>
      </div>
    </div>
  );
};

export default App;

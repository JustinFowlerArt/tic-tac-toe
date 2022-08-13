import React, { useState } from 'react';
import Board from './Board';
import calculateWinner from '../../utility/CalculateWinner';

function Game() {
  const [gameHistory, setGameHistory] = useState([
    {
      squares: Array(9).fill(null),
    },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [location, setLocation] = useState(null);

  const handleClick = i => {
    const history = gameHistory.slice(0, stepNumber + 1);
    const current = history[gameHistory.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    setLocation(i);
    squares[i] = xIsNext ? 'X' : 'O';

    setGameHistory(
      gameHistory.concat([
        {
          squares: squares,
        },
      ])
    );
    setStepNumber(history.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = step => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const current = gameHistory[stepNumber];
  const winner = calculateWinner(current.squares);
  const currentLocation = current.squares[location];

  const moves = gameHistory.map((step, move) => {
    const desc = move
      ? `Go to move #${move} ${currentLocation}`
      : 'Go to game start';
    const selected = stepNumber === move ? 'selected' : '';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)} className={selected}>
          {desc}
        </button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (stepNumber === 9) {
    status = 'Draw';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div className='game'>
      <div className='game-board'>
        <Board squares={current.squares} onClick={i => handleClick(i)} />
      </div>
      <div className='game-info'>
        <div>{status}</div>
        <ol>{moves}</ol>
        <button>Sort</button>
      </div>
    </div>
  );
}
export default Game;

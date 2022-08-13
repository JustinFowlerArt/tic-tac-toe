import React from 'react';
import Square from './Square';

function Board(props) {
  const renderSquare = i => {
    return (
      <Square
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
        key={i}
      />
    );
  };

  const BoardRows = quantity => {
    let counter = 0;
    const rows = [];
    for (let i = 0; i < quantity; i++) {
      const squares = [];
      for (let i = 0; i < 3; i++) {
        squares.push(renderSquare(counter));
        counter++;
      }
      rows.push(
        <div key={i} className='board-row'>
          {squares}
        </div>
      );
    }
    return rows;
  };

  return <div>{BoardRows(3)}</div>;
}

export default Board;

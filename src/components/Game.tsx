import { useState } from 'react';
import { Board } from './Board';
import calculateWinner from '../utility/CalculateWinner';

export type Squares = string | null;

type HistoryState = {
	squares: Squares[];
};

type GameHistory = HistoryState[];

export const Game = () => {
	const [gameHistory, setGameHistory] = useState<GameHistory>([
		{
			squares: Array(9).fill(null),
		},
	]);
	const [stepNumber, setStepNumber] = useState(0);
	const [xIsNext, setXIsNext] = useState(true);
	const [reverseHistory, setReverseHistory] = useState(false);
	// const [location, setLocation] = useState(null);

	const handleClick = (i: number) => {
		const history = gameHistory.slice(0, stepNumber + 1);
		const current = history[history.length - 1];
		const squares = current.squares.slice();
		if (calculateWinner(squares) || squares[i]) {
			return;
		}

		// setLocation(i);
		squares[i] = xIsNext ? 'X' : 'O';

		setGameHistory(
			history.concat([
				{
					squares: squares,
				},
			])
		);
		setStepNumber(history.length);
		setXIsNext(!xIsNext);
	};

	const jumpTo = (step: number) => {
		setStepNumber(step);
		setXIsNext(step % 2 === 0);
	};

	const current = gameHistory[stepNumber];
	const winner = calculateWinner(current.squares);
	// const currentLocation = current.squares[location];

	const moves = gameHistory.map((_, move) => {
		const desc = move
			? `Go to move #${move}`
			: // ${currentLocation}
			  'Go to game start';
		const selected = stepNumber === move ? 'selected' : '';
		return (
			<li key={move}>
				<button onClick={() => jumpTo(move)} className={selected}>
					{desc}
				</button>
			</li>
		);
	});

	let status: string;
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
				<Board squares={current.squares} handleClick={handleClick} />
			</div>
			<div className='game-info'>
				<div>{status}</div>
				<ol>
					{reverseHistory ? moves.reverse().map(el => el) : moves.map(el => el)}
				</ol>
				<button onClick={() => setReverseHistory(!reverseHistory)}>Sort</button>
			</div>
		</div>
	);
};

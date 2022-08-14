import { useEffect, useState } from 'react';
import { Board } from './Board';
import { calculateWinner } from '../utility/CalculateWinner';
import { positions } from '../utility/Positions';

export type Squares = string | null;

type HistoryState = {
	squares: Squares[];
	position: number | null;
};

type GameHistory = HistoryState[];

export const Game = () => {
	const [gameHistory, setGameHistory] = useState<GameHistory>([
		{
			squares: Array(9).fill(null),
			position: null,
		},
	]);
	const [stepNumber, setStepNumber] = useState(0);
	const [xIsNext, setXIsNext] = useState(true);
	const [reverseHistory, setReverseHistory] = useState(false);
	const [winningSquare, setWinningSquare] = useState<number | null>(null);

	const current = gameHistory[stepNumber];
	const winner = calculateWinner(current.squares);

	const moves = gameHistory.map((step, move) => {
		const desc = move
			? `Go to move #${move} - ${
					step.position !== null && positions(step.position)
			  }`
			: 'Go to game start';
		return (
			<li key={move}>
				<button
					onClick={() => jumpTo(move)}
					className={stepNumber === move ? 'font-bold' : ''}
				>
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

	useEffect(() => {
		if (winner) {
			setWinningSquare(current.position);
		}
	}, [winner, current.position]);

	const handleClick = (i: number) => {
		const history = gameHistory.slice(0, stepNumber + 1);
		const current = history[history.length - 1];
		const squares = current.squares.slice();
		if (calculateWinner(squares) || squares[i]) {
			return;
		}

		squares[i] = xIsNext ? 'X' : 'O';

		setGameHistory(
			history.concat([
				{
					squares: squares,
					position: i,
				},
			])
		);
		setStepNumber(history.length);
		setXIsNext(!xIsNext);
	};

	const jumpTo = (step: number) => {
		setStepNumber(step);
		setXIsNext(step % 2 === 0);
        setWinningSquare(null)
	};

	return (
		<div className='flex justify-center h-screen w-screen p-10'>
			<div className='flex flex-col md:flex-row'>
				<Board
					squares={current.squares}
					winningSquare={winningSquare}
					handleClick={handleClick}
				/>
				<aside className='w-48 mt-5 md:mt-0 md:ml-5'>
					<div className='mb-1'>{status}</div>
					<ol className='pl-8'>
						{reverseHistory
							? moves.reverse().map(el => el)
							: moves.map(el => el)}
					</ol>
					<button onClick={() => setReverseHistory(!reverseHistory)}>
						Sort
					</button>
				</aside>
			</div>
		</div>
	);
};

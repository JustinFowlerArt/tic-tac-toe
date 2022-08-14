import { Squares } from './Game';
import { Square } from './Square';

interface Props {
	squares: Squares[];
    winningSquare: number | null
	handleClick: (i: number) => void;
}

export const Board = ({ squares, winningSquare, handleClick }: Props) => {
	const BoardRows = (rowCount: number, squareCount: number) => {
		let counter = 0;
		const rows: JSX.Element[] = [];
		for (let i = 0; i < rowCount; i++) {
			const squares: JSX.Element[] = [];
			for (let i = 0; i < squareCount; i++) {
				squares.push(renderSquare(counter));
				counter++;
			}
			rows.push(renderRows(i, squares));
		}
		return rows;
	};

	const renderRows = (i: number, squares: JSX.Element[]) => (
		<div key={i} className='board-row'>
			{squares}
		</div>
	);

	const renderSquare = (i: number) => (
		<Square key={i} index={i} value={squares[i]} winningSquare={winningSquare} handleClick={handleClick} />
	);

	return <div>{BoardRows(3, 3)}</div>;
};

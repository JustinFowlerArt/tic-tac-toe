import { Squares } from './Game';
import { Square } from './Square';

interface Props {
	squares: Squares[];
	handleClick: (i: number) => void;
}

export const Board = ({ squares, handleClick }: Props) => {
	const BoardRows = (quantity: number) => {
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

    const renderSquare = (i: number) => {
		return (
			<Square key={i} index={i} value={squares[i]}  handleClick={handleClick} />
		);
	};

	return <div>{BoardRows(3)}</div>;
};

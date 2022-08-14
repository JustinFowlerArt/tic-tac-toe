import { Squares } from './Game';

interface Props {
	index: number;
	value: Squares;
	winningSquare: number | null;
	handleClick: (i: number) => void;
}

export const Square = ({ index, value, winningSquare, handleClick }: Props) => {
	return (
		<button
			className={`border border-slate-800 font-bold text-4xl h-full aspect-square text-center ${
				winningSquare && winningSquare === index ? 'border-red-500 border-2' : ''
			}`}
			onClick={() => handleClick(index)}
		>
			{value}
		</button>
	);
};

import { Squares } from './Game';

interface Props {
    index: number
	value: Squares
    winningSquare: number | null
    handleClick: (i: number) => void;
}

export const Square = ({ index, value, winningSquare, handleClick }: Props) => {
	return (
		<button className={`square ${winningSquare && winningSquare === index && 'winner'}`} onClick={() => handleClick(index)}>
			{value}
		</button>
	);
};

interface Props {
    index: number
	value: string | null;
	handleClick: (i: number) => void;
}

export const Square = ({ index, value, handleClick }: Props) => {
	return (
		<button className='square' onClick={() => handleClick(index)}>
			{value}
		</button>
	);
};

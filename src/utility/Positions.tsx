export const positions = (position: number) => {
	let rowPosition = 0;
	let colPosition = 0;

	const rows = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
	];
	const cols = [
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
	];

	rows.forEach((row, i) => {
		if (row.includes(position)) {
			rowPosition = i + 1;
			return;
		}
	});
	cols.forEach((col, i) => {
		if (col.includes(position)) {
			colPosition = i + 1;
			return;
		}
	});
	return [colPosition, rowPosition];
};

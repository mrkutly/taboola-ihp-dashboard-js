export default ({ rows, headers }) => {
	const formattedRows = rows.map((row) => row.join()).join('\n');
	const csvContent = `data:text/csv;charset=utf-8,${headers.join()}\n${formattedRows}`;
	const encodedUri = encodeURI(csvContent);
	return encodedUri;
};

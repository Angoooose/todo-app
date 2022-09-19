export const getTimestamp = (date: string|number|Date) => {
	return new Date(date).toLocaleString('en-US', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	});
}
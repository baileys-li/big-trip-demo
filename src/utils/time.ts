import dayjs, { type Dayjs } from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(duration);
dayjs.extend(relativeTime);

function getFormattedDiff(first: Dayjs, second: Dayjs) {
	const diff = Math.abs(second.diff(first));
	const fullFormatted = dayjs.duration(diff).format('DD[D] HH[H] mm[M]');

	return fullFormatted
		.split(' ')
		.filter((chunk) => !/00\w/.test(chunk))
		.join(' ');
}

export { dayjs, getFormattedDiff };

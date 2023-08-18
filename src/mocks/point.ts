import dayjs from 'dayjs';
import { Point } from '../types/point';
import { getRandomBoolean, getRandomInteger } from '../utils/random';

const enum RandomTimeUpperBorder {
	DAY = 7,
	HOUR = 23,
	MINUTE = 59,
}

let lastDate = dayjs()
	.subtract(getRandomInteger(0, RandomTimeUpperBorder.DAY), 'day')
	.subtract(getRandomInteger(0, RandomTimeUpperBorder.HOUR), 'hour')
	.subtract(getRandomInteger(0, RandomTimeUpperBorder.MINUTE), 'minute');

function getDates() {
	const dateFrom = lastDate
		.add(getRandomInteger(0, RandomTimeUpperBorder.HOUR), 'hour')
		.add(getRandomInteger(0, RandomTimeUpperBorder.MINUTE), 'minute');
	const dateTo = dateFrom
		.add(getRandomInteger(0, RandomTimeUpperBorder.DAY + 4), 'day')
		.add(getRandomInteger(0, RandomTimeUpperBorder.HOUR), 'hour')
		.add(getRandomInteger(0, RandomTimeUpperBorder.MINUTE), 'minute');

	lastDate = dateTo;

	return {
		dateFrom,
		dateTo,
	};
}

export const mockPoint = (destination: Point['destination'], offers: Point['offers'], type: Point['type']): Point => ({
	id: crypto.randomUUID(),
	basePrice: getRandomInteger(50, 2000),
	...getDates(),
	destination,
	isFavorite: getRandomBoolean(),
	offers,
	type,
});

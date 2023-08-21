import dayjs from 'dayjs';
import { Point } from '../types/point';
import { getRandomBoolean, getRandomInteger } from '../utils/random';

function getDates() {
	const dateFrom = dayjs()
		.subtract(getRandomInteger(0, 7), 'day')
		.subtract(getRandomInteger(0, 23), 'hour')
		.subtract(getRandomInteger(0, 59), 'minute');
	const dateTo = dateFrom
		.add(getRandomInteger(0, 7), 'day')
		.add(getRandomInteger(0, 23), 'hour')
		.add(getRandomInteger(0, 59), 'minute');

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

import { CITIES } from '../constants';
import type { Picture, Destination } from '../types/destinations';
import { getRandomElement, getRandomInteger } from '../utils/random';

const MESSAGES = [
	'Hello world.',
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	'Cras aliquet varius magna, non porta ligula feugiat eget.',
	'Fusce tristique felis at fermentum pharetra.',
	'Aliquam id orci ut lectus varius viverra.',
	'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
	'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
	'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
	'Sed sed nisi sed augue convallis suscipit in sed felis.',
	'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.',
	'In rutrum ac purus sit amet tempus.',
];

const mockDescription = () => Array.from({ length: getRandomInteger(1, 5) }, () => getRandomElement(MESSAGES)).join(' ');

const mockPicture = (city: string): Picture => ({
	src: `https://loremflickr.com/248/152/${city}?random=${getRandomInteger(1, 10)}`,
	description: mockDescription(),
});

const mockDestination = (name: string): Destination => ({
	id: crypto.randomUUID(),
	description: mockDescription(),
	name,
	pictures: Array.from({ length: getRandomInteger(1, 5) }, () => mockPicture(name)),
});

export const mockDestinations = () => CITIES.map(mockDestination);

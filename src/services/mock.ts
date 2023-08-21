import { mockDestinations } from '../mocks/destinations';
import { mockOffers } from '../mocks/offer';
import { mockPoint } from '../mocks/point';
import type { Point } from '../types/point';
import { getRandomElement, getRandomInteger } from '../utils/random';

export default class MockService {
	#destinations = mockDestinations();
	#points: Point[] = [];
	#offers = mockOffers();

	constructor() {
		this.#points = this.#generatePoints();
	}

	getDestinations() {
		return this.#destinations;
	}

	getPoints() {
		return this.#points;
	}

	getOffers() {
		return this.#offers;
	}

	#generatePoint = () => {
		const offer = getRandomElement(this.#offers);
		const destination = getRandomElement(this.#destinations);
		const offersIDs = offer.offers.slice(0, getRandomInteger(0, offer.offers.length)).map(({ id }) => id);

		return mockPoint(destination.id, offersIDs, offer.type);
	};

	#generatePoints() {
		return Array.from({ length: 10 }, this.#generatePoint);
	}
}

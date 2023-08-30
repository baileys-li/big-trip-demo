import type MockService from '../services/mock';
import { Offer } from '../types/offer';

export default class OffersModel {
	#service: MockService | null = null;
	#offers: Offer[] = [];

	constructor(service: MockService) {
		this.#service = service;
		this.#offers = this.#service.getOffers();
	}

	get offers() {
		return this.#offers;
	}

	getByType(type: Offer['type']) {
		return this.#offers.find((offer) => offer.type === type);
	}

	getOffers(type: Offer['type']) {
		return this.getByType(type)?.offers || [];
	}
}

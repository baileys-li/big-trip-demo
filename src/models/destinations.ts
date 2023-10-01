import type MockService from '../services/mock';
import { Destination } from '../types/destinations';

export default class DestinationModel {
	#service: MockService | null = null;
	#destinations: Destination[] = [];
	#cities: string[] = [];

	constructor(service: MockService) {
		this.#service = service;
		this.#destinations = this.#service.getDestinations();
	}

	get destinations() {
		return this.#destinations;
	}

	get cities() {
		if (!this.#cities.length) {
			this.#cities = this.#destinations.map((destination) => destination.name);
		}
		return this.#cities;
	}

	getById(id: string) {
		return this.#destinations.find((destination) => destination.id === id);
	}

	getNameById(id: string) {
		return this.getById(id)?.name || '';
	}

	getByName(name: string) {
		return this.#destinations.find((destination) => destination.name === name);
	}

	isValidName(name: string) {
		return this.cities.includes(name);
	}
}

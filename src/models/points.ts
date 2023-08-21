import type MockService from '../services/mock';
import { Point } from '../types/point';

export default class PointsModel {
	#service: MockService | null = null;
	#points: Point[] = [];

	constructor(service: MockService) {
		this.#service = service;
		this.#points = this.#service.getPoints();
	}

	get points() {
		return this.#points;
	}

	getById(id: string) {
		return this.#points.find((point) => point.id === id);
	}
}

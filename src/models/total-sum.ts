import { Point } from '../types/point';
import type OffersModel from './offers';
import type PointsModel from './points';

interface TotalSumProps {
	points: PointsModel;
	offers: OffersModel;
}

export default class TotalSumModel {
	#pointsModel: PointsModel;
	#offersModel: OffersModel;
	#totalSum: number | null = null;

	constructor({ points, offers }: TotalSumProps) {
		this.#pointsModel = points;
		this.#offersModel = offers;
	}

	get sum() {
		if (this.#totalSum === null) {
			this.#totalSum = this.#calculateSum();
		}

		return this.#totalSum;
	}

	#calculateSum() {
		return this.#pointsModel.points.reduce((sum, point) => sum + this.calculatePoint(point), 0);
	}

	calculatePoint({ basePrice, offers, type }: Point) {
		return basePrice + this.#calculateOffers(offers, type);
	}

	#calculateOffers(offersID: string[], type: Point['type']) {
		const offers = this.#offersModel.getByType(type)?.offers || [];

		return offers.reduce((sum, { id, price }) => sum + (offersID.includes(id) ? price : 0), 0);
	}

	add(payload: number) {
		this.#totalSum = this.sum + payload;
	}
}

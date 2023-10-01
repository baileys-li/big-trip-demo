import { TripInfoView } from '@views';
import { render } from '../framework/render';
import type { DestinationModel, PointsModel, TotalSumModel } from '../models';

interface SummaryPresenterProps {
	wrapper: HTMLElement;
	models: {
		points: PointsModel;
		destination: DestinationModel;
		sum: TotalSumModel;
	};
}

export default class SummaryPresenter {
	#sumModel: TotalSumModel;
	#pointsModel: PointsModel;
	#destinationsModel: DestinationModel;
	#wrapper: HTMLElement;
	constructor({ wrapper, models: { points, destination, sum } }: SummaryPresenterProps) {
		this.#sumModel = sum;
		this.#pointsModel = points;
		this.#destinationsModel = destination;
		this.#wrapper = wrapper;
		this.#renderInitial();
	}

	#renderInitial() {
		render(new TripInfoView(this.#prepareData()), this.#wrapper, 'afterbegin');
	}

	#prepareData() {
		const points = this.#pointsModel.points;
		const cities: string[] = [];

		for (const point of points) {
			const city = this.#destinationsModel.getNameById(point.destination);
			if (cities.at(-1) !== city) {
				cities.push(city);
			}
		}

		return {
			dateFrom: points.at(0)?.dateFrom,
			dateTo: points.at(-1)?.dateTo,
			cities,
			price: this.#sumModel.sum,
		};
	}
}

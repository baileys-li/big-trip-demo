import { TripFiltersView, TripInfoView, TripSortView } from '@views';
import { render } from '../framework/render';
import type { OffersModel, PointsModel, DestinationModel } from '../models';
import TripListView from '../views/trip-list';
import PointPresenter from './point';
import { FilterType } from '../types/filter';
import { Point } from '../types/point';
import dayjs from 'dayjs';

interface Containers {
	events: HTMLElement;
	filters: HTMLElement;
	info: HTMLElement;
}

interface TripsPresenterProps {
	containers: Containers;
	pointsModel: PointsModel;
	offersModel: OffersModel;
	destinationsModel: DestinationModel;
}

export default class TripsPresenter {
	#pointsModel: PointsModel;
	#offersModel: OffersModel;
	#destinationsModel: DestinationModel;
	#containers: Containers;
	#list = new TripListView();
	#points: PointPresenter[] = [];
	#filteredPoints: Record<FilterType, Point[]>;
	#activePoint: PointPresenter | null = null;

	constructor({ containers, pointsModel, offersModel, destinationsModel }: TripsPresenterProps) {
		this.#containers = containers;
		this.#pointsModel = pointsModel;
		this.#offersModel = offersModel;
		this.#destinationsModel = destinationsModel;
		const now = dayjs();

		this.#filteredPoints = {
			everything: this.#pointsModel.points,
			future: this.#pointsModel.points.filter((point) => now.isBefore(point.dateFrom)),
			present: this.#pointsModel.points.filter((point) => now.isAfter(point.dateTo) && now.isBefore(point.dateFrom)),
			past: this.#pointsModel.points.filter((point) => now.isAfter(point.dateTo)),
		};


		this.#renderInitial();
	}

	#changeActivePoint = (point: PointPresenter) => {
		if (this.#activePoint && this.#activePoint !== point) {
			this.#activePoint.switchToNormal();
		}

		this.#activePoint = point;
	};

	#clearList() {
		this.#points.forEach((point) => point.destroy());
		this.#points = [];
	}

	#handleFilerChange = (filter: FilterType) => {
		this.#clearList();
		this.#renderPoints(this.#filteredPoints[filter]);
	};

	#renderPoints(points: Point[]) {
		this.#points = points.map(
			(point) =>
				new PointPresenter({
					point,
					container: this.#list.element,
					pointsModel: this.#pointsModel!,
					offersModel: this.#offersModel!,
					destinationsModel: this.#destinationsModel!,
					changeActivePoint: this.#changeActivePoint,
				})
		);
	}

	#renderInitial() {
		this.#renderMainInfo();
		render(new TripSortView(), this.#containers.events);
		render(this.#list, this.#containers.events);
		render(new TripFiltersView({
			onFilterChange: this.#handleFilerChange,
			disabledFilters: Object.keys(this.#filteredPoints).filter((filter) => !this.#filteredPoints[filter as FilterType].length) as FilterType[],
		}), this.#containers.filters);

		this.#renderPoints(this.#pointsModel!.points);
	}

	#renderMainInfo() {
		const points = this.#pointsModel.points;
		const cities: string[] = [];
		const dateFrom = points.at(0)?.dateFrom;
		const dateTo = points.at(-1)?.dateTo;

		const price = points.reduce((acc, point) =>{
			const offers = this.#offersModel.getByType(point.type)?.offers || [];
			const offersPrice = point.offers.reduce((offerAcc, offer) => offerAcc + (offers.find(({ id }) => id === offer)?.price || 0), 0);
			const city = this.#destinationsModel.getById(point.destination)!.name || '';
			if (cities.at(-1) !== city) {
				cities.push(city);
			}
			return acc + point.basePrice + offersPrice;
		}, 0);

		render(new TripInfoView({
			dateFrom, dateTo, cities, price,
		}), this.#containers.info, 'afterbegin');
	}
}

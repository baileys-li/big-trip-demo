import { TripFiltersView } from '@views';
import { render } from '../framework/render';
import type { OffersModel, PointsModel, DestinationModel } from '../models';
import TripListView from '../views/trip-list';
import PointPresenter from './point';
import { FilterType } from '../types/filter';
import { Point } from '../types/point';
import dayjs from 'dayjs';

interface TripsPresenterProps {
	container: HTMLElement;
	filterWrapper: HTMLElement;
	pointsModel: PointsModel;
	offersModel: OffersModel;
	destinationsModel: DestinationModel;
}

export default class TripsPresenter {
	#pointsModel: PointsModel;
	#offersModel: OffersModel;
	#destinationsModel: DestinationModel;
	#filterWrapper: HTMLElement;
	#container: HTMLElement;
	#list = new TripListView();
	#points: PointPresenter[] = [];
	#filteredPoints: Record<FilterType, Point[]>;
	#activePoint: PointPresenter | null = null;

	constructor({ container, filterWrapper, pointsModel, offersModel, destinationsModel }: TripsPresenterProps) {
		this.#container = container;
		this.#pointsModel = pointsModel;
		this.#offersModel = offersModel;
		this.#destinationsModel = destinationsModel;
		this.#filterWrapper = filterWrapper;

		const now = dayjs();

		this.#filteredPoints = {
			everything: this.#pointsModel.points,
			future: this.#pointsModel.points.filter((point) => now.isAfter(point.dateFrom)),
			present: this.#pointsModel.points.filter((point) => now.isAfter(point.dateTo) && now.isBefore(point.dateFrom)),
			past: this.#pointsModel.points.filter((point) => now.isBefore(point.dateTo)),
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
		render(this.#list, this.#container);
		render(new TripFiltersView({
			onFilterChange: this.#handleFilerChange,
			disabledFilters: Object.keys(this.#filteredPoints).filter((filter) => !this.#filteredPoints[filter as FilterType].length) as FilterType[],
		}), this.#filterWrapper);

		this.#renderPoints(this.#pointsModel!.points);
	}
}

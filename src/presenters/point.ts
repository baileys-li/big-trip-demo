import { EventView, EditEventView, TripItemView } from '@views';
import { remove, render, replace } from '../framework/render';
import type { OffersModel, PointsModel, DestinationModel } from '../models';

import { Point, PointType } from '../types/point';

interface PointPresenterProps {
	point: Point;
	container: HTMLUListElement;
	pointsModel: PointsModel;
	offersModel: OffersModel;
	destinationsModel: DestinationModel;
	onEditMode(point: PointPresenter): void;
}

export default class PointPresenter {
	#pointsModel: PointsModel;
	#offersModel: OffersModel;
	#destinationsModel: DestinationModel;
	#point: Point;

	#container: HTMLElement;
	#item = new TripItemView();
	#content: EventView | EditEventView | null = null;
	#changeActivePoint: () => void;

	constructor({ container, pointsModel, offersModel, destinationsModel, point, onEditMode }: PointPresenterProps) {
		this.#container = container;
		this.#pointsModel = pointsModel;
		this.#offersModel = offersModel;
		this.#destinationsModel = destinationsModel;
		this.#point = point;
		this.#changeActivePoint = () => onEditMode(this);

		this.#renderInfo();
		render(this.#item, this.#container);
	}

	#switchToEdit = () => {
		const oldContent = this.#content!;
		this.#content = new EditEventView({
			point: this.#point,
			getDestinations: this.#destinationsModel.getById.bind(this.#destinationsModel!),
			getOffers: (type: PointType) => this.#offersModel.getByType(type)?.offers || [],
			cancel: this.switchToNormal,
		});
		replace(this.#content!, oldContent);
		this.#changeActivePoint();
		document.addEventListener('keydown', this.#handleEscKeyDown);
	};

	#handleEscKeyDown = (evt: KeyboardEvent) => {
		if (evt.key === 'Escape' || evt.key === 'Esc') {
			this.switchToNormal();
			this.#removeEscKeyDown();
		}
	};

	#removeEscKeyDown = () => document.removeEventListener('keydown', this.#handleEscKeyDown);

	switchToNormal = () => {
		const oldContent = this.#content!;
		this.#content = this.#getNormalView();
		replace(this.#content!, oldContent);
		this.#removeEscKeyDown();
	};

	#getNormalView() {
		const point = this.#point!;
		const destination = this.#destinationsModel!.getById(point.destination);
		const offer = this.#offersModel!.getByType(point.type);

		return new EventView({
			point,
			city: destination?.name || '',
			offers: offer?.offers.filter(({id}) => point.offers.includes(id)) || [],
			switchMode: this.#switchToEdit,
		});
	}

	#renderInfo() {
		this.#content = this.#getNormalView();
		render(this.#content, this.#item.element);
	}

	destroy() {
		this.#removeEscKeyDown();
		remove(this.#content!);
		remove(this.#item);
	}
}

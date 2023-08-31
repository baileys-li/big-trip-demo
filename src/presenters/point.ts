import { EventView, EditEventView, TripItemView } from '@views';
import { remove, render, replace } from '../framework/render';
import type { OffersModel, PointsModel, DestinationModel } from '../models';

import { Point } from '../types/point';
import PointTypePresenter from './point-type';
import DestinationPresenter from './destination';
import RollUpView from '@views/roll-up';

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
			cancel: this.switchToNormal,
		});
		const destinationPresenter = new DestinationPresenter({
			initialId: this.#point.destination,
			model: this.#destinationsModel,
			wrapper: {
				selector: this.#content.header,
				output: this.#content.details,
			},
		});

		new PointTypePresenter({
			type: this.#point.type,
			getOffers: this.#offersModel.getOffers.bind(this.#offersModel),
			selectedOffers: this.#point.offers,
			wrapper: {
				selector: this.#content.header,
				output: destinationPresenter.view,
				options: this.#content.details,
			},
		});

		replace(this.#content!, oldContent);

		render(
			new RollUpView({
				onClick: this.switchToNormal,
			}),
			this.#content.header,
			'beforeend'
		);
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
		const { type, destination, offers } = this.#point;
		const allOffers = this.#offersModel.getByType(type)!.offers;

		const content = new EventView({
			point: this.#point,
			city: this.#destinationsModel.getNameById(destination),
			offers: allOffers.filter(({ id }) => offers.includes(id)) || [],
		});

		render(
			new RollUpView({
				onClick: this.#switchToEdit,
			}),
			content.element,
			'beforeend'
		);

		return content;
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

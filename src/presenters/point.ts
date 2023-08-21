import type { OffersModel, PointsModel, DestinationModel } from '../models';
import { render } from '../render';
import { Point, PointType } from '../types/point';
import EditEventView from '../views/edit-event';
import EventView from '../views/event';
import TripItemView from '../views/trip-item';

interface PointPresenterProps {
	point: Point;
	container: HTMLUListElement;
	pointsModel: PointsModel;
	offersModel: OffersModel;
	destinationsModel: DestinationModel;
}

export default class PointPresenter {
	#pointsModel: PointsModel | null = null;
	#offersModel: OffersModel | null = null;
	#destinationsModel: DestinationModel | null = null;
	#point: Point | null = null;

	#container: HTMLElement | null = null;
	#item = new TripItemView();
	#content: EventView | EditEventView | null = null;

	constructor({ container, pointsModel, offersModel, destinationsModel, point }: PointPresenterProps) {
		this.#container = container;
		this.#pointsModel = pointsModel;
		this.#offersModel = offersModel;
		this.#destinationsModel = destinationsModel;
		this.#point = point;

		this.#renderInfo();
		render(this.#item, this.#container);
	}

	switchToEdit() {
		const oldContent = this.#content!;
		oldContent.element.remove();
		oldContent.removeElement();
		this.#content = new EditEventView({
			point: this.#point!,
			getDestinations: this.#destinationsModel!.getById.bind(this.#destinationsModel!),
			getOffers: (type: PointType) => this.#offersModel!.getByType(type)?.offers || [],
		});
		render(this.#content, this.#item.element);
	}

	#renderInfo() {
		const point = this.#point!;
		const destination = this.#destinationsModel!.getById(point.destination);
		const offer = this.#offersModel!.getByType(point.type);

		this.#content = new EventView({
			point,
			city: destination?.name || '',
			offers: offer?.offers.filter(({id}) => point.offers.includes(id)) || [],
		});
		render(this.#content, this.#item.element);
	}
}

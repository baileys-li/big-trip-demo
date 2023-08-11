import { render } from '../render';
import EditEventView from '../views/edit-event';
import EventView from '../views/event';
import TripItemView from '../views/trip-item';
import TripListView from '../views/trip-list';

interface TripsPresenterProps {
	container: HTMLElement;
}

export default class TripsPresenter {
	#container: HTMLElement | null = null;
	#list = new TripListView();
	#items: TripItemView[] = [];

	constructor({ container }: TripsPresenterProps) {
		this.#container = container;
		render(this.#list, this.#container);

		this.#showEditExample();

		for (let i = 0; i < 3; i++) {
			this.#showItemExample();
		}
	}

	#createItem() {
		const item = new TripItemView();
		this.#items.push(item);
		render(item, this.#list.element);

		return item;
	}

	#showEditExample() {
		const wrapper = this.#createItem();
		const form = new EditEventView();
		render(form, wrapper.element);
	}

	#showItemExample() {
		const wrapper = this.#createItem();
		const event = new EventView();
		render(event, wrapper.element);
	}
}

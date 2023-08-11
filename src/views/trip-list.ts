import AbstractView from './_abstract';

const MARK_UP = '<ul class="trip-events__list"></ul>';

export default class TripListView extends AbstractView<HTMLUListElement> {
	constructor() {
		super();
	}

	get template() {
		return MARK_UP;
	}
}

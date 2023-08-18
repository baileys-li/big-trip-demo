import AbstractView from '../framework/view/abstract-view';

const MARK_UP = '<ul class="trip-events__list"></ul>';

export default class TripListView extends AbstractView<HTMLUListElement> {
	get template() {
		return MARK_UP;
	}
}

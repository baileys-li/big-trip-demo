import AbstractView from '../framework/view/abstract-view';
import { PointType } from '../types/point';

const MARK_UP = '<label class="event__label  event__type-output" for="event-destination-1"></label>';

export default class TypeOutputView extends AbstractView<HTMLLabelElement> {
	constructor(type: PointType) {
		super();
		this.update(type);
	}

	update(type: PointType) {
		this.element.textContent = type;
	}

	get template() {
		return MARK_UP;
	}
}

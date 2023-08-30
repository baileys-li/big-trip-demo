import AbstractView from '../framework/view/abstract-view';
import { PointType } from '../types/point';

interface Option {
	title: string;
	price: number;
	id: string;
	checked: boolean;
}

const markUpOfferChoice = ({ title, price, id, checked }: Option) => `<div class="event__offer-selector">
<input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}" type="checkbox" name="event-offer-luggage"${
	checked ? ' checked' : ''
}>
<label class="event__offer-label" for="event-offer-${id}">
	<span class="event__offer-title">${title}</span>
	+€&nbsp;
	<span class="event__offer-price">${price}</span>
</label>
</div>`;

const markUp = (options: Option[]) => `<section class="event__section  event__section--offers">
<h3 class="event__section-title  event__section-title--offers">Offers</h3>

<div class="event__available-offers">
	${options.map(markUpOfferChoice).join('')}

</div>
</section>`;

export default class OffersView extends AbstractView<HTMLLabelElement> {
	#options: Option[];
	constructor(options: Option[]) {
		super();
		this.#options = options;
	}

	update(type: PointType) {
		this.element.textContent = type;
	}

	get template() {
		return markUp(this.#options);
	}
}

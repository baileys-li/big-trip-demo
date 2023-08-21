import { CITIES } from '../constants';
import AbstractView from '../framework/view/abstract-view';
import { markUpTypeWrapper } from '../templates/type-wrapper';
import { Destination } from '../types/destinations';
import { OfferItem } from '../types/offer';
import { Point } from '../types/point';

interface EditEventViewProps {
	point: Point;
	getDestinations: (id: string) => Destination | undefined;
	getOffers: (type: Point['type']) => OfferItem[];
	cancel(): void;
}

const CSSClasses = {
	ROLL_UP: 'event__rollup-btn',
};

function markUp({ point, getDestinations, getOffers }: EditEventViewProps) {
	const destination = getDestinations(point.destination);
	const offers = getOffers(point.type);

	return `<form class="event event--edit" action="#" method="post">
	<header class="event__header">
		${markUpTypeWrapper(point.type)}
		<div class="event__field-group  event__field-group--destination">
			<label class="event__label  event__type-output" for="event-destination-1">
			${point.type}
			</label>
			<input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${
	destination?.name || ''
}" list="destination-list-1">
			<datalist id="destination-list-1">
				${CITIES.map((city) => `<option value="${city}"></option>`).join('')}
			</datalist>
		</div>

		<div class="event__field-group  event__field-group--time">
			<label class="visually-hidden" for="event-start-time-1">From</label>
			<input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${point.dateFrom.format(
		'YY/MM/DD HH:mm'
	)}">
			—
			<label class="visually-hidden" for="event-end-time-1">To</label>
			<input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${point.dateTo.format(
		'YY/MM/DD HH:mm'
	)}">
		</div>

		<div class="event__field-group  event__field-group--price">
			<label class="event__label" for="event-price-1">
				<span class="visually-hidden">Price</span>
				€
			</label>
			<input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${point.basePrice}">
		</div>

		<button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
		<button class="event__reset-btn" type="reset">Delete</button>
		${/* <button class="event__reset-btn" type="reset">Cancel</button> */ ''}
		<button class="${CSSClasses.ROLL_UP}" type="button">
			<span class="visually-hidden">Open event</span>
		</button>
	</header>
	<section class="event__details">
		<section class="event__section  event__section--offers">
			<h3 class="event__section-title  event__section-title--offers">Offers</h3>

			<div class="event__available-offers">
				${offers
		.map(
			({ title, price, id }) => `<div class="event__offer-selector">
				<input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}" type="checkbox" name="event-offer-luggage"${
	point.offers.includes(id) ? ' checked' : ''
}>
				<label class="event__offer-label" for="event-offer-${id}">
					<span class="event__offer-title">${title}</span>
					+€&nbsp;
					<span class="event__offer-price">${price}</span>
				</label>
			</div>`
		)
		.join('')}

			</div>
		</section>

		<section class="event__section  event__section--destination">
			<h3 class="event__section-title  event__section-title--destination">Destination</h3>
			<p class="event__destination-description">${destination?.description || ''}</p>

			<div class="event__photos-container">
				<div class="event__photos-tape">
					${destination?.pictures.map(({ src, description }) => `<img class="event__photo" src="${src}" alt="${description}">`).join('')}
				</div>
			</div>
		</section>
	</section>
</form>`;
}

export default class EditEventView extends AbstractView<HTMLFormElement> {
	#props: EditEventViewProps | null = null;
	constructor(props: EditEventViewProps) {
		super();
		this.#props = props;

		this.element.querySelector(`.${CSSClasses.ROLL_UP}`)?.addEventListener('click', this.#props.cancel);
	}

	get template() {
		return markUp(this.#props!);
	}
}

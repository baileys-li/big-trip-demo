import AbstractView from '../framework/view/abstract-view';
import { Point } from '../types/point';

interface EditEventViewProps {
	point: Point;
	cancel(): void;
}

const CSSClasses = Object.freeze({
	ROLL_UP: 'event__rollup-btn',
	HEADER: 'event__header',
	DETAILS: 'event__details',
});

function markUp({ point }: EditEventViewProps) {

	return `<form class="event event--edit" action="#" method="post">
	<header class="${CSSClasses.HEADER}">
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
	<section class="${CSSClasses.DETAILS}"></section>
</form>`;
}

export default class EditEventView extends AbstractView<HTMLFormElement> {
	#props: EditEventViewProps;
	header: HTMLElement;
	details: HTMLElement;
	constructor(props: EditEventViewProps) {
		super();
		this.#props = props;
		this.element.querySelector(`.${CSSClasses.ROLL_UP}`)?.addEventListener('click', this.#props.cancel);
		this.header = this.element.querySelector(`.${CSSClasses.HEADER}`)!;
		this.details = this.element.querySelector(`.${CSSClasses.DETAILS}`)!;
	}

	get template() {
		return markUp(this.#props!);
	}
}

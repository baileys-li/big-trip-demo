import AbstractView from './_abstract';

function markUp() {
	return `<div class="event">
	<time class="event__date" datetime="2019-03-18">MAR 18</time>
	<div class="event__type">
		<img class="event__type-icon" width="42" height="42" src="img/icons/flight.png" alt="Event type icon">
	</div>
	<h3 class="event__title">Flight Chamonix</h3>
	<div class="event__schedule">
		<p class="event__time">
			<time class="event__start-time" datetime="2019-03-18T12:25">12:25</time>
			—
			<time class="event__end-time" datetime="2019-03-18T13:35">13:35</time>
		</p>
		<p class="event__duration">01H 10M</p>
	</div>
	<p class="event__price">
		€&nbsp;<span class="event__price-value">160</span>
	</p>
	<h4 class="visually-hidden">Offers:</h4>
	<ul class="event__selected-offers">
		<li class="event__offer">
			<span class="event__offer-title">Add luggage</span>
			+€&nbsp;
			<span class="event__offer-price">50</span>
		</li>
		<li class="event__offer">
			<span class="event__offer-title">Switch to comfort</span>
			+€&nbsp;
			<span class="event__offer-price">80</span>
		</li>
	</ul>
	<button class="event__favorite-btn" type="button">
		<span class="visually-hidden">Add to favorite</span>
		<svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
			<path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
		</svg>
	</button>
	<button class="event__rollup-btn" type="button">
		<span class="visually-hidden">Open event</span>
	</button>
</div>`;
}

export default class EventView extends AbstractView<HTMLDivElement> {
	constructor() {
		super();
	}

	get template() {
		return markUp();
	}
}

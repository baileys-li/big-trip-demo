import type { Dayjs } from 'dayjs';
import { Point } from '../types/point';
import { OfferItem } from '../types/offer';
import { getFormattedDiff } from '../utils/time';

export type MarkUpEventProps = Pick<Point, 'dateFrom' | 'dateTo' | 'type' | 'basePrice' | 'isFavorite'> & {
	city: string;
	offers: OfferItem[];
};

const markUpOffer = ({ title, price }: OfferItem) => `<li class="event__offer">
<span class="event__offer-title">${title}</span>
+€&nbsp;
<span class="event__offer-price">${price}</span>
</li>`;

const markUpOffers = (offers: OfferItem[]) => `
<h4 class="visually-hidden">Offers:</h4>
<ul class="event__selected-offers">
	${offers.map(markUpOffer).join('')}
</ul>
`;

const markUpTime = (date: Dayjs) =>
	`<time class="event__start-time" datetime="${date.format('YYYY-MM-DD[T]HH:mm')}">${date.format('H:m')}</time>`;

export const ActionButtonCSSClass = {
	FAVORITE: 'event__favorite-btn',

};

export function markUpEvent({ city, type, basePrice, offers, dateFrom, dateTo, isFavorite }: MarkUpEventProps) {
	const offersMarkup = offers.length ? markUpOffers(offers) : '';

	const favoriteClasses = [ActionButtonCSSClass.FAVORITE];
	if (isFavorite) {
		favoriteClasses.push(`${ActionButtonCSSClass.FAVORITE}--active`);
	}

	return `<div class="event">
	<time class="event__date" datetime="${dateFrom.format('YYYY-MM-DD')}">${dateFrom.format('MMM D')}</time>
	<div class="event__type">
		<img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="${type} icon">
	</div>
	<h3 class="event__title">${type} ${city}</h3>
	<div class="event__schedule">
		<p class="event__time">
			${markUpTime(dateFrom)}
			—
			${markUpTime(dateTo)}
		</p>
		<p class="event__duration">${getFormattedDiff(dateFrom, dateTo)}</p>
	</div>
	<p class="event__price">
		€&nbsp;<span class="event__price-value">${basePrice}</span>
	</p>
	${offersMarkup}
	<button class="${favoriteClasses.join(' ')}" type="button">
		<span class="visually-hidden">Add to favorite</span>
		<svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
			<path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
		</svg>
	</button>
</div>`;
}

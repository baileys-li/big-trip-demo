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


export function markUpEvent({ city, type, basePrice, offers, dateFrom, dateTo }: MarkUpEventProps) {
	const offersMarkup = offers.length ? markUpOffers(offers) : '';

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
</div>`;
}

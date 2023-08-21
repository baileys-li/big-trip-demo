import type { Dayjs } from 'dayjs';
import AbstractView from '../framework/view/abstract-view';

interface TripInfoViewProps {
	cities: string[];
	dateFrom?: Dayjs;
	dateTo?: Dayjs;
	price: number;
}

function markUpCities(cities: string[]) {
	let resultCities: string[] = [];
	if (cities.length <= 3) {
		resultCities = cities;
	}

	if (cities.length > 3) {
		resultCities = [cities[0], '...', cities.at(-1)!];
	}


	return `<h1 class="trip-info__title">${resultCities.join(' &mdash; ')}</h1>`;
}

function markUpDates(dateFrom?: Dayjs, dateTo?: Dayjs) {
	if (!dateFrom || !dateTo) {
		return '';
	}

	const showedDates: string[] = [dateFrom.format('MMM DD')];

	const isSameMonth = dateFrom.month() === dateTo.month();
	showedDates.push(dateTo.format(isSameMonth ? 'DD' : 'MMM DD'));

	return `<p class="trip-info__dates">${showedDates.join('&nbsp;&mdash;&nbsp;')}</p>`;
}

function markUp({price, cities, dateFrom, dateTo}: TripInfoViewProps) {
	return `<section class="trip-main__trip-info  trip-info">
	<div class="trip-info__main">
		${markUpCities(cities)}
		${markUpDates(dateFrom, dateTo)}
	</div>

	<p class="trip-info__cost">
		Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
	</p>
</section>`;
}

export default class TripInfoView extends AbstractView<HTMLDivElement> {
	#props: TripInfoViewProps;
	constructor(props: TripInfoViewProps) {
		super();
		this.#props = props;
	}

	get template() {
		return markUp(this.#props);
	}
}

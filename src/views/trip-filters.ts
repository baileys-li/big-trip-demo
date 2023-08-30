import AbstractView from '../framework/view/abstract-view';
import { FilterType } from '../types/filter';
import { capitilize } from '../utils';

interface TripFiltersViewProps {
	onFilterChange: (filter: FilterType) => void;
	disabledFilters?: FilterType[];
}

const FILTERS: FilterType[] = ['everything', 'future', 'present', 'past'];

const markUpFilter = (filter: FilterType, checked = false, disabled = false) => `<div class="trip-filters__filter">
	<input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter}" ${
	checked ? 'checked' : ''
} ${disabled ? 'disabled' : ''}>
	<label class="trip-filters__filter-label" for="filter-${filter}">${capitilize(filter)}</label>
</div>`;

function markUp(disabled: FilterType[]) {
	return `<form class="trip-filters" action="#" method="get">
	${FILTERS.map((filter) => markUpFilter(filter, filter === 'everything', disabled.includes(filter))).join('')}
	<button class="visually-hidden" type="submit">Accept filter</button>
</form>`;
}

export default class TripFiltersView extends AbstractView<HTMLFormElement> {
	#onFilterChange: (filter: FilterType) => void;
	#disabledFilters: FilterType[];
	constructor({ onFilterChange, disabledFilters }: TripFiltersViewProps) {
		super();
		this.#onFilterChange = onFilterChange;
		this.#disabledFilters = disabledFilters || [];

		this.#initHandlers();
	}

	#handleChange = (evt: Event) => {
		const target = evt.target as HTMLInputElement;
		this.#onFilterChange(target.value as FilterType);
	};

	#initHandlers() {
		this.element.addEventListener('change', this.#handleChange);
	}

	get template() {
		return markUp(this.#disabledFilters);
	}
}

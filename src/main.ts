import TripsPresenter from './presenters/trips';
import { render } from './render';
import TripFiltersView from './views/trip-filters';
import TripInfoView from './views/trip-info';
import TripSortView from './views/trip-sort';

const headerMain = document.querySelector<HTMLDivElement>('.trip-main');
const filterWrapper = document.querySelector<HTMLDivElement>('.trip-controls__filters');
const eventsWrapper = document.querySelector<HTMLDivElement>('.trip-events');

if (!headerMain || !filterWrapper || !eventsWrapper) {
	throw new Error('Critical elements not found');
}

render(new TripInfoView(), headerMain, 'afterbegin');
render(new TripFiltersView(), filterWrapper);
render(new TripSortView(), eventsWrapper);
new TripsPresenter({ container: eventsWrapper });

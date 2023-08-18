import TripsPresenter from './presenters/trips';
import TripFiltersView from './views/trip-filters';
import TripInfoView from './views/trip-info';
import TripSortView from './views/trip-sort';
import { PointsModel, DestinationModel, OffersModel } from './models';
import MockService from './services/mock';
import { render } from './framework/render';

const headerMain = document.querySelector<HTMLDivElement>('.trip-main');
const filterWrapper = document.querySelector<HTMLDivElement>('.trip-controls__filters');
const eventsWrapper = document.querySelector<HTMLDivElement>('.trip-events');

const service = new MockService();
const [pointsModel, destinationsModel, offersModel] = [PointsModel, DestinationModel, OffersModel]
	.map((Model) => new Model(service)) as [PointsModel, DestinationModel, OffersModel];

if (!headerMain || !filterWrapper || !eventsWrapper) {
	throw new Error('Critical elements not found');
}

render(new TripInfoView(), headerMain, 'afterbegin');
render(new TripFiltersView(), filterWrapper);
render(new TripSortView(), eventsWrapper);
new TripsPresenter({ container: eventsWrapper, pointsModel, destinationsModel, offersModel });

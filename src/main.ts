import './utils/polyfills';
import TripsPresenter from './presenters/trips';

import { PointsModel, DestinationModel, OffersModel } from './models';
import MockService from './services/mock';

function getByClass<T extends HTMLElement>(className: string): T {
	const element = document.querySelector<T>(`.${className}`);

	if (!element) {
		throw new Error(`Element with class ${className} not found`);
	}

	return element;
}

const service = new MockService();
const [pointsModel, destinationsModel, offersModel] = [PointsModel, DestinationModel, OffersModel].map((Model) => new Model(service)) as [
	PointsModel,
	DestinationModel,
	OffersModel
];

new TripsPresenter({
	containers: {
		events: getByClass<HTMLDivElement>('trip-events'),
		filters: getByClass<HTMLDivElement>('trip-controls__filters'),
		info: getByClass<HTMLDivElement>('trip-main'),
	},
	pointsModel,
	destinationsModel,
	offersModel,
});

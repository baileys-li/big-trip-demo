import { render } from './render';
import TripInfoView from './views/trip-info';

const headerMain = document.querySelector('.trip-main');

if (!headerMain) {
	throw new Error('Trip main element not found');
}

render(new TripInfoView(), headerMain, 'afterbegin');

import { RenderPosition, render } from './render.js';
import TripInfoView from './views/trip-info.js';

const headerMain = document.querySelector('.trip-main');

render(new TripInfoView(), headerMain, RenderPosition.AFTERBEGIN);

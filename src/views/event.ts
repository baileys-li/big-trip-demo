import AbstractView from '../framework/view/abstract-view';
import { ActionButtonCSSClass, markUpEvent, type MarkUpEventProps } from '../templates/event';
import { OfferItem } from '../types/offer';
import type { Point } from '../types/point';

interface EventViewProps {
	point: Point;
	city: string;
	offers: OfferItem[];
	switchMode(): void;
}

export default class EventView extends AbstractView<HTMLDivElement> {
	#markUpInfo: MarkUpEventProps | null = null;

	constructor({ point, city, offers, switchMode }: EventViewProps) {
		super();
		this.#markUpInfo = {
			...point,
			city,
			offers,
		};

		this.element.querySelector(`.${ActionButtonCSSClass.ROLLUP}`)?.addEventListener('click', switchMode);
	}

	get template() {
		return markUpEvent(this.#markUpInfo!);
	}
}

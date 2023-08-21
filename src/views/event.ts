import { markUpEvent, type MarkUpEventProps } from '../templates/event';
import { OfferItem } from '../types/offer';
import type { Point } from '../types/point';
import AbstractView from './_abstract';

interface EventViewProps {
	point: Point;
	city: string;
	offers: OfferItem[];
}

export default class EventView extends AbstractView<HTMLDivElement> {
	#markUpInfo: MarkUpEventProps | null = null;

	constructor({ point, city, offers }: EventViewProps) {
		super();
		this.#markUpInfo = {
			...point,
			city,
			offers,
		};
	}

	get template() {
		return markUpEvent(this.#markUpInfo!);
	}
}

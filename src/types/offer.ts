import { PointType } from './point';

interface OfferItem {
	id: string;
	title: string;
	price: number;
}

interface Offer {
	type: PointType;
	offers: OfferItem[];
}

export type { OfferItem, Offer };

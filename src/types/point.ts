import type { Dayjs } from 'dayjs';
import { POINT_TYPES } from '../constants';
import type { Destination } from './destinations';
import type { OfferItem } from './offer';
import type { CamelizeObject } from './util';

type PointType = typeof POINT_TYPES[number];

interface ServerPoint {
	id: string;
	base_price: number;
	date_from: string;
	date_to: string;
	destination: Destination['id'];
	is_favorite: boolean;
	offers: OfferItem['id'][];
	type: PointType;
}

type Point = Omit<CamelizeObject<ServerPoint>, 'dateFrom' | 'dateTo'> & {
	dateFrom: Dayjs;
	dateTo: Dayjs;
};

export { PointType, ServerPoint, Point };

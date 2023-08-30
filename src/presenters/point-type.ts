import TypeSelectorView from '@views/type-selector';
import { PointType } from '../types/point';
import { render, replace } from '../framework/render';
import TypeOutputView from '@views/type-output';
import { OfferItem } from '../types/offer';
import OffersView from '@views/offers';

interface Props {
	type: PointType;
	selectedOffers: string[];
	getOffers(type: PointType): OfferItem[];
	wrapper: {
		selector: HTMLElement;
		output: HTMLElement;
		options: HTMLElement;
	};
}
export default class PointTypePresenter {
	#output: TypeOutputView;
	#getOffers: (type: PointType) => OfferItem[];
	#selectedOffers: string[];
	#offers: OffersView;

	constructor({ wrapper, type, selectedOffers, getOffers }: Props) {
		this.#getOffers = getOffers;
		this.#selectedOffers = selectedOffers;
		this.#offers = new OffersView(this.#prepareOffers(type));
		this.#output = new TypeOutputView(type);

		const selector = new TypeSelectorView({ type, onTypeChange: this.#handleChange });

		render(selector, wrapper.selector, 'afterbegin');
		render(this.#output, wrapper.output, 'afterbegin');
		render(this.#offers, wrapper.options, 'afterbegin');
	}

	#prepareOffers(type: PointType){
		const offers = this.#getOffers(type);
		return offers.map(({title, id, price}) => ({
			title,
			id,
			price,
			checked: this.#selectedOffers.includes(id),
		}));
	}

	#updateOffers(type: PointType) {
		const options = this.#prepareOffers(type);
		const oldView = this.#offers;
		this.#offers = new OffersView(options);
		replace(this.#offers, oldView);
	}

	#handleChange = (type: PointType) => {
		this.#output.update(type);
		this.#updateOffers(type);
	};
}

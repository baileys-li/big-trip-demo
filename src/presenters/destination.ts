import DestinationChoiceView from '@views/destination-choice';
import { DestinationModel } from '../models';
import { render, replace } from '../framework/render';
import DestinationInfoView from '@views/destination-info';
import { Destination } from '../types/destinations';

interface DestinationPresenterProps {
	initialId: string;
	model: DestinationModel;
	wrapper: {
		selector: HTMLElement;
		output: HTMLElement;
	};
}

const EMPTY_DESTINATION: Destination = {
	description: '',
	name: '',
	pictures: [],
	id: '',
};

export default class DestinationPresenter {
	#model: DestinationModel;
	view!: HTMLDivElement;
	#output!: DestinationInfoView;
	#destination = EMPTY_DESTINATION;
	constructor({ initialId, model, wrapper }: DestinationPresenterProps) {
		this.#model = model;
		this.#initSelector(initialId, wrapper);
	}

	#initSelector(initialId: string, wrapper: DestinationPresenterProps['wrapper']) {
		this.#destination = this.#model.getById(initialId) ?? EMPTY_DESTINATION;

		const view = new DestinationChoiceView({
			name: this.#destination.name,
			cities: this.#model.cities,
			onChange: this.#handleDestinationChange,
		});
		this.view = view.element;
		render(view, wrapper.selector, 'afterbegin');

		this.#output = new DestinationInfoView(this.#destination);
		render(this.#output, wrapper.output, 'afterbegin');
	}

	#handleDestinationChange = (name: string) => {
		if (this.#destination.name === name || !this.#model.isValidName(name)) {
			return;
		}
		this.#destination = this.#model.getByName(name)!;
		const oldOutput = this.#output;
		this.#output = new DestinationInfoView(this.#destination);
		replace(this.#output, oldOutput);
	};
}

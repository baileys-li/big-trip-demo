import AbstractView from '../framework/view/abstract-view';

export interface DestinationChoiceProps<City = string> {
	name?: City;
	cities: City[];
	onChange: (name: City) => void;
}

const markUp = ({ name = '', cities }: Omit<DestinationChoiceProps, 'onChange'>) => `<div class="event__field-group event__field-group--destination">
			<input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">
			<datalist id="destination-list-1">
				${cities.map((city) => `<option value="${city}"></option>`).join('')}
			</datalist>
		</div>`;

export default class DestinationChoiceView extends AbstractView<HTMLParagraphElement> {
	#props: Omit<DestinationChoiceProps, 'onChange'>;
	#onChange: DestinationChoiceProps['onChange'];
	constructor({onChange, ...props}: DestinationChoiceProps) {
		super();
		this.#props = props;
		this.#onChange = onChange;
		this.element.addEventListener('change', this.#handleDestinationChange);
	}

	#handleDestinationChange = (evt: Event) => {
		const { value } = evt.target as HTMLInputElement;
		this.#onChange(value);
	};

	get template() {
		return markUp(this.#props);
	}
}

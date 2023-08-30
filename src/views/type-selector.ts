import AbstractView from '../framework/view/abstract-view';
import { TypeCSSClass, markUpTypeWrapper } from '../templates/type-wrapper';
import { PointType } from '../types/point';

interface TypeSelectorViewProps {
	type: PointType
	onTypeChange(type: PointType): void;
}

export default class TypeSelectorView extends AbstractView<HTMLFormElement> {
	#initialType: PointType;
	#typeIcon: HTMLImageElement;
	#changeCallback: (type: PointType) => void;

	constructor({type, onTypeChange}: TypeSelectorViewProps) {
		super();
		this.#initialType = type;
		this.#changeCallback = onTypeChange;
		this.#typeIcon = this.element.querySelector(`.${TypeCSSClass.IMAGE}`)!;
		this.element.querySelector(`.${TypeCSSClass.RADIO__WRAPPER}`)?.addEventListener('change', this.#handleTypeChange);
	}

	get template() {
		return markUpTypeWrapper(this.#initialType);
	}

	#handleTypeChange = (evt: Event) => {
		const target = evt.target as HTMLInputElement;
		const type = target.value as PointType;
		this.#typeIcon!.src = `img/icons/${type}.png`;
		this.#changeCallback(type);
	};
}

import AbstractView from '../framework/view/abstract-view';

interface RollUpViewProps {
	onClick(event: Event): void;
}

function markUp() {
	return `<button class="event__rollup-btn" type="button">
	<span class="visually-hidden">Open event</span>
</button>`;
}

export default class RollUpView extends AbstractView<HTMLButtonElement> {
	constructor({onClick}: RollUpViewProps) {
		super();
		this.element.addEventListener('click', onClick);
	}

	get template() {
		return markUp();
	}
}

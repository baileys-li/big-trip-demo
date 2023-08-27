import type { MessageText } from '../constants/messages';
import AbstractView from '../framework/view/abstract-view';

function markUp(message: MessageText) {
	return `<p class="trip-events__msg">${message}</p>`;
}

export default class EventMessageView extends AbstractView<HTMLParagraphElement> {
	#text: MessageText | null = null;
	constructor(text: MessageText) {
		super();
		this.#text = text;
	}

	get template() {
		return markUp(this.#text!);
	}
}

import { createElement } from '../render';

/**
 * Abstract class for views
 */
export default class AbstractView<El extends HTMLElement = HTMLElement> {
	#element: El | null = null;

	constructor() {
		if (new.target === AbstractView) {
			throw new Error('Can\'t instantiate AbstractView, only concrete one.');
		}
	}

	get element() {
		if (!this.#element) {
			this.#element = createElement<El>(this.template);
		}

		return this.#element;
	}

	/**
	 * @abstract getter for template
	 * @returns markup string
	 */
	get template(): string {
		throw new Error('Abstract method not implemented: get template');
	}

	removeElement() {
		this.#element = null;
	}
}

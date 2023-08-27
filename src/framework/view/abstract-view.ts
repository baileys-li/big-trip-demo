import { createElement } from '../render';
import './abstract-view.css';

/**
 * Функция, которая будет вызвана методом shake после завершения анимации
 */
type shakeCallback = () => void;

const enum SnakeAnimation {
	TIMEOUT = 600,
	CLASS_NAME = 'shake',
}

export default class AbstractView<El extends Element = HTMLDivElement> {
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

	/** @abstract */
	get template(): string {
		throw new Error('Abstract method not implemented: get template');
	}

	removeElement() {
		this.#element = null;
	}

	shake(callback?: shakeCallback) {
		this.element.classList.add(SnakeAnimation.CLASS_NAME);
		setTimeout(() => {
			this.element.classList.remove(SnakeAnimation.CLASS_NAME);
			callback?.();
		}, SnakeAnimation.TIMEOUT);
	}
}

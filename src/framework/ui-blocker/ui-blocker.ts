import './ui-blocker.css';

interface UiBlockerConfig {
	lowerLimit: number;
	upperLimit: number;
}

export default class UiBlocker {
	#lowerLimit: number;
	#upperLimit: number;
	#element: HTMLElement | null = null;
	#onCSSClass = 'ui-blocker--on';

	#startTime: number = 0;
	#endTime: number = 0;
	#timerId: number = 0;


	constructor({lowerLimit, upperLimit}: UiBlockerConfig) {
		this.#lowerLimit = lowerLimit;
		this.#upperLimit = upperLimit;

		this.#element = document.createElement('div');
		this.#element.classList.add('ui-blocker');
		document.body.append(this.#element);
	}

	/** Метод для блокировки интерфейса */
	block() {
		this.#startTime = Date.now();
		this.#timerId = window.setTimeout(() => {
			this.#addClass();
		}, this.#lowerLimit);
	}

	/** Метод для разблокировки интерфейса */
	unblock() {
		this.#endTime = Date.now();
		const duration = this.#endTime - this.#startTime;

		if (duration < this.#lowerLimit) {
			clearTimeout(this.#timerId);
			return;
		}

		if (duration >= this.#upperLimit) {
			this.#removeClass();
			return;
		}

		setTimeout(this.#removeClass, this.#upperLimit - duration);
	}

	#addClass = () => {
		this.#element?.classList.add(this.#onCSSClass);
	};

	#removeClass = () => {
		this.#element?.classList.remove(this.#onCSSClass);
	};
}

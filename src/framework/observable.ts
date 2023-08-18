type ObserverCallback = (event: unknown, payload?: unknown) => void;

export default class Observable {
	#observers = new Set<ObserverCallback>();

	addObserver(observer: ObserverCallback) {
		this.#observers.add(observer);
	}

	removeObserver(observer: ObserverCallback) {
		this.#observers.delete(observer);
	}

	_notify(event: unknown, payload?: unknown) {
		this.#observers.forEach((observer) => observer(event, payload));
	}
}


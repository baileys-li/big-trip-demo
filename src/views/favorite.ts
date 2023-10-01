import AbstractView from '../framework/view/abstract-view';

interface FavoriteViewProps {
	onClick(): Promise<unknown>;
	initialFavorite?: boolean;
}

const CLASS_NAME = 'event__favorite-btn';

const ActionButtonCSSClass = {
	FAVORITE: CLASS_NAME,
	ACTIVE: `${CLASS_NAME}--active`,
};

function markUp(isFavorite: boolean) {
	const favoriteClasses = [ActionButtonCSSClass.FAVORITE];

	if (isFavorite) {
		favoriteClasses.push(ActionButtonCSSClass.ACTIVE);
	}

	return `<button class="${favoriteClasses.join(' ')}" type="button">
	<span class="visually-hidden">Add to favorite</span>
	<svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
		<path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
	</svg>
	</button>`;
}

export default class FavoriteView extends AbstractView<HTMLLabelElement> {
	#initialValue: boolean;
	#request: FavoriteViewProps['onClick'];
	constructor({onClick, initialFavorite = false}: FavoriteViewProps) {
		super();
		this.#initialValue = initialFavorite;
		this.#request = onClick;
		this.element.addEventListener('click', this.#handleClick);
	}

	#handleClick = async () => {
		await this.#request();
		this.#toggleFavorite();
	};

	#toggleFavorite() {
		this.element.classList.toggle(ActionButtonCSSClass.ACTIVE);
	}

	get template() {
		return markUp(this.#initialValue);
	}
}

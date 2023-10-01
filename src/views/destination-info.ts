import AbstractView from '../framework/view/abstract-view';
import { Destination } from '../types/destinations';

export type DestinationChoiceProps = Partial<Destination>;

const markUp = ({
	description = '',
	pictures = [],
}: DestinationChoiceProps) => `<section class="event__section  event__section--destination">
<h3 class="event__section-title  event__section-title--destination">Destination</h3>
<p class="event__destination-description">${description}</p>

<div class="event__photos-container">
	<div class="event__photos-tape">
		${pictures.map(({ src, description: alt }) => `<img class="event__photo" src="${src}" alt="${alt}">`).join('')}
	</div>
</div>
</section>`;

export default class DestinationInfoView extends AbstractView<HTMLParagraphElement> {
	#props: DestinationChoiceProps;

	constructor(destination: DestinationChoiceProps) {
		super();
		this.#props = destination;
	}

	get template() {
		return markUp(this.#props);
	}
}

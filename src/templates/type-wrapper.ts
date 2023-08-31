import { POINT_TYPES } from '../constants';
import { PointType } from '../types/point';
import { capitilize } from '../utils';

export const TypeCSSClass = {
	RADIO__WRAPPER: 'event__type-group',
	IMAGE: 'event__type-icon',
	TOGGLE: 'event__type-toggle',
};

const markUpTypeSelect = (type: PointType, checked = false) => `<div class="event__type-item">
<input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}"${
	checked ? ' checked' : ''
}>
<label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${capitilize(type)}</label>
</div>`;

const markUpTypeList = (checked: PointType) => POINT_TYPES.map((type) => markUpTypeSelect(type, type === checked)).join('');

export const markUpTypeWrapper = (type: PointType) => `<div class="event__type-wrapper">
<label class="event__type  event__type-btn" for="event-type-toggle-1">
	<span class="visually-hidden">Choose event type</span>
	<img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="${type} icon">
</label>
<input class="${TypeCSSClass.TOGGLE}  visually-hidden" id="event-type-toggle-1" type="checkbox">

<div class="event__type-list">
	<fieldset class="event__type-group">
		<legend class="visually-hidden">Event type</legend>
		${markUpTypeList(type)}
	</fieldset>
</div>
</div>`;

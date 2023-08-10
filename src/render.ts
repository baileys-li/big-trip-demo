import type AbstractView from './views/_abstract';

/**
 * @param template  parsable to HTML string
 */
function createElement<El extends Element = HTMLDivElement>(template: string) {
	const newElement = document.createElement('div');
	newElement.innerHTML = template;

	return newElement.firstElementChild as El;
}


function render(component: AbstractView, container: Element, place: InsertPosition = 'beforeend') {
	container.insertAdjacentElement(place, component.element);
}

export { createElement, render };

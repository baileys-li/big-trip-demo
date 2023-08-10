/**
 * @param template  parsable to HTML string
 */
function createElement<El extends Element = HTMLDivElement>(template: string) {
	const newElement = document.createElement('div');
	newElement.innerHTML = template;

	return newElement.firstElementChild as El;
}

interface GenericComponent {
	getElement(): Element;
}

function render(component: GenericComponent, container: Element, place: InsertPosition = 'beforeend') {
	container.insertAdjacentElement(place, component.getElement());
}

export { createElement, render };

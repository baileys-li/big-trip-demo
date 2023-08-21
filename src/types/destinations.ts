interface Picture {
	src: string;
	description: string;
}

interface Destination {
	id: string;
	description: string;
	name: string;
	pictures: Picture[];
}

export type { Picture, Destination };

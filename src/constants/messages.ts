const Status = {
	LOADING: 'Loading...',
	ERROR: 'Failed to load latest route information'
} as const;

const CreateNewMessage = {
	EVERYTHING: 'Click New Event to create your first point',
	PAST: 'There are no past events now',
	PRESENT: 'There are no present events now',
	FUTURE: 'There are no future events now'
} as const;

type StatusText = typeof Status[keyof typeof Status];
type CreateNewMessageText = typeof CreateNewMessage[keyof typeof CreateNewMessage];

export type MessageText = StatusText | CreateNewMessageText;
export { Status, CreateNewMessage };

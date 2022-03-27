const NOTES_INITIAL: string = 'NOTES_INITIAL';
const SAVE_NOTE: string = 'SAVE_NOTE';

const initialState = {
	notes: [
		{
			id: 0,
			title: 'ShortCut info',
			text: 'WebStorm has keyboard shortcuts for most of its commands related to editing, navigation, refactoring, debugging, and other tasks. Memorizing these hotkeys can help you stay more productive by keeping your hands on the keyboard. All default shortcuts are configurable and you can also assign shortcuts to any action that does not have them by default.',
			color: '#FD99FF',
		},
		{
			id: 1,
			title: 'How to use notepad',
			text: 'Predefined keymaps do not cover every possible platform, version, and configuration. Some shortcuts can conflict with global system actions and shortcuts for third-party software. WebStorm detects the conflicts and notifies you with a popup message. To fix these conflicts, you can reassign or disable the conflicting shortcut as described in Conflicts with global OS shortcuts.',
			color: '#FF9E9E',
		},
	],
	totalCountNotes: 0,
};

const notesReducer = (state: any = initialState, action: any) => {
	switch (action.type) {
		case NOTES_INITIAL: {
			return {
				...state,
				notes: action.payload,
			};
		}
		case SAVE_NOTE: {
			let why: boolean = false;
			state.notes[action.payload.id] ? (why = true) : (why = false);

			console.log(why);
			if (why) {
				state.notes[action.payload.id] = action.payload;
				return {
					...state,
				};
			} else {
				return {
					...state,
					notes: [...state.notes, action.payload],
				};
			}
		}
		default:
			return state;
	}
};

export default notesReducer;

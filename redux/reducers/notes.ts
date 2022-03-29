const NOTES_INITIAL: string = 'NOTES_INITIAL';
const SAVE_NOTE: string = 'SAVE_NOTE';
const DELETE_ALL_NOTES: string = 'DELETE_ALL_NOTES';

const initialState = {
	notes: [],
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
		case DELETE_ALL_NOTES: {
			return {
				...state,
				notes: [],
				totalCountNotes: 0,
			};
		}
		default:
			return state;
	}
};

export default notesReducer;

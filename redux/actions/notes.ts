export const initialNotes = (notesInfo: any) => ({
	type: 'NOTES_INITIAL',
	payload: notesInfo,
});

export const saveNote = (notesInfo: {}) => {
	return {
		type: 'SAVE_NOTE',
		payload: notesInfo,
	};
};

export const deleteAllNotes = () => {
	return {
		type: 'DELETE_ALL_NOTES',
	};
};

export const deleteNotes = (id: string) => {
	return {
		type: 'DELETE_NOTE',
		id: id,
	};
};

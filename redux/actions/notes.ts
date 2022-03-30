export const initialNotes = (notesInfo: any) => ({
	type: 'NOTES_INITIAL',
	payload: notesInfo,
});

interface notesInfo {
	id: number;
	title: string;
	noteText: string;
	color: string;
}
export const saveNote = (notesInfo: notesInfo) => {
	console.log(notesInfo);
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

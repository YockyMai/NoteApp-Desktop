import axios from 'axios';
import { deleteNotes, saveNote } from '../redux/actions/notes';

export const onSaveNote = (
	username: string,
	id: string,
	titleValue: string,
	color: string,
	noteValue: string,
	// setResInfo: React.Dispatch<SetStateAction<any>>,
) => {
	return async (dispatch: any) => {
		try {
			if (id !== 'newNote') {
				const response = await axios.post(
					'https://apifornoteapp.herokuapp.com/notes/createnote',
					{
						username: username,
						note: {
							id: id,
							title: titleValue,
							color: color,
							noteText: noteValue,
						},
					},
				);
				console.log(response);
				dispatch(saveNote(response.data.result));
			} else {
				const response = await axios.post(
					'https://apifornoteapp.herokuapp.com/notes/createnote',
					{
						username: username,
						note: {
							title: titleValue,
							noteText: noteValue,
							color: color,
						},
					},
				);
			}
		} catch (e) {
			console.log(e);
		}
	};
};

export const deleteNote = (
	username: string,
	id: string,
	// setResInfo: React.Dispatch<SetStateAction<any>>,
) => {
	return async (dispatch: any) => {
		try {
			dispatch(deleteNotes(id));
			const response = await axios.post(
				'https://apifornoteapp.herokuapp.com/notes/deletenote',
				{
					username: username,
					id: id,
				},
			);
		} catch (e) {
			console.log(e);
		}
	};
};

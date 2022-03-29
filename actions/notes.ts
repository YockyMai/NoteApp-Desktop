import axios from 'axios';
import { saveNote } from '../redux/actions/notes';

export const onSaveNote = (
	username: string,
	id: string,
	titleValue: string,
	color: string,
	noteValue: string,
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
				// dispatch(saveNote(response.data.result));
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
		} catch (e) {}
	};
};

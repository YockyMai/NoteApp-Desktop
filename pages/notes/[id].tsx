import React, { FC, HTMLInputTypeAttribute, useRef } from 'react';
import MainLayout from '../../components/MainLayout';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Head } from 'next/dist/pages/_document';
import { saveNote } from '../../redux/actions/notes';
import { Input } from 'postcss';
import { RootState } from '../../redux/reducers';

interface editorProps {
	id?: number;
}

const NoteEditor: FC<editorProps> = ({}) => {
	const router = useRouter();
	const dispatch = useDispatch();

	const noteColor = useRef<HTMLInputElement>();

	const id = router.query.id;
	let titleText: string = 'Title';
	let noteTextInit: string = 'Type something...';
	const dataNote = useSelector(
		(state: RootState) => state.notesReducer.notes[id as string],
	);

	const [titleValue, setTitleValue] = React.useState(
		dataNote ? dataNote.title : titleText,
	);
	const [noteValue, setNoteValue] = React.useState(
		dataNote ? dataNote.text : noteTextInit,
	);
	const [color, setColor] = React.useState<string>(
		dataNote ? dataNote.color : '#929292',
	);

	let k = 0;
	const onChangeTitleValue = (e: any) => {
		if (e.target.value.length >= 0 && e.target.value.length !== 30) {
			setTitleValue(e.target.value);
		} else if (e.target.value.length === 30) {
			alert('Вы достигли максимального количества символов');
		}
	};

	const onSaveNote = () => {
		let idNote = Number(id); // преобразуем в строку
		const noteObj = {
			id: idNote,
			title: titleValue,
			text: noteValue,
			color: color,
		};
		dispatch(saveNote(noteObj));
	};

	function onChangeNoteValue(e: any) {
		setNoteValue(e.target.value);
	}

	return (
		<MainLayout>
			<div className="noteEditor">
				<div className="noteTitle">
					<input
						className="titleValue"
						type="text"
						value={titleValue}
						onChange={onChangeTitleValue}
					/>
				</div>
				<textarea
					className="noteContent"
					value={noteValue}
					onChange={onChangeNoteValue}
				/>
				<div className="controlPanel">
					<button onClick={onSaveNote}>Сохранить!</button>
					<input
						className="noteColor"
						onChange={(e) => {
							setColor(e.target.value);
						}}
						value={color}
						type="color"
						name="bg"
					/>
				</div>
			</div>
		</MainLayout>
	);
};

export default NoteEditor;

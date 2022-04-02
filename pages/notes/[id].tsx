import React, { FC, HTMLInputTypeAttribute, useRef } from 'react';
import MainLayout from '../../components/MainLayout';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Head } from 'next/dist/pages/_document';
import { saveNote } from '../../redux/actions/notes';
import { Input } from 'postcss';
import { RootState } from '../../redux/reducers';
import axios from 'axios';
import { onSaveNote } from '../../actions/notes';
import Link from 'next/link';

interface editorProps {
	id?: number;
}

const NoteEditor: FC<editorProps> = ({}) => {
	const router = useRouter();
	const dispatch = useDispatch();

	const id = router.query.id;

	const username = useSelector(
		(state: RootState) => state.userReducer.currentUser.username,
	);
	const dataNotes = useSelector(
		(state: RootState) => state.notesReducer.notes,
	);

	let dataNoteEl = dataNotes.find((dataNotes: any) => dataNotes._id === id);
	console.log(dataNoteEl);

	const [titleValue, setTitleValue] = React.useState(
		dataNoteEl ? dataNoteEl.title : 'Title',
	);
	const [noteValue, setNoteValue] = React.useState(
		dataNoteEl ? dataNoteEl.noteText : 'Type something...',
	);
	const [color, setColor] = React.useState<string>(
		dataNoteEl ? dataNoteEl.color : '#929292',
	);

	const onChangeTitleValue = (e: any) => {
		if (e.target.value.length >= 0 && e.target.value.length <= 29) {
			setTitleValue(e.target.value);
		} else if (e.target.value.length >= 30) {
			alert('Вы достигли максимального количества символов');
		}
	};

	function onChangeNoteValue(e: any) {
		setNoteValue(e.target.value);
	}

	return (
		<MainLayout>
			<div className="noteEditor">
				<div className="noteTitle">
					<input
						placeholder="Title..."
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
					<div className="noteColor-container">
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
					<Link href={id === 'newNote' ? '/notes' : `/notes/${id}`}>
						<a>
							<button
								className="saveNoteBtn"
								onClick={() => {
									dispatch(
										onSaveNote(
											username,
											id as string,
											titleValue,
											color,
											noteValue,
										),
									);
								}}>
								<svg
									width="23"
									height="22"
									viewBox="0 0 23 22"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M17.3332 0.399902H2.83317C1.49192 0.399902 0.416504 1.4799 0.416504 2.7999V19.5999C0.416504 20.9199 1.49192 21.9999 2.83317 21.9999H19.7498C21.079 21.9999 22.1665 20.9199 22.1665 19.5999V5.1999L17.3332 0.399902ZM19.7498 19.5999H2.83317V2.7999H16.3303L19.7498 6.1959V19.5999ZM11.2915 11.1999C9.28567 11.1999 7.6665 12.8079 7.6665 14.7999C7.6665 16.7919 9.28567 18.3999 11.2915 18.3999C13.2973 18.3999 14.9165 16.7919 14.9165 14.7999C14.9165 12.8079 13.2973 11.1999 11.2915 11.1999ZM4.0415 3.9999H14.9165V8.7999H4.0415V3.9999Z"
										fill="white"
									/>
								</svg>
							</button>
						</a>
					</Link>
				</div>
			</div>
		</MainLayout>
	);
};

export default NoteEditor;

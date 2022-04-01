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
					{id === 'newNote' ? (
						<Link href="/notes">
							<a>
								<button
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
									Сохранить!
								</button>
							</a>
						</Link>
					) : (
						<button
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
							Сохранить!
						</button>
					)}

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

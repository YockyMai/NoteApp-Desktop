import Image from 'next/image';
import deleteIcon from '../public/images/delete.svg';
import linkIcon from '../public/images/link.svg';
import React, { FC, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNote } from '../actions/notes';
import { RootState } from '../redux/reducers';

interface taskProps {
	color: string;
	title: string;
	id: string;
}

const TaskElement: FC<taskProps> = ({ color, title, id }) => {
	const [hover, setHover] = useState<boolean>(false);
	const dispatch = useDispatch();
	const username = useSelector(
		(state: RootState) => state.userReducer.currentUser.username,
	);
	const onTuskEnter = () => {
		setHover(true);
	};
	const onTuskLeave = () => {
		setHover(false);
	};

	return (
		<div
			style={{ backgroundColor: color }}
			className={'task-element'}
			onMouseEnter={onTuskEnter}
			onMouseLeave={onTuskLeave}>
			<Link href={`notes/${id}`} passHref>
				<p className="taskEl--text">{title}</p>
			</Link>
			<div
				style={{ backgroundColor: color }}
				className={
					hover ? 'task-controlPanel visible' : 'task-controlPanel'
				}>
				<span
					className="task-controlBtn btn"
					onClick={() => {
						dispatch(deleteNote(username, id));
					}}>
					<Image src={deleteIcon} alt="delete" />
				</span>
				<span className="task-controlBtn btn">
					<Image src={linkIcon} alt="share" />
				</span>
			</div>
		</div>
	);
};

export default TaskElement;

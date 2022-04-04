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
					<svg
						width="11"
						height="13"
						viewBox="0 0 11 13"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M0.294678 1.87427H2.54468V0.374268L8.54468 0.374268V1.87427H10.7947V3.37427L0.294678 3.37427L0.294678 1.87427Z"
							fill="#F7F0EA"
						/>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M9.29468 4.87427H1.79468L1.79468 12.3743H9.29468V4.87427ZM6.29468 7.12427H4.79468V10.1243H6.29468V7.12427Z"
							fill="#F7F0EA"
						/>
					</svg>
				</span>
				<span className="task-controlBtn btn">
					<svg
						width="14"
						height="14"
						viewBox="0 0 14 14"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M12.2971 6.1026C13.0959 6.90144 13.5447 7.98489 13.5447 9.11462C13.5447 11.4672 11.6376 13.3743 9.28503 13.3743C8.1553 13.3743 7.07185 12.9255 6.27301 12.1266L4.60718 10.4608L5.75623 9.31177L7.42206 10.9776C7.91615 11.4717 8.58628 11.7493 9.28503 11.7493C10.7401 11.7493 11.9197 10.5697 11.9197 9.11462C11.9197 8.41587 11.6421 7.74574 11.148 7.25165L9.48218 5.58582L10.6312 4.43677L12.2971 6.1026Z"
							fill="#F7F0EA"
						/>
						<path
							d="M2.94135 6.49689L4.60718 8.16272L3.45813 9.31177L1.7923 7.64594C0.993461 6.8471 0.544678 5.76364 0.544678 4.63391C0.544678 2.28138 2.45179 0.374268 4.80432 0.374268C5.93405 0.374268 7.01751 0.823049 7.81635 1.62189L9.48218 3.28772L8.33313 4.43677L6.6673 2.77094C6.17321 2.27684 5.50308 1.99927 4.80432 1.99927C3.34925 1.99927 2.16968 3.17884 2.16968 4.63391C2.16968 5.33266 2.44726 6.0028 2.94135 6.49689Z"
							fill="#F7F0EA"
						/>
						<path
							d="M4.03265 5.01129L8.90765 9.88629L10.0567 8.73724L5.1817 3.86224L4.03265 5.01129Z"
							fill="#F7F0EA"
						/>
					</svg>
				</span>
			</div>
		</div>
	);
};

export default TaskElement;

import Image from 'next/image';
import deleteIcon from '../public/images/delete.svg';
import linkIcon from '../public/images/link.svg';
import React, { FC, useState } from 'react';
import Link from 'next/link';

interface taskProps {
	color: string;
	title: string;
	id: number;
}

const TaskElement: FC<taskProps> = ({ color, title, id }) => {
	const [hover, setHover] = useState<boolean>(false);
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
				<span className="task-controlBtn btn">
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

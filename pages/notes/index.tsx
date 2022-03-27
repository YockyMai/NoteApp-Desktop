import React, { useEffect, useState } from 'react';
import MainLayout from '../../components/MainLayout';
import TaskElement from '../../components/taskElement';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { RootState } from '../../redux/reducers';

const Notes = () => {
	const [TaskData, setTaskData] = React.useState<number>(0);
	const dispatch = useDispatch();
	useEffect(() => {
		localStorage.setItem('notesData', '123');
	}, []);

	const taskElements: any = useSelector(
		(state: RootState) => state.notesReducer.notes,
	);
	return (
		<MainLayout>
			<div className="taskContainer">
				{taskElements.map((taskEl: any, index: number) => (
					<TaskElement
						key={index}
						id={taskEl.id}
						color={taskEl.color}
						title={taskEl.title}
					/>
				))}
			</div>
			<Link href={`notes/${taskElements.length}`}>
				<a>
					<div className="add-tusk-button">
						<section className="svg-container">
							<svg
								className="circle"
								xmlns="http://www.w3.org/2000/svg">
								<g>
									<ellipse
										className="background"
										ry="60"
										rx="60"
										cy="62.5"
										cx="62.5"
										strokeWidth="2"
									/>
									<ellipse
										className="foreground"
										ry="60"
										rx="60"
										cy="62.5"
										cx="62.5"
										strokeWidth="2"
									/>
									<line
										className="line line1"
										x1="52"
										y1="62"
										x2="74"
										y2="62"
									/>
									<line
										className="line line2"
										x1="52"
										y1="62"
										x2="74"
										y2="62"
									/>
								</g>
							</svg>
						</section>
					</div>
				</a>
			</Link>
		</MainLayout>
	);
};

export default Notes;

import React, { FC, useEffect, useState } from 'react';
import MainLayout from '../../components/MainLayout';
import TaskElement from '../../components/taskElement';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { RootState } from '../../redux/reducers';
import axios from 'axios';
import { initialNotes } from '../../redux/actions/notes';
import StartImage from '../../public/images/StartImage.png';
import startArrow from '../../public/images/startArrow.svg';
import Image from 'next/image';

const Notes: FC = ({}) => {
	const [TaskData, setTaskData] = React.useState<number>(0);
	const [isLoaded, setIsLoaded] = React.useState(true);
	const dispatch = useDispatch();
	const user = useSelector((state: RootState) => state.userReducer);
	console.log(user);
	useEffect(() => {
		(async () => {
			if (user.isAuth) {
				setIsLoaded(true);
				const response = await axios.post(
					'https://apifornoteapp.herokuapp.com/notes/getnotes',
					{
						username: user.currentUser.username,
					},
				);
				console.log(response.data.userNotes);
				dispatch(initialNotes(response.data.userNotes));
				setIsLoaded(false);
			} else {
				setIsLoaded(false);
			}
		})();
	}, []);

	const taskElements: any = useSelector(
		(state: RootState) => state.notesReducer.notes,
	);
	return (
		<MainLayout>
			{isLoaded ? (
				<div className="container-loader">
					<div className="spinner-block">
						<div className="spinner spinner-1"></div>
					</div>
				</div>
			) : (
				<>
					{taskElements.length > 0 ? (
						<div className="taskContainer">
							{taskElements.map((taskEl: any, index: number) => (
								<TaskElement
									key={index}
									id={taskEl._id}
									color={taskEl.color}
									title={taskEl.title}
								/>
							))}
						</div>
					) : (
						<div className="startScreen">
							<div>
								<Image src={StartImage} />
							</div>
							<h1>Create your first note!</h1>
						</div>
					)}
					<Link href={`notes/newNote`}>
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
				</>
			)}
		</MainLayout>
	);
};

// export async function getServerSideProps() {
// 	const response = await axios.post('http://localhost:5000/notes/getnotes', {
// 		username: 'YockyMai',
// 	});
// 	const data = response.data.userNotes;

// 	// Pass data to the page via props
// 	return { props: { data } };
// }

export default Notes;

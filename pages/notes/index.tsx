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
import { Error } from '../../components/Error';
import { Search } from '../../components/Search';
import { auth } from '../../actions/user';

const Notes: FC = ({}) => {
	const [inProp, setInProp] = React.useState(false);
	const [TaskData, setTaskData] = React.useState<number>(0);
	const [searchValue, setSearchValue] = React.useState('');
	const [isLoaded, setIsLoaded] = React.useState(true);
	const dispatch = useDispatch();
	const user = useSelector((state: RootState) => state.userReducer);

	useEffect(() => {
		(async () => {
			dispatch(auth());
			if (user.isAuth) {
				setIsLoaded(true);
				const response = await axios.post(
					'https://apifornoteapp.herokuapp.com/notes/getnotes',
					{
						username: user.currentUser.username,
					},
				);
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

	const filteredNotes = taskElements.filter((note: { title: string }) => {
		return note.title.toLowerCase().includes(searchValue.toLowerCase());
	});
	return (
		<div
			onKeyDown={(e: any) => {
				if (inProp === true)
					if (e.keyCode === 27) {
						setInProp(false);
						setSearchValue('');
					}
			}}>
			<MainLayout setInProp={setInProp}>
				<Search
					inProp={inProp}
					searchValue={searchValue}
					setSearchValue={setSearchValue}
				/>
				{isLoaded ? (
					<div className="container-loader">
						<div className="spinner-block">
							<div className="spinner spinner-1"></div>
						</div>
					</div>
				) : (
					<div
						className="noteContent"
						onClick={() => {
							setInProp(false);
							setSearchValue('');
						}}>
						<div>
							{taskElements.length > 0 ? (
								<>
									{filteredNotes.length > 0 ? (
										<div className="taskContainer">
											{filteredNotes.map(
												(
													taskEl: any,
													index: number,
												) => (
													<TaskElement
														key={index}
														id={taskEl._id}
														color={taskEl.color}
														title={taskEl.title}
													/>
												),
											)}
										</div>
									) : (
										<div className="startScreen">
											<div>
												<Image src={StartImage} />
											</div>
											<h1>
												Oops, there doesn&apos;t seem to
												be a
												<br />
												notes with that title.
											</h1>
										</div>
									)}
								</>
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
						</div>
					</div>
				)}
			</MainLayout>
		</div>
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

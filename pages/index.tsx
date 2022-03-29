import type { NextPage } from 'next';
import MainLayout from '../components/MainLayout';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';

const Home: NextPage = () => {
	const username = useSelector(
		(state: RootState) => state.userReducer.currentUser.username,
	);
	console.log(username);
	return (
		<MainLayout>
			<div className="welcome-block-container">
				<div className="welcome-block">
					<div>
						<p aria-label="CodePen">
							<span data-text="C">C</span>
							<span data-text="R">R</span>
							<span data-text="E">E</span>
							<span data-text="A">A</span>
							<span data-text="T">T</span>
							<span data-text="E">E</span>
							<br />
							<span data-text="Y">Y</span>
							<span data-text="O">O</span>
							<span data-text="U">U</span>
							<span data-text="R">R</span>
							<br />
							<span data-text="F">F</span>
							<span data-text="I">I</span>
							<span data-text="R">R</span>
							<span data-text="S">S</span>
							<span data-text="T">T</span>
							<br />
							<span data-text="N">N</span>
							<span data-text="O">O</span>
							<span data-text="T">T</span>
							<span data-text="E">E</span>
						</p>
					</div>
					<Link href={'/notes'}>
						<a>
							<div className="letsGo-Btn">
								<svg viewBox="0 0 960 300">
									<symbol id="s-text">
										<text
											textAnchor="middle"
											x="50%"
											y="80%">
											Lets Go
										</text>
									</symbol>
									<g className="g-ants">
										<use
											xlinkHref={'#s-text'}
											className="text-copy"></use>
										<use
											xlinkHref={'#s-text'}
											className="text-copy"></use>
										<use
											xlinkHref={'#s-text'}
											className="text-copy"></use>
										<use
											xlinkHref={'#s-text'}
											className="text-copy"></use>
										<use
											xlinkHref={'#s-text'}
											className="text-copy"></use>
									</g>
								</svg>
							</div>
						</a>
					</Link>
				</div>
			</div>
		</MainLayout>
	);
};

export default Home;

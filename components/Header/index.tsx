import React, { useState } from 'react';
import Logo from '../Logo';
import Image from 'next/image';
import searchIcon from '../../public/images/searchIcon.svg';
import settingIcon from '../../public/images/settingIcon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import Link from 'next/link';
import { logout } from '../../actions/user';

interface HeaderProps {
	register?: boolean;
	setInProp?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ register, setInProp }) => {
	const isAuth = useSelector((state: RootState) => state.userReducer.isAuth);
	const dispatch = useDispatch();
	const username = useSelector(
		(state: RootState) => state.userReducer.currentUser.username,
	);

	return (
		<div className="container">
			<header className="header">
				<Logo />
				{isAuth && <h2>{username}</h2>}
				<div className="header__btnBlock">
					<button
						className="btn header-btn"
						onClick={() => {
							if (setInProp) setInProp(true);
						}}>
						<Image src={searchIcon} alt="search" />
					</button>
					<button className="btn header-btn">
						<Image src={settingIcon} alt="setting" />
					</button>
					{!isAuth && (
						<Link href="/Login">
							<a>
								<button className="btn auth-btn">
									<h3>Register / LogIn</h3>
								</button>
							</a>
						</Link>
					)}
					{isAuth && (
						<button
							className="btn header-btn"
							onClick={() => {
								dispatch(logout());
							}}>
							<svg
								width="37"
								height="29"
								viewBox="0 0 37 29"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M0 5.56919V24.3108C0 26.8932 2.09701 29 4.66753 29H19.7449C22.3155 29 24.4125 26.8932 24.4125 24.3108V21.2753C24.4125 20.7618 23.9991 20.3465 23.488 20.3465C22.9769 20.3465 22.5635 20.7618 22.5635 21.2753V24.3108C22.5635 25.8739 21.2933 27.15 19.7374 27.15H4.66753C3.11169 27.15 1.84146 25.8739 1.84146 24.3108V5.56919C1.84146 4.00612 3.11169 2.73 4.66753 2.73H19.7449C21.3008 2.73 22.571 4.00612 22.571 5.56919V8.60469C22.571 9.11816 22.9844 9.53347 23.4955 9.53347C24.0066 9.53347 24.42 9.11816 24.42 8.60469V5.56919C24.42 2.98674 22.323 0.880005 19.7524 0.880005H4.66753C2.09701 0.880005 0 2.97919 0 5.56919Z"
									fill="white"
								/>
								<path
									d="M29.0734 22.063C29.2548 22.2477 29.489 22.34 29.7308 22.34C29.9726 22.34 30.2069 22.2477 30.3882 22.063L36.728 15.6058C37.0907 15.2363 37.0907 14.6437 36.728 14.2743L30.3882 7.81711C30.0255 7.44768 29.4437 7.44768 29.081 7.81711C28.7183 8.18653 28.7183 8.77914 29.081 9.14857L33.8415 13.9972H16.4695C15.9556 13.9972 15.54 14.4205 15.54 14.9439C15.54 15.4672 15.9556 15.8905 16.4695 15.8905H33.8339L29.0734 20.7392C28.7107 21.1009 28.7107 21.7012 29.0734 22.063Z"
									fill="white"
								/>
							</svg>
						</button>
					)}
				</div>
			</header>
		</div>
	);
};

export default Header;

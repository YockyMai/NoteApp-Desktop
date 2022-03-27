import React, { useState } from 'react';
import Logo from '../Logo';
import Image from 'next/image';
import searchIcon from '../../public/images/searchIcon.svg';
import settingIcon from '../../public/images/settingIcon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import Link from 'next/link';
import logoutSvg from '../../public/images/logout.svg';
import { logout } from '../../actions/user';

interface HeaderProps {
	register?: boolean;
}

const Header: React.FC<HeaderProps> = ({ register }) => {
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
					{!isAuth && (
						<>
							<button className="btn header-btn">
								<Image src={searchIcon} alt="search" />
							</button>
							<button className="btn header-btn">
								<Image src={settingIcon} alt="setting" />
							</button>
							<Link href="/Login">
								<a>
									<button className="btn auth-btn">
										<h3>Register / LogIn</h3>
									</button>
								</a>
							</Link>
						</>
					)}
					{isAuth && (
						<>
							<button className="btn header-btn">
								<Image src={searchIcon} alt="search" />
							</button>
							<button className="btn header-btn">
								<Image src={settingIcon} alt="setting" />
							</button>

							<button
								className="btn header-btn"
								onClick={() => {
									dispatch(logout());
								}}>
								<Image
									src={logoutSvg}
									alt="LogOut"
									height={40}
									width={40}
								/>
							</button>
						</>
					)}
				</div>
			</header>
		</div>
	);
};

export default Header;

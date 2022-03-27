import React, { useState } from 'react';
import Logo from '../Logo';
import Image from 'next/image';
import searchIcon from '../../public/images/searchIcon.svg';
import settingIcon from '../../public/images/settingIcon.svg';

interface HeaderProps {
	register?: boolean;
}

const Header: React.FC<HeaderProps> = ({ register }) => {
	const btnArr: Array<any> = [{}];
	return (
		<div className="container">
			<header className="header">
				<Logo />
				<div className="header__btnBlock">
					<button className="btn header-btn">
						<Image src={searchIcon} alt="search" />
					</button>
					<button className="btn header-btn">
						<Image src={settingIcon} alt="setting" />
					</button>
				</div>
			</header>
		</div>
	);
};

export default Header;

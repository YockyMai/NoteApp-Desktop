import { Head } from 'next/dist/pages/_document';
import React from 'react';
import Header from './Header';

interface appProps {
	children: any;
	header?: any;
	setInProp?: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainLayout: React.FC<appProps> = ({ children, header, setInProp }) => {
	return (
		<div>
			<Header setInProp={setInProp} {...header} />
			<main>{children}</main>
		</div>
	);
};

export default MainLayout;

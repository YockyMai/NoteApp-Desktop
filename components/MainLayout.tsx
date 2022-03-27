import { Head } from 'next/dist/pages/_document';
import React from 'react';
import Header from './Header';

interface appProps {
	children: any;
	header?: any;
}

const MainLayout: React.FC<appProps> = ({ children, header }) => {
	return (
		<div>
			<Header {...header} />
			<main>{children}</main>
		</div>
	);
};

export default MainLayout;

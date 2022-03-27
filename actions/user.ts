import axios from 'axios';
import React from 'react';

export const registration = async (
	username: string,
	password: string,
	setLoad: React.Dispatch<React.SetStateAction<boolean>>,
	setResponse: React.Dispatch<React.SetStateAction<{}>>, //типизация json
) => {
	try {
		setLoad(true);
		const response = await axios.post(
			'https://apifornoteapp.herokuapp.com/auth/registration',
			{
				username,
				password,
			},
		);
		setResponse(response.data);
		setLoad(false);
	} catch (e) {
		console.log('Упс, у нас какая-то ошибка, попробуйте позже!');
	}
};

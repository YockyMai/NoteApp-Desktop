import { logOut, setUser } from './../redux/actions/user';
import { Dispatch } from 'react';
import axios from 'axios';
import { deleteAllNotes } from '../redux/actions/notes';
import { SetStateAction } from 'react';

export const registration = async (
	username: string,
	password: string,
	setLoad: React.Dispatch<React.SetStateAction<boolean>>,
	reRef: any,
	setResInfo: Dispatch<SetStateAction<any>>,
) => {
	try {
		let captchaToken = reRef.current?.getValue();
		if (captchaToken) {
			reRef.current.reset();
			setLoad(true);
			const response = await axios.post(
				'https://apifornoteapp.herokuapp.com/auth/registration',
				{
					username,
					password,
					captchaToken,
				},
			);
			setLoad(false);
		} else {
			setResInfo({
				status: 'bad',
				message: 'Пройдите проверку на reCaptcha',
			});
		}
	} catch (e) {
		setResInfo({
			status: 'bad',
			message: 'Вероятнее всего, такой пользователь уже существует',
		});
		setLoad(false);
	}
};

export const login = (
	username: string,
	password: string,
	setLoad: React.Dispatch<React.SetStateAction<boolean>>,
	reRef: any,
	setResInfo: Dispatch<SetStateAction<any>>,
) => {
	return async (dispatch: any) => {
		try {
			let captchaToken = reRef.current?.getValue();
			if (captchaToken) {
				reRef.current.reset();
				setLoad(true);
				const response = await axios.post(
					'https://apifornoteapp.herokuapp.com/auth/login',
					{
						username,
						password,
						captchaToken,
					},
				);
				setLoad(false);
				dispatch(setUser(response.data.user));
				localStorage.setItem('token', response.data.token);
			} else {
				setResInfo({
					status: 'bad',
					message: 'Пройдите проверку на reCaptcha',
				});
			}
		} catch (e) {
			setResInfo({
				status: 'bad',
				message: 'Неверный логин или пароль',
			});
			setLoad(false);
		}
	};
};

export const logout = () => {
	return async (dispatch: any) => {
		try {
			dispatch(logOut());
			dispatch(deleteAllNotes());
			localStorage.removeItem('token');
		} catch (e) {
			alert('Упс, что-то пошло не так!');
		}
	};
};

export const auth = () => {
	return async (dispatch: any) => {
		try {
			let token = localStorage.getItem('token');
			const response = await axios.get(
				'https://apifornoteapp.herokuapp.com/auth/auth',
				{
					headers: {
						authorization: `Bearer ${token}`,
					},
				},
			);
			dispatch(setUser(response.data.user));
			localStorage.setItem('token', response.data.token);
		} catch (e) {
			console.log(e);
			localStorage.removeItem('token');
		}
	};
};

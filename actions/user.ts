import { logOut, setUser } from './../redux/actions/user';
import axios from 'axios';

export const registration = async (
	username: string,
	password: string,
	setLoad: React.Dispatch<React.SetStateAction<boolean>>,
	reRef: any,
) => {
	try {
		let captchaToken = reRef.current?.getValue();
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
	} catch (e) {
		alert('Вероятнее всего, такой пользователь уже существует');
		setLoad(false);
	}
};

export const login = (
	username: string,
	password: string,
	setLoad: React.Dispatch<React.SetStateAction<boolean>>,
	reRef: any,
) => {
	return async (dispatch: any) => {
		try {
			let captchaToken = reRef.current?.getValue();
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
		} catch (e) {
			alert('Неверный логин или пароль');
			setLoad(false);
		}
	};
};

export const logout = () => {
	return async (dispatch: any) => {
		try {
			dispatch(logOut());
			localStorage.removeItem('token');
		} catch (e) {
			alert('Упс, что-то пошло не так!');
		}
	};
};

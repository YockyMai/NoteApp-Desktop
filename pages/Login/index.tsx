import React from 'react';
import MainLayout from '../../components/MainLayout';
import { login, registration } from '../../actions/user';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';

const LoginPage = () => {
	const [username, setUsername] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [savepass, setSavePass] = React.useState(true);
	const [loader, setLoad] = React.useState(false);
	const isAuth = useSelector((state: RootState) => state.userReducer.isAuth);
	const dispatch = useDispatch();
	const router = useRouter();
	if (isAuth) {
		router.push('/');
	}
	return (
		<MainLayout>
			{loader ? (
				<div className="container-loader">
					<div className="spinner-block">
						<div className="spinner spinner-1"></div>
					</div>
				</div>
			) : (
				<div className="center loginform">
					<form className="authform">
						<input
							type="text"
							className="input"
							placeholder="Username"
							value={username}
							onChange={(e) => {
								setUsername(e.target.value);
							}}
						/>
						<input
							type="password"
							className="input"
							placeholder="Password"
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						/>
						<div className="flex checkbox">
							<label className="slideSwitch">
								<input
									type="checkbox"
									id="ChkBox"
									onChange={() => {
										setSavePass(!savepass);
									}}
								/>
								<span className="slideSwitchSlider"></span>
							</label>
							<h3>Save password</h3>
						</div>
						<div className="flex authContainer">
							<button
								className="authBtn"
								onClick={(e) => {
									registration(username, password, setLoad);
									e.preventDefault();
								}}>
								<h2>Sign In</h2>
							</button>
							<button
								className="authBtn"
								onClick={(e) => {
									dispatch(
										login(username, password, setLoad),
									);
									e.preventDefault();
								}}>
								<h2>Sign Up</h2>
							</button>
						</div>
					</form>
				</div>
			)}
		</MainLayout>
	);
};

export default LoginPage;

import React from 'react';
import MainLayout from '../../components/MainLayout';
import { login, registration } from '../../actions/user';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import ReCAPTCHA from 'react-google-recaptcha';
import { Error } from '../../components/Error';

const LoginPage = () => {
	const [username, setUsername] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [savepass, setSavePass] = React.useState(true);
	const [resInfo, setResInfo] = React.useState<any>({
		status: 'ok',
	});

	const [loader, setLoad] = React.useState(false);
	const isAuth = useSelector((state: RootState) => state.userReducer.isAuth);
	const dispatch = useDispatch();
	const router = useRouter();
	const reRef = React.useRef<{}>(); //captcha ref

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
						<div className="ReCAPTCHA">
							<ReCAPTCHA
								sitekey={
									process.env
										.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as any
								}
								size="normal"
								ref={reRef as any}
							/>
						</div>
						<div className="flex authContainer">
							<button
								className="authBtn"
								onClick={async (e) => {
									registration(
										username,
										password,
										setLoad,
										reRef,
										setResInfo,
									);
									e.preventDefault();
								}}>
								<h2>Sign Up</h2>
							</button>
							<button
								className="authBtn"
								onClick={(e) => {
									dispatch(
										login(
											username,
											password,
											setLoad,
											reRef,
											setResInfo,
										),
									);
									e.preventDefault();
								}}>
								<h2>Sign In</h2>
							</button>
						</div>
					</form>
				</div>
			)}
			{resInfo.status == 'bad' ? (
				<Error setResInfo={setResInfo} message={resInfo.message} />
			) : (
				''
			)}
		</MainLayout>
	);
};

export default LoginPage;

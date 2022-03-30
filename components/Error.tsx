import React, { FC, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { Transition } from 'react-transition-group';

interface errorProps {
	message: string;
	setResInfo: React.Dispatch<SetStateAction<any>>;
}

export const Error: FC<errorProps> = ({ message, setResInfo }) => {
	const [inProp, setInProp] = React.useState(false); // указывает

	const dispatch = useDispatch();

	React.useEffect(() => {
		setInProp(true);
		setTimeout(() => {
			setInProp(false);
			setResInfo({
				status: 'ok',
			});
		}, 3000);
	}, []);

	const duration = 150;

	const defaultStyle = {
		transition: `opacity ${duration}ms ease-in-out`,
		opacity: 0,
	};

	const transitionStyles: any = {
		entering: { opacity: 0 },
		entered: { opacity: 1 },
		exiting: { opacity: 1 },
		exited: { opacity: 0 },
	};

	return (
		<Transition in={inProp} timeout={duration} mountOnEnter unmountOnExit>
			{(state) => (
				<div
					onClick={() => {
						setInProp(false);
						setResInfo({
							status: 'ok',
						});
					}}
					style={{ ...defaultStyle, ...transitionStyles[state] }}
					className="error">
					<h3>{message}</h3>
				</div>
			)}
		</Transition>
	);
};

import React, { FC } from 'react';
import { Transition } from 'react-transition-group';

interface SearchProps {
	inProp: boolean;
	searchValue: string;
	setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

export const Search: FC<SearchProps> = ({
	inProp,
	setSearchValue,
	searchValue,
}) => {
	const inputRef = React.useRef<HTMLInputElement>(null);

	React.useEffect(() => {
		inputRef.current?.focus();
	});

	return (
		<Transition in={inProp} timeout={50} mountOnEnter unmountOnExit>
			{(state) => {
				return (
					<div className={`Search ${state}`}>
						<input
							ref={inputRef}
							value={searchValue}
							onChange={(e) => {
								setSearchValue(e.target.value);
							}}
							type="text"
							className="search__input"
							placeholder="Search"
						/>
					</div>
				);
			}}
		</Transition>
	);
};

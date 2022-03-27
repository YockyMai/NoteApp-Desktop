export const setUser = (user: any) => {
	return { type: 'SET_USER', payload: user };
};

export const logOut = () => ({ type: 'LOGOUT' });

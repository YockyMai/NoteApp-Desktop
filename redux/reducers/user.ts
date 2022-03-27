const SET_USER = 'SET_USER';
const LOGOUT = 'LOGOUT';

const initialState = {
	currentUser: {},
	isAuth: false,
};

const userReducer = (state: any = initialState, action: any) => {
	switch (action.type) {
		case SET_USER: {
			return {
				...state,
				currentUser: action.payload,
				isAuth: true,
			};
		}
		case LOGOUT: {
			return {
				...state,
				currentUser: {},
				isAuth: false,
			};
		}
		default:
			return state;
	}
};

export default userReducer;

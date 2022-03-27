import { combineReducers } from 'redux';
import notesReducer from '../reducers/notes';
import userReducer from './user';

const rootReducer = combineReducers({
	notesReducer,
	userReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

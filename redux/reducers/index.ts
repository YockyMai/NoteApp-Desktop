import { combineReducers } from 'redux';
import notesReducer from '../reducers/notes';

const rootReducer = combineReducers({
	notesReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

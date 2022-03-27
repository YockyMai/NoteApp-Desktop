import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

let store = createStore(
    rootReducer,
    composeWithDevTools (
        applyMiddleware ( thunk )
        //другие усилители хранилища, если есть
    )
)

export default store;
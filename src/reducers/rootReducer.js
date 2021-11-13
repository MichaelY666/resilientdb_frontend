import { combineReducers } from "redux";
import userReducer from './userReducer';
import docReducer from './docReducer';

const rootReducer = combineReducers({
    user: userReducer,
    doc: docReducer
});

export default rootReducer;
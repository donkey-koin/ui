import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import userReducer from './user';
import walletReducer from './wallet';
import messageReducer from './message';

const rootReducer = combineReducers({
    userReducer,
    walletReducer,
    messageReducer,
    routing
});

export default rootReducer;

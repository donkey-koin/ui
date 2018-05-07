import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import userReducer from './user';
import walletReducer from './wallet';

const rootReducer = combineReducers({
    userReducer,
    walletReducer,
    routing
});

export default rootReducer;

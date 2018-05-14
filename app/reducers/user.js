import * as types from '../actions/types';

const initState = {
    loggedIn: false,
    loggedUser: '',
    loginInProgress: false,
    token: undefined,
    isError: false
};

export default (state = initState, action) => {
    switch (action.type) {
        case types.LOGIN:
            return {
                ...state,
                loginInProgress: true,
                isError: false
            };
        case types.LOGIN_SUCCESSFUL: 
            return {
                ...state,
                loggedIn: true,
                loggedUser: action.payload.username,
                loginInProgress: false,
                token: action.payload.token,
                isError: false
            };
        case types.LOGIN_FAILURE:
            return {
                ...state,
                loginInProgress: false,
                isError: true
            };
        case types.LOGOUT:
            return {
                ...state,
                loggedIn: false,
                loggedUser: '',
                token: undefined
            };
        default:
            return state;
    }
};

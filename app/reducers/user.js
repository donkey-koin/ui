import * as types from '../actions/types';

const initState = {
    loggedIn: false,
    loggedUser: '',
    loginInProgress: false,
    token: undefined
};

export default (state = initState, action) => {
    switch (action.type) {
        case types.LOGIN:
            return {
                ...state,
                loginInProgress: true,
            };
        case types.LOGIN_SUCCESSFUL: 
            return {
                ...state,
                loggedIn: true,
                loggedUser: action.payload.username,
                loginInProgress: false,
                token: action.payload.token
            };
        case types.LOGIN_FAILURE:
            return {
                ...state,
                loginInProgress: false
            };
        default:
            return state;
    }
};

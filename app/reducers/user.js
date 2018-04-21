import * as types from '../actions/types';

const initState = {
    loggedIn: false,
    loggedUser: ''
};

export default (state = initState, action) => {
    switch (action.type) {
        case types.LOGIN:
            return {
                ...state,
                loggedIn: true,
                loggedUser: action.payload.username
            };
        default:
            return state;
    }
};

import * as types from '../actions/types';

const initState = {
    message: '',
    display: false,
    wasError: false
};

export default (state = initState, action) => {
    switch (action.type) {
        case types.SHOW_INFO_MESSAGE:
            return {
                ...state,
                display: true,
                message: action.payload.message,
                wasError: false
            };
        case types.SHOW_ERROR_MESSAGE:
            return {
                ...state,
                display: true,
                message: action.payload.message,
                wasError: true
            };
        case types.CLOSE_MESSAGE: 
            return { 
                ...state,
                display: false,
                message: '',
                wasError: false
            };
        default:
            return state;
    }
};

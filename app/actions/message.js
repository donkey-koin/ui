import * as types from './types';

export const closeMessage = () => dispatch => {
    dispatch({
        type: types.CLOSE_MESSAGE
    });
}
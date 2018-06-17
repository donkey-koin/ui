import * as types from './types';
import { fetchJSON } from './apiUtils';

export const getMyTransactions = (username, token) => dispatch => {

    dispatch({
        type: types.GET_MY_TRANSACTIONS
    });

    return fetchJSON("http://localhost:5000/chain", {
        "username": username,
    }, token).then(response => {
        console.log(response);
        if (response.error) {
            console.log(response.error)
            dispatch({ type: types.GET_MY_TRANSACTIONS_FAILURE })
        } else {
            dispatch({
                type: types.GET_ALL_TRANSACTIONS_SUCCESS,
            })
        }
    }).catch(error => {
        console.log(error)
        dispatch({ type: types.GET_MY_TRANSACTIONS_FAILURE })
    });
}

export const getAllTransactions = (token) => dispatch => {

    dispatch({
        type: types.GET_ALL_TRANSACTIONS
    });

    return fetchJSON("http://localhost:5000/chain", {}, token)
    .then(response => {
        console.log(response);
        if (response.error) {
            console.log(response.error)
            dispatch({ type: types.GET_ALL_TRANSACTIONS_FAILURE })
        } else {
            dispatch({
                type: types.GET_ALL_TRANSACTIONS_SUCCESS,
            })
        }
    }).catch(error => {
        console.log(error)
        dispatch({ type: types.GET_ALL_TRANSACTIONS_FAILURE })
    });
}



import * as types from './types';
import { fetchJSON } from './apiUtils';

export const buyKoin = (username, moneyAmount, token) => dispatch => {

    dispatch({
        type: types.BUY_KOIN
    });

    return fetchJSON("http://localhost:5000/purchase", {
        "username": username,
        "moneyAmount": moneyAmount
    }, "POST", token).then(response => {
        console.log(response);
        if (response.error) {
            console.log(response.error)
            dispatch({ type: types.BUY_KOIN_FAILURE })
        } else {
            dispatch({
                type: types.BUY_KOIN_SUCCESS,
            })
        }
    }).catch(error => {
        console.log(error)
        dispatch({ type: types.BUY_KOIN_FAILURE })
    });
}

export const createPurchaseTrigger = (username, coinAmount, limit, transactionType, token) => dispatch => {

    console.log('create purchase trigger ' + username + ' ' + coinAmount + ' ' + limit + ' ' + token + ' ' + transactionType);
    dispatch({
        type: types.CREATE_TRIGGER_BUY_KOIN
    });

    // let actionNumber = transactionType ===   ? 1 : 0;
    let actionNumber = 1;
    return fetchJSON("http://localhost:5000/purchase-trigger", {
        "username": username,
        "coinAmount": coinAmount,
        "limit": limit,
        "action": actionNumber
    }, "POST", token).then(response => {
        console.log(response);
        if (response.error) {
            console.log(response.error)
            dispatch({ type: types.CREATE_TRIGGER_BUY_KOIN_FAILURE })
        } else {
            dispatch({
                type: types.CREATE_TRIGGER_BUY_KOIN_SUCCESS,
            })
        }
    }).catch(error => {
        console.log(error)
        dispatch({ type: types.BUY_KOIN_FAILURE })
    });

}

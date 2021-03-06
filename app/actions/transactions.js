import * as types from './types';
import { fetchJSON } from './apiUtils';
import {ORCHESTRATION_HOST} from "./mapping";

export const buyKoin = (username, moneyAmount, token) => dispatch => {

    let parsedAmount = parseFloat(moneyAmount) 
    if (isNaN(parsedAmount)) { 
        dispatch({ type: types.SHOW_ERROR_MESSAGE, payload: {message: "Amount must be a number"} })
        return
    } else if (parsedAmount <= 0) { 
        dispatch({ type: types.SHOW_ERROR_MESSAGE, payload: {message: "Amount be a bigger than 0"} })
        return
    }

    dispatch({
        type: types.BUY_KOIN
    });

    return fetchJSON(ORCHESTRATION_HOST + "/purchase", {
        "username": username,
        "moneyAmount": moneyAmount
    }, "POST", token).then(response => {
        console.log(response);
        if (response.error) {
            console.log(response.error)
            let errorMgs
            let wasError 
            if (response.status === 507) {
                wasError = false
                errorMgs = 'No available sell orders. Added new buy order for ' + moneyAmount 
            } else if (response.status === 402) {
                wasError = true
                errorMgs = 'Not enough money in wallet'
            } else if (response.status === 412) { 
                wasError = false
                errorMgs = 'Not enough money in wallet, you have unfilled orders'
            }
            dispatch({ type: (wasError ? types.SHOW_ERROR_MESSAGE : types.SHOW_INFO_MESSAGE), payload: {message: errorMgs} })
        } else {
            dispatch({
                type: types.BUY_KOIN_SUCCESS,
            })
        }
    }).catch(error => {
        console.log(error)
        dispatch({ type: types.SHOW_ERROR_MESSAGE, payload: {message: 'Server error'} })
    });
}

export const sellKoin = (username, moneyAmount, token) => dispatch => {

    let parsedAmount = parseFloat(moneyAmount) 
    if (isNaN(parsedAmount)) { 
        dispatch({ type: types.SHOW_ERROR_MESSAGE, payload: {message: "Amount must be a number"} })
        return
    } else if (parsedAmount <= 0) { 
        dispatch({ type: types.SHOW_ERROR_MESSAGE, payload: {message: "Amount be a bigger than 0"} })
        return
    }

    dispatch({
        type: types.SELL_KOIN
    });

    return fetchJSON(ORCHESTRATION_HOST + "/sell", {
        "username": username,
        "moneyAmount": moneyAmount
    }, "POST", token).then(response => {
        console.log(response);
        if (response.error) {
            console.log(response.error)
            let errorMgs
            let wasError 
            if (response.status === 507) {
                wasError = false
                errorMgs = 'No available buy orders. Added new sell order for ' + moneyAmount 
            } else if (response.status === 402) {
                wasError = true
                errorMgs = 'Not enought Koins in wallet'
            } else if (response.status === 412) { 
                wasError = false
                errorMgs = 'Not enough money in wallet, you have unfilled orders'
            }
            dispatch({ type: (wasError ? types.SHOW_ERROR_MESSAGE : types.SHOW_INFO_MESSAGE), payload: {message: errorMgs} })
        } else {
            dispatch({
                type: types.SELL_KOIN_SUCCESS,
            })
        }
    }).catch(error => {
        console.log(error)
        dispatch({ type: types.SHOW_ERROR_MESSAGE, payload: {message: 'Server error'} })
    });
}


export const createPurchaseTrigger = (username, coinAmount, limit, transactionType, token) => dispatch => {

    let parsedAmount = parseFloat(coinAmount)
    let parsedLimit = parseFloat(limit) 
    if (isNaN(parsedAmount) || isNaN(parsedLimit)) { 
        dispatch({ type: types.SHOW_ERROR_MESSAGE, payload: {message: "Amount and limit must be a number"} })
        return
    } else if (parsedAmount <= 0 || limit <= 0) { 
        dispatch({ type: types.SHOW_ERROR_MESSAGE, payload: {message: "Amount and limit be a bigger than 0"} })
        return
    }

    console.log('create purchase trigger ' + username + ' ' + coinAmount + ' ' + limit + ' ' + token + ' ' + transactionType);
    dispatch({
        type: types.CREATE_TRIGGER_BUY_KOIN
    });

    let actionNumber = transactionType === "buy"  ? 1 : 0;

    return fetchJSON(ORCHESTRATION_HOST + "/purchase-trigger", {
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
            dispatch({ type: types.SHOW_INFO_MESSAGE, payload: {message: `Created ${transactionType} trigger for ${coinAmount} Koins when price will be ${limit} `} })

        }
    }).catch(error => {
        console.log(error)
        dispatch({ type: types.BUY_KOIN_FAILURE })
    });

}

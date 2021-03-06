import * as types from './types';
import { fetchJSON } from './apiUtils';
import {ORCHESTRATION_HOST} from "./mapping";

export const depositToWallet = (username, amountToDeposit, token) => dispatch => {

    let parsedAmount = parseFloat(amountToDeposit) 
    if (isNaN(parsedAmount)) { 
        dispatch({ type: types.SHOW_ERROR_MESSAGE, payload: {message: "Amount to deposit must be a number"} })
        return
    } else if (parsedAmount <= 0) { 
        dispatch({ type: types.SHOW_ERROR_MESSAGE, payload: {message: "Amount to deposit must be a bigger than 0"} })
        return
    }

    dispatch({
        type: types.DEPOSIT_TO_WALLET
    });

    return fetchJSON(ORCHESTRATION_HOST + "/depositToWallet", {
        "username": username,
        "moneyToDeposit": amountToDeposit
    },"POST", token).then(response => {
        console.log(response);
        if(response.error) {
            let errorMsg
            if (response.status === 400) { 
                errorMsg = 'Amount to deposit must be a number'
            }
            dispatch({ 
                type: types.SHOW_ERROR_MESSAGE,
                payload: { 
                    message: errorMsg
                }
            })
        } else {
            dispatch({
                type: types.DEPOSIT_TO_WALLET_SUCCESS,
                payload: {
                    amount: amountToDeposit
                }
            })
        }
    }).catch(error => {
        dispatch({ type: types.SHOW_ERROR_MESSAGE, payload: {message: 'Server error'} })
    });
}


export const withdrawnFromWallet = (username, amountToWithdrawn, token) => dispatch => {

    let parsedAmount = parseFloat(amountToWithdrawn) 
    if (isNaN(parsedAmount)) { 
        dispatch({ type: types.SHOW_ERROR_MESSAGE, payload: {message: "Amount to withdrawn must be a number"} })
        return
    } else if (parsedAmount <= 0) { 
        dispatch({ type: types.SHOW_ERROR_MESSAGE, payload: {message: "Amount to withdrawn must be a bigger than 0"} })
        return
    }

    dispatch({
        type: types.WITHDRAW_FROM_WALLET
    });

    return fetchJSON(ORCHESTRATION_HOST + "/withdrawnFromWallet", {
        "username": username,
        "moneyToWithdrawn": amountToWithdrawn
    },"POST", token).then(response => {
        if(response.error) {
            let errorMsg
            if (response.status === 400) { 
                errorMsg = 'Amount to withdrawn must be a number'
            } else if (response.status === 412) {
                errorMsg = 'Not enough money in wallet'
            }
            dispatch({ type: types.SHOW_ERROR_MESSAGE, payload: {message: errorMsg} })
        } else {
            dispatch({
                type: types.WITHDRAW_FROM_WALLET_SUCCESS,
                payload: {
                    amount: amountToWithdrawn
                }
            })
        }
    }).catch(error => {
        console.log(error)
        dispatch({ type: types.SHOW_ERROR_MESSAGE, payload: {message: 'Server error'} })
    });
}


export const updateWallet = (username,token) => dispatch => {

    return fetchJSON(ORCHESTRATION_HOST + "/walletContent", {
        "username": username
    },"POST", token).then(response => {
        console.log(response);
        if(response.error) {
            console.log(response.error)
        } else {
            dispatch({
                type: types.UPDATE_WALLET,
                payload: {
                    euro: response.amountEuro,
                    DK: response.amountBtc,
                }
            })
        }
    }).catch(error => {
        console.log(error)
    });
}
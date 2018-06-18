import * as types from './types';
import { fetchJSON } from './apiUtils';

export const depositToWallet = (username, amountToDeposit, token) => dispatch => {

    dispatch({
        type: types.DEPOSIT_TO_WALLET
    });

    return fetchJSON("http://localhost:5000/depositToWallet", {
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

    dispatch({
        type: types.WITHDRAW_FROM_WALLET
    });

    return fetchJSON("http://localhost:5000/depositToWallet", {
        "username": username,
        "moneyToWithdrawn": amountToWithdrawn
    },"POST", token).then(response => {
        if(response.error) {
            let errorMsg
            if (response.status === 400) { 
                errorMsg = 'Amount to deposit must be a number'
            } else if (response.status === 402) {
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

    return fetchJSON("http://localhost:5000/walletContent", {
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
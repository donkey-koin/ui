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
            console.log(response.error)
            dispatch({ type: types.DEPOSIT_TO_WALLET_FAILURE })
        } else {
            dispatch({
                type: types.DEPOSIT_TO_WALLET_SUCCESS,
                payload: {
                    amount: amountToDeposit
                }
            })
        }
    }).catch(error => {
        console.log(error)
        dispatch({ type: types.DEPOSIT_TO_WALLET_FAILURE })
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
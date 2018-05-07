import * as types from './types';
import { fetchJSON } from './apiUtils';

// TODO: change url based on node env variable and extract to separate file
export const login = (username, password) => dispatch => {
    
    dispatch({
        type: types.LOGIN
    });

    return fetchJSON("http://localhost:5000/login", {
        "username": username,
        "password": password
    },"POST").then(response => {
        console.log(response);
        if(response.error) { 
            dispatch({ type: types.LOGIN_FAILURE })
        } else {
            dispatch({
                type: types.LOGIN_SUCCESSFUL,
                payload: {
                    username: response.username,
                    token: response.token
                }
            })
        }
    }).catch(error => {
        console.log(error)
        dispatch({ type: types.LOGIN_FAILURE })
    });
}

export const depositToWallet = (username, amountToDeposit) => dispatch => {
    
    dispatch({
        type: types.DEPOSIT_TO_WALLET
    });

    return fetchJSON("http://localhost:5000/depositToWallet", {
        "username": username,
        "moneyToDeposit": amountToDeposit
    },"POST").then(response => {
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

export const buyKoin = (username, moneyAmount) => dispatch => {
    
    dispatch({
        type: types.BUY_KOIN
    });

    return fetchJSON("http://localhost:5000/purchase", {
        "username": username,
        "moneyAmount": moneyAmount
    },"POST").then(response => {
        console.log(response);
        if(response.error) { 
            console.log(response.error)
            dispatch({ type: types.BUY_KOIN_FAILURE })
        } else { 
            dispatch({
                type: types.BUY_KOIN_SUCCESS,
            })
        }
    }).catch(error => {
        console.log(error)
        dispatch({ type: types.BUY_KOIN_FAILURE})
    });
}

export const updateWallet = (username) => dispatch => {
    
    return fetchJSON("http://localhost:5000/walletContent", {
        "username": username
    },"POST").then(response => {
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
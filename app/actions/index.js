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
    });
}
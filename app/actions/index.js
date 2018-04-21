import * as types from './types';
import { fetchJSON } from './apiUtils';

// TODO: change url based on node env variable 
export const login = (loginData) => dispatch => {
    return fetchJSON("http://localhost:8080/login", {
        "username": loginData.username,
        "password": loginData.password
    },"POST").then(response => {
        dispatch({
            type: types.LOGIN,
            payload: {
                username: response.username
            }
        })
    }).catch(error => console.error(error));
}

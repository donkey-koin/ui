import * as types from './types';
import { fetchJSON } from './apiUtils';
import {ORCHESTRATION_HOST} from "./mapping";

export const login = (username, password) => dispatch => {

    dispatch({
        type: types.LOGIN
    });

    return fetchJSON(ORCHESTRATION_HOST + "/login", {
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

export const logout = () => dispatch => {
    dispatch({
        type: types.LOGOUT
    });
}
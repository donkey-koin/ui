import * as types from './types';
import { fetchJSON } from './apiUtils';
import {ORCHESTRATION_HOST} from "./mapping";

export const getPersonalData = (token) => dispatch => {

    dispatch({
        type: types.PERSONAL_DATA
    });

    return fetchJSON(ORCHESTRATION_HOST + "/userProfile", undefined, "GET", token).then(response => {
        console.log(response);
        if (response.error) {
            console.log(response.error)
        } else {
            console.log('jadra');
        }
    }).catch(error => {
        console.log(error)
    });
}

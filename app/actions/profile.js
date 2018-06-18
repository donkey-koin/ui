import * as types from './types';
import { fetchJSON } from './apiUtils';

export const getPersonalData = (token) => dispatch => {

    dispatch({
        type: types.PERSONAL_DATA
    });

    return fetchJSON("http://localhost:5000/userProfile", undefined, "GET", token).then(response => {
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

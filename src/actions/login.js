import { fetchJSON } from './apiUtils';
import { LOGIN } from '../types/actionTypes'


export const login = () => dispatch => {    

    return fetchJSON("https://reqres.in/api/users/2").then(response => {
        console.log(response)
        dispatch({
            type: LOGIN,
            payload: {
                status: "LOGGED"
            }
        })
    }).catch(error => console.log(error))

}


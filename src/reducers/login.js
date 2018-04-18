import { LOGIN } from '../types/actionTypes'

const initState = {
    status: "OK",
}

export default (state = initState, action) => {

    switch(action.type) {
        case LOGIN :
            return {
                ...state, 
                status: action.payload.status
            }
        default :
            return state
    }
}
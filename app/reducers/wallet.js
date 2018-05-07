import * as types from '../actions/types';

const initState = {
    balanceDK: 0,
    balanceEuro: 0
};

// TODO ERROR HANDLING, DEPOSIT IN PROGRESS
export default (state = initState, action) => {
    switch (action.type) {
        case types.DEPOSIT_TO_WALLET_SUCCESS:
            return {
                ...state,
                balanceEuro: action.payload.amount + state.balanceEuro
            };
        default:
            return state;
    }
};

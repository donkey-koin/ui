import * as types from '../actions/types';

const initState = {
    balanceDK: 0,
    balanceEuro: 0
};

// TODO ERROR HANDLING, DEPOSIT IN PROGRESS
export default (state = initState, action) => {
    let amountToUpdate
    let currentWallet
    switch (action.type) {
        case types.DEPOSIT_TO_WALLET_SUCCESS:
            amountToUpdate = parseFloat(action.payload.amount)
            currentWallet = parseFloat(state.balanceEuro)
            return {
                ...state,
                balanceEuro: amountToUpdate + currentWallet
            };
        case types.WITHDRAW_FROM_WALLET_SUCCESS:
            amountToUpdate = parseFloat(action.payload.amount)
            currentWallet = parseFloat(state.balanceEuro)
            return {
                ...state,
                balanceEuro: currentWallet - amountToUpdate
            };
        case types.UPDATE_WALLET:
            return {
                ...state,
                balanceEuro: action.payload.euro,
                balanceDK: action.payload.DK
            };
        default:
            return state;
    }
};

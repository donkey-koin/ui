import * as types from './types';

export function filterTable(filter) {
    return {
        type: types.LOGIN,
        filter
    };
}

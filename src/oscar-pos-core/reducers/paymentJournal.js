import initialState from './initialState';
import { PAYMENT_JOURNAL } from  '../actions/types'

export var paymentJournal = (state = initialState.paymentJournals, action) => {
    switch (action.type) {
        case PAYMENT_JOURNAL.GET_ALL_JOURNALS:
            return [...action.data]
        default:
            return state;
    }
}
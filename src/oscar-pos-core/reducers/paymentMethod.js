import initialState from './initialState';
import { PAYMENT } from '../actions/types'

export var paymentMethod = (state = initialState.paymentMethod, action) => {
    switch (action.type) {
        case PAYMENT.SET_PAYMENT_METHOD:
            return action.data

        default:
            return state;
    }
}
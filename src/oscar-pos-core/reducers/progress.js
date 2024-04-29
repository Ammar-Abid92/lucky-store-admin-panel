import initialState from "./initialState";
import { PROGRESS } from "../actions/types";

export const deletedProgressReducer = (state = initialState.deleted_progress, action) => {
    switch (action.type) {
        case PROGRESS.SET_DELETED_PROGRESS:
            return action.payload;
        default:
            return state
    }
}

export const deletedTotalReducer = (state = initialState.deleted_total, action) => {
    switch (action.type) {
        case PROGRESS.SET_TOTAL_DELETED:
            return action.payload;
        default:
            return state
    }
}

export const paymentProgressReducer = (state = initialState.payment_progress, action) => {
    switch (action.type) {
        case PROGRESS.SET_PAYMENT_PROGRESS:
            return action.payload;
        default:
            return state
    }
}

export const paymentTotalReducer = (state = initialState.payment_total, action) => {
    switch (action.type) {
        case PROGRESS.SET_TOTAL_PAYMENT:
            return action.payload;
        default:
            return state
    }
}

export const customerProgressReducer = (state = initialState.customer_progress, action) => {
    switch (action.type) {
        case PROGRESS.SET_CUSTOMER_PROGRESS:
            return action.payload;
        default:
            return state
    }
}

export const customerTotalReducer = (state = initialState.customer_total, action) => {
    switch (action.type) {
        case PROGRESS.SET_TOTAL_CUSTOMER:
            return action.payload;
        default:
            return state
    }
}

export const outstandingProgressReducer = (state = initialState.outstanding_progress, action) => {
    switch (action.type) {
        case PROGRESS.SET_OUTSTANDING_PROGRESS:
            return action.payload;
        default:
            return state
    }
}

export const outstandingTotalReducer = (state = initialState.outstanding_total, action) => {
    switch (action.type) {
        case PROGRESS.SET_TOTAL_OUTSTANDING:
            return action.payload;
        default:
            return state
    }
}

export const userProgressReducer = (state = initialState.user_progress, action) => {
    switch (action.type) {
        case PROGRESS.SET_USER_PROGRESS:
            return action.payload;
        default:
            return state
    }
}
import { PROGRESS } from './types'

export const setDeletedProgress = (percentage) => {
    return (dispatch, getState) => {

        var state = getState().deletedProgress
        percentage = percentage + state

        console.log("Deleted Progress ", percentage)

        dispatch({
            type: PROGRESS.SET_DELETED_PROGRESS,
            payload: percentage
        })
    }
}

export const setTotalDeleted = (total) => {
    return dispatch => {
        dispatch({
            type: PROGRESS.SET_TOTAL_DELETED,
            payload: total
        })
    }
}

export const resetDeletedProgress = () => {
    return dispatch => {
        dispatch({
            type: PROGRESS.SET_DELETED_PROGRESS,
            payload: 0
        })

        dispatch({
            type: PROGRESS.SET_TOTAL_DELETED,
            payload: 0
        })
    }
}

export const setPaymentProgress = (percentage) => {
    return (dispatch, getState) => {
        
        var state = getState().paymentProgress
        percentage = percentage + state

        console.log("Payment Progress ", percentage)

        dispatch({
            type: PROGRESS.SET_PAYMENT_PROGRESS,
            payload: percentage
        })

    }
}

export const setTotalPayment = (total) => {
    return dispatch => {
        dispatch({
            type: PROGRESS.SET_TOTAL_PAYMENT,
            payload: total
        })
    }
}

export const resetPaymentProgress = () => {
    return dispatch => {
        dispatch({
            type: PROGRESS.SET_PAYMENT_PROGRESS,
            payload: 0
        })

        dispatch({
            type: PROGRESS.SET_TOTAL_PAYMENT,
            payload: 0
        })
    }
}

export const setCustomerProgress = (percentage) => {
    return (dispatch, getState) => {
        
        var state = getState().customerProgress
        percentage = percentage + state

        console.log("Customer Progress ", percentage)

        dispatch({
            type: PROGRESS.SET_CUSTOMER_PROGRESS,
            payload: percentage
        })

    }
}

export const setTotalCustomer = (total) => {
    return dispatch => {
        dispatch({
            type: PROGRESS.SET_TOTAL_CUSTOMER,
            payload: total
        })
    }
}

export const resetCustomerProgress = () => {
    return dispatch => {
        dispatch({
            type: PROGRESS.SET_CUSTOMER_PROGRESS,
            payload: 0
        })

        dispatch({
            type: PROGRESS.SET_TOTAL_CUSTOMER,
            payload: 0
        })
    }
}

export const setOutstandingProgress = () => {
    return (dispatch, getState) => {

        var state = getState().outstandingProgress
        var percentage = state + 1

        console.log("Outstanding Progress ", percentage)

        dispatch({
            type: PROGRESS.SET_OUTSTANDING_PROGRESS,
            payload: percentage
        })
    }
}

// export const setTotalOutstanding = (total) => {
//     return dispatch => {
//         dispatch({
//             type: PROGRESS.SET_TOTAL_CUSTOMER,
//             payload: total
//         })
//     }
// }

export const resetOutstandingProgress = () => {
    return dispatch => {
        dispatch({
            type: PROGRESS.SET_OUTSTANDING_PROGRESS,
            payload: 0
        })

        dispatch({
            type: PROGRESS.SET_TOTAL_OUTSTANDING,
            payload: 0
        })
    }
}

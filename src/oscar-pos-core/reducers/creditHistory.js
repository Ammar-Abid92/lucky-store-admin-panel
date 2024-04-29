import initialState from './initialState';
import { CREDIT_HISTORY } from '../actions/types'

export var creditHistoryReducer = (state = initialState.creditHistory, action) => {
    switch (action.type) {
        case CREDIT_HISTORY.GET_CREDIT_HISTORY:
            return [...action.data]
        case CREDIT_HISTORY.CLEAR_CREDIT_HISTORY:
            return []
        case CREDIT_HISTORY.DELETE_TRANSACTION:
            let creditHistory = state;

            let creditIndex = creditHistory.map(item => {
                return item.customer_id
            }).indexOf(action.data.customer_id)

            let transaction = creditHistory[creditIndex].details

            let transactionIndex = transaction.map(item => {
                return item.id
            }).indexOf(action.data.id)

            transaction.splice(transactionIndex, 1)

            return [...creditHistory]
        case CREDIT_HISTORY.UPDATE_TRANSACTION:
            let updateHistory = state;

            let updateIndex = updateHistory.map(item => {
                return item.customer_id
            }).indexOf((action.data.customer_id))

            let updateTransaction = updateHistory[updateIndex].details

            let updateTransactionIndex = updateTransaction.map(item => {
                return item.id
            }).indexOf(action.data.id)

            updateTransaction[updateTransactionIndex] = {...updateTransaction[updateTransactionIndex], ...action.data}

            console.log(updateTransaction[updateTransactionIndex])

            return [...updateHistory]
        default:
            return state;
    }
}
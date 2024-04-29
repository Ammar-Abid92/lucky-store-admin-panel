import initialState from './initialState';
import { REASONS } from  '../actions/types'

export var reasonsReducer = (state = initialState.sessions, action) => {
    switch (action.type) {
        case REASONS.GET_REASONS:
            return [...action.data]
        default:
            return state;
    }
}



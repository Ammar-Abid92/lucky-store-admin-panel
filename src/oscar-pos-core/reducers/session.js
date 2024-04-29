import initialState from './initialState';
import {SESSION} from  '../actions/types'

export var sessionReducer= (state=initialState.sessions, action)=>{
    switch(action.type){
        case SESSION.GET_SESSIONS:
        return [...action.data]
        default:
            return state;
    }
}


export var sessionSummaryReducer= (state=initialState.sessionSummary, action)=>{
    switch(action.type){
        case SESSION.GET_SESSION_SUMMARY:
        return {...state, ...action.data}
        default:
            return state;
    }
}


export var posSessionIdReducer= (state=initialState.pos_session_id, action)=>{
    switch(action.type){
        case SESSION.SET_POS_SESSION_ID:
        return action.data
        case SESSION.RESET_POS_SESSION_ID:
        return null;
        default:
            return state;
    }
}

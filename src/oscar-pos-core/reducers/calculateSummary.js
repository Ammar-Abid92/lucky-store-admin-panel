import initialState from "./initialState";
import { SUMMARY } from "../actions/types";

export var summaryReducer = (state = initialState.summary, action) => {
    switch (action.type) {
        case SUMMARY.SET_SUMMARY:
            return { ...state, udhaar: action.data.udhaar, advance: action.data.advance, netBalance: action.data.netBalance }
        default:
            return state;
    }
}
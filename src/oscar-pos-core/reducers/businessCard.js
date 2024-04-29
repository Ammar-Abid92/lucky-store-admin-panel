import initialState from "./initialState";
import { BUSINESS_CARD } from "../actions/types";

export var businessCardReducer = (state = initialState.customers, action) => {
    switch (action.type) {
        case BUSINESS_CARD.ADD_BUSINESS_CARD:
            return [...state, action.data];
        case BUSINESS_CARD.GET_BUSINESS_CARD:
            return action.data;
        case BUSINESS_CARD.UPDATE_BUSINESS_CARD:
            return action.data;
        default:
            return state;
    }
}
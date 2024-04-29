import initialState from "./initialState";
import { PROMOTION } from "../actions/types";


export var promotionReducer = (state = initialState.promotion, action) => {
    switch (action.type) {
        case PROMOTION.GET_PROMOTIONS:
            return action.data ;
        default:
            return state;

    }

}
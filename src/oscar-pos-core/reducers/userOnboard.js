import initialState from "./initialState";
import { TOUR } from '../actions/types';

export var userOnboard = (state = initialState.userOnboard, action) => {
    switch (action.type) {

        case TOUR.ENABLE_TOUR:
            return true;
        case TOUR.DISABLE_TOUR:
            return false;
        default:
            return state;
    }
};

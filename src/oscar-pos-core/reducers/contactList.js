import initialState from "./initialState";
import { CONTACT } from "../actions/types";

export const contactListReducer = (state = initialState.contactList, action) => {
    switch (action.type) {
        case CONTACT.GET_CONTACT_LIST:
            // console.log('action from contactlistreducer: ', action)
            return action.payload;
        default:
            return state;
    }
};
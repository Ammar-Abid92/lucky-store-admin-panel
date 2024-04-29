import initialState from "./initialState";
import { ORDER } from "../actions/types";

export var currentOrderInfoReducer = (state = initialState.currentOrderInfo, action) => {
  switch (action.type) {
    case ORDER.SAVE_CURRENT_ORDER_INFO:
      return Object.assign({}, state, action.data);

    case ORDER.CLEAR_CURRENT_ORDER_INFO:
        return {};

    default:
      return state;
  }
};

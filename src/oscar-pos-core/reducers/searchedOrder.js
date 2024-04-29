import initialState from "./initialState";
import { ORDER } from "../actions/types";

export var searchedOrders = (state = initialState.searchedOrders, action) => {
  switch (action.type) {
    case ORDER.SEARCHED_ORDER:
      return [...action.data];
    default:
      return state;
  }
};

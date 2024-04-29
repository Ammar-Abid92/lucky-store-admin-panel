import initialState from "./initialState";
import { CUSTOMER } from "../actions/types";

export var searchedCustomers = (
  state = initialState.searchedCustomers,
  action
) => {
  let customers = [...state];
  switch (action.type) {
    case CUSTOMER.SEARCHED_CUSTOMER:
      return [...action.data];
    case CUSTOMER.DELETE_CUTOMER:
      for (let i = 0; i < customers.length; i++) {
        if (customers[i].id == action.data) {
          customers.splice(i, 1);
          break;
        }
      }
      return customers;
    case CUSTOMER.CLEAR_SEARCHED_CUSTOMER:
      return [];
    case CUSTOMER.UPDATE_CUSTOMER:
      let cusIndex = customers
        .map(item => {
          return item.id;
        })
        .indexOf(action.data.id);
      customers[cusIndex] = action.data;
      return [...customers];
    default:
      return state;
  }
};

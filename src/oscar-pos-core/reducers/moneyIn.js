import initialState from "./initialState";
import { MONEYIN } from  '../actions/types';

export var moneyInReducer = (state = initialState.moneyIn, action) => {
  switch (action.type) {
    case MONEYIN.PUT_MONEY_IN:
      return {...state, ...action.data};
    default:
      return state;
  }
};

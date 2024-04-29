import initialState from "./initialState";
import { MONEYOUT } from  '../actions/types';

export var moneyOutReducer = (state = initialState.moneyOut, action) => {
  switch (action.type) {
    case MONEYOUT.TAKE_MONEY_OUT:
      return {...state, ...action.data};
    default:
      return state;
  }
};

import { CART } from "../actions/types";
import initialState from "./initialState";

export const emptyCartFlag = (state = initialState.emptyCartFlag, action) => {
  let tempCart = state;
  let { emptyCartFlag } = state;
  switch (action.type) {
    case CART.SET_EMPTY_CART_FLAG:
      emptyCartFlag = true;
      return emptyCartFlag ;
    case CART.CLEAR_EMPTY_CART_FLAG:
      emptyCartFlag = false;
      return emptyCartFlag ;

    default:
      return state;
  }
};

import { DISCOUNT , CART} from "../actions/types";
import initialState from "./initialState";

export const globalDiscount = (state = initialState.globalDiscount, action) => {
  
    switch(action.type){
        case CART.ADD_DISCOUNT_PRODUCT:
            return action.data.price;
        case DISCOUNT.RESET_GLOBAL_DISCOUNT:
            return 0;
        default:
          return state;
    }
};

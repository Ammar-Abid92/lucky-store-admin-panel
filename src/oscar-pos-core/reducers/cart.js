import { CART } from "../actions/types";
import initialState from "./initialState";

export const cartReducer = (state = initialState.cart, action) => {
  let tempCart = state;

  switch (action.type) {
    case CART.ADD_PRODUCT_TO_CART:
      return {
        ...state,
        [action.id]: {
          qty: 1
        }
      }
    case CART.UPDATE_PRODUCT_COUNT:
     
      // return {
      // ...state,
      // [action.id]: {
      //   qty: action.item.qty
      // }
      tempCart[action.id].qty = action.item.qty;
      return { ...tempCart }
    // }
    case CART.POPULATE_CART:
      return {
        ...action.cart
      }
    case CART.REMOVE_PRODUCT_FROM_CART:
      delete tempCart[action.id];
      return { ...tempCart };

    case CART.INC_PRODUCT_COUNT:
      tempCart[action.id].qty++;
      return { ...tempCart }

    case CART.DEC_PRODUCT_COUNT:
      tempCart[action.id].qty--;
      return { ...tempCart }

    case CART.ADD_DISCOUNT:
      tempCart[action.product.id].discount = action.product.discount;
      tempCart[action.product.id].discount_type = action.product.discount_type;
      return { ...tempCart }

    case CART.ADD_DISCOUNT_PRODUCT:
      return {
        ...state,
        [action.data.id]: {
          qty: 1,
          price: action.data.price
        }
      }
    case CART.ADD_CUSTOM_PRODUCT:
      return {
        ...state,
        [action.data.uuid]: {
          qty: 1,
          id: action.data.id,
          price: action.data.price
        }
      }
    case CART.CLEAR_DISCOUNT:
      delete tempCart[action.id].discount_type;
      delete tempCart[action.id].discount;
      return { ...tempCart };
    case CART.EMPTY_CART:
      return {}

    default:
      return state;
  }
};

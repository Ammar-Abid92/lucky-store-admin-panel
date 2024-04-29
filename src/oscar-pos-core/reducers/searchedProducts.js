import initialState from "./initialState";
import { PRODUCT } from "../actions/types";

export var searchedProducts = (
  state = initialState.searchedProducts,
  action
) => {
  switch (action.type) {
    case PRODUCT.SEARCHED_PRODUCT:
      return [...action.data];
    case PRODUCT.UPDATE_PRODUCT:
      let products = state;
      let productIndex = products
        .map(item => {
          return item.id;
        })
        .indexOf(action.data.id);
      products[productIndex] = action.data;
      return [...products];

    case PRODUCT.REMOVE_PRODUCT:
      let tempProducts = [...state];
      let indexes = tempProducts.map(item => {
        return item.id;
      });
      let index = indexes.indexOf(action.id);
      if (index > -1) {
        tempProducts.splice(index, 1);
      }
      return tempProducts;
    case PRODUCT.CLEAR_SEARCHED_PRODUCTS:
      return [];
    default:
      return state;
  }
};

import initialState from './initialState';
import {PRODUCT} from '../actions/types';
import {updateProduct} from '../actions';

export var productReducer = (state = initialState.products, action) => {
  switch (action.type) {
    case PRODUCT.GET_PRODUCTS:
      return [...action.data];

    case PRODUCT.ADD_PRODUCT:
      return [...state, action.data];
    case PRODUCT.ADD_PRODUCTS:
      return state.concat(action.data)
    case PRODUCT.UPDATE_PRODUCT:
      let products = state;
      let productIndex = products
        .map((item) => {
          return item._id;
        })
        .indexOf(action.data._id);

      console.log('action.data : ', action.data);

      let updatedProduct = Object.assign({}, products[productIndex]);
      updatedProduct = action.data;

      products[productIndex] = updatedProduct;
      console.log('state update products', [...products]);

      return [...products];

    case PRODUCT.UPDATE_PRODUCT_STATUS:
      let state_products = state;
      let state_productIndex = state_products
        .map((item) => {
          return item._id;
        })
        .indexOf(action.data._id);
      let updatedStatusProduct = {
        ...action.data,
        isActive: !action.data.isActive,
      };
      console.log(
        'productIndex : ',
        state_productIndex,
        'action.data ',
        action.data,
      );
      console.log('updatedStatusProduct: ', updatedStatusProduct);

      state_products[state_productIndex] = updatedStatusProduct;
      console.log('state products', [...state_products]);
      return [...state_products];
    case PRODUCT.UPDATE_PRODUCT_ID:
      products = state;
      productIndex = products
        .map((item) => {
          return item.id;
        })
        .indexOf(action.data.id);
      console.log('productIndex : ', productIndex);
      // console.log('action.data : ', action.data)

      products[productIndex] = {
        ...products[productIndex],
        remoteId: action.data.newId,
      };
      return [...products];
    case PRODUCT.REMOVE_PRODUCT:
      let tempProducts = [...state];
      console.log('tempProducts: ', tempProducts, action);

      let newTempProducts = tempProducts.filter(
        (item) => item._id !== action.id,
      );

      console.log('tempProducts new: ', newTempProducts);

      return newTempProducts;

    case PRODUCT.UPDATE_DELETED_BY_CATEGORIES:
      return [...action.data];

    case PRODUCT.RESET_PRODUCTS:
      return [];

    default:
      return state;
  }
};
export var selectedProductReducer = (
  state = initialState.selectedProduct,
  action,
) => {
  switch (action.type) {
    case PRODUCT.GET_PRODUCT_FOR_EDIT:
      return action.data;

    default:
      return state;
  }
};

export let setProductForReveiceItem = (
  state = initialState.setProductForReveiveItem,
  action,
) => {
  switch (action.type) {
    case PRODUCT.SET_PRODUCT_FOR_RECEIVE_ITEM:
      return action.data;
    case PRODUCT.RESET_PRODUCT_FOR_RECEIVE_ITEM:
      return null;
    default:
      return state;
  }
};

export let setProductsBarcode = (
  state = initialState.setProductsBarcode,
  action,
) => {
  switch (action.type) {
    case PRODUCT.SET_PRODUCTS_BARCODE:
      return [...state, ...action.data];
    default:
      return state;
  }
};

export var topProductReducer = (state = initialState.topProducts, action) => {
  switch (action.type) {
    case PRODUCT.GET_TOP_PRODUCTS:
      return [...action.data];
    case PRODUCT.UPDATE_PRODUCT:
      let products = state;
      let productIndex = products
        .map((item) => {
          return item.id;
        })
        .indexOf(action.data.id);
      // console.log('productIndex : ', productIndex)
      // console.log('action.data : ', action.data)

      products[productIndex] = action.data;
      return [...products];
    case PRODUCT.REMOVE_PRODUCT:
      let tempProducts = [...state];
      // console.log("Action : ", action)
      // console.log('action.id : ', action.id)
      let indexes = tempProducts.map((item) => {
        return item.id;
      });
      let index = indexes.indexOf(action.id);
      if (index > -1) {
        tempProducts.splice(index, 1);
      }
      return tempProducts;
    default:
      return state;
  }
};

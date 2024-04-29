import { CART,DISCOUNT } from "./types";
export let resetGlobalDiscount = () => {
  return {
    type: DISCOUNT.RESET_GLOBAL_DISCOUNT
  };
};
export var emptyCart = () => {
  return (dispatch, getState) => {
    dispatch({
      type: CART.EMPTY_CART
    });
  };
};
export let setEmptyCartFlag = () => {
  return {
    type: CART.SET_EMPTY_CART_FLAG
  };
};
export let clearEmptyCartFlag = () => {
  return {
    type: CART.CLEAR_EMPTY_CART_FLAG
  };
};
export var addDiscountProduct = (id, price) => {
  return (dispatch, getState) => {
    dispatch({
      type: CART.ADD_DISCOUNT_PRODUCT,
      data: {
        id,
        price
      }
    });
  };
};

export var addDiscountOnItem = product => {
  return (dispatch, getState) => {
    dispatch({
      type: CART.ADD_DISCOUNT,
      product
    });
  };
};

export var addProduct = id => {
  return (dispatch, getState) => {
    // PlaySound('coin_drop_plastic_cup')
    // Vibration.vibrate(200);
    // Vibration.vibrate(30);
    // PlaySound('coin_drop_plastic_cups')
    let { cart } = getState();
    if (cart[id]) {
      dispatch({
        type: CART.INC_PRODUCT_COUNT,
        id
      });
    } else {
      dispatch({
        type: CART.ADD_PRODUCT_TO_CART,
        id
      });
    }
  };
};

export var updateProductQty = (id, item) => {
  return (dispatch, getState) => {
    dispatch({
      type: CART.UPDATE_PRODUCT_COUNT,

      id,
      item
    });
  };
};

export var addCustomProduct = data => {
  return (dispatch, getState) => {
    // PlaySound('beep07')
    // Vibration.vibrate(30);
    // PlaySound('coin_drop_plastic_cups')
    dispatch({
      type: CART.ADD_CUSTOM_PRODUCT,
      data
    });
  };
};

export var clearDiscount = id => {
  return (dispatch, getState) => {
    dispatch({
      type: CART.CLEAR_DISCOUNT,
      id
    });
  };
};

export var decQty = id => {
  return (dispatch, getState) => {
    dispatch({
      type: CART.DEC_PRODUCT_COUNT,
      id
    });
  };
};

// export var removeProductFromCart = (id, discount_item_id = "89834") => {
export var removeProductFromCart = (id, discount_item_id = "54574") => {
  return (dispatch, getState) => {
    let { cart } = getState(),
      cartItemKey = Object.keys(cart),
      discountItem = false;

    if (cartItemKey.length === 2 && id.toString() !== discount_item_id) {
      for (let i = 0; i <= cartItemKey.length; i++) {
        if (cartItemKey[i] == discount_item_id) {
          discountItem = true;
          break;
        }
      }
    }
    dispatch({
      type: CART.REMOVE_PRODUCT_FROM_CART,
      id
    });
    if (discountItem) {
      dispatch({
        type: CART.EMPTY_CART
      });
      // return;
    }
  };
};

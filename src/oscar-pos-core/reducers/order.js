import initialState from './initialState';
import {ORDER, ORDER_DETAIL} from '../actions/types';

export var orderReducer = (state = initialState.orders, action) => {
  switch (action.type) {
    case ORDER.SAVE_ORDER:
      return [...state, action.data];
    case ORDER.GET_ORDERS:
      return [...action.data];
    case ORDER.DELETE_ORDER:
      let orders = state;
      let tempIndex = orders
        .map((item) => {
          return item.id;
        })
        .indexOf(action.id);
      orders.splice(tempIndex, 1);
      return [...orders];
    case ORDER.UPDATE_STATUS:
      let state_order = state;
      console.log('Order state initial:', state_order, 'action', action.data);

      let state_orderIndex = state_order
        .map((item) => {
          return item._id;
        })
        .indexOf(action.data.id);

      let updateOrderStatus = Object.assign({}, state_order[state_orderIndex]);
      updateOrderStatus.status = action.data.status;

      console.log('updateOrderStatus: ', updateOrderStatus);

      state_order[state_orderIndex] = updateOrderStatus;
      console.log('Updated state orders', [...state_order]);
      return [...state_order];

    case ORDER.SET_DELIVERY_DATE:
      let _orders = state;
      console.log('Order state initial:', _orders, 'action', action.data);

      let orderIndex = _orders
        .map((item) => {
          return item._id;
        })
        .indexOf(action.data.id);

      let _updateOrder = Object.assign({}, _orders[orderIndex]);
      _updateOrder.status = action.data.status;
      // _updateOrder.order.deliveryDate = action.data.deliveryDate;
      _updateOrder.deliveryDate = action.data.deliveryDate;

      console.log('_updateOrder: ', _updateOrder);

      _orders[orderIndex] = _updateOrder;
      console.log('Updated state orders', [..._orders]);
      return [..._orders];
    default:
      return state;
  }
};

export var orderDetailReducer = (state = initialState.orderDetails, action) => {
  switch (action.type) {
    case ORDER_DETAIL.GET_ORDER:
      let newState = action.data;
      console.log('orderDetailReducer:', action.data, 'State:', state);
      console.log('DATA BY ID ON REDUCER', newState);
      return newState;

    default:
      return state;
  }
};

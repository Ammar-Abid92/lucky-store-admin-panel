import { getTotal, uuid } from '../constants';
import { ORDER, CART, ORDER_DETAIL } from './types';
import { updateProductStock } from './product';
import axios from 'axios';
import { store } from '../../store';
import Cookies from 'js-cookie'

export const getDukaanOrdersFromCloud = (BASE_URL, { page_number = 1, page_size = 10 }) => {

  return new Promise((resolve, reject) => {

    let url = `${BASE_URL}api/toko/v3/orders/?page_number=${page_number}&page_size=${page_size}`;


    axios
      .get(url, {
        headers: {
          'Authorization': 'JWT ' + Cookies.get('token'),
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        console.log(res.data.data, 'res.data.data')
        if (res.status === 200 || res.status === 201) {
          store.dispatch({
            type: ORDER.GET_ORDERS,
            data: JSON.parse(JSON.stringify(res.data.data.results)),
          });
          resolve(JSON.parse(JSON.stringify(res.data.data)));
        } else {
          reject(
            'getDukaanOrdersFromCloud something went wrong: status code',
            res.status,
          );
        }
      })
      .catch((err) => {
        console.log('getDukaanOrdersFromCloud error : ', err);
        if (err.response && err.response.status === 400) {
          console.log('getDukaanOrdersFromCloud adding prodyct failed');
          reject('getDukaanOrdersFromCloud adding prodyct failed');
        } else {
          console.log('getDukaanOrdersFromCloud err : ', err);
          reject(
            'getDukaanOrdersFromCloud something went wrong:',
            err.response,
          );
        }
      });
  });
};

export const getOrdersByIdFromCloud = (BASE_URL, params) => {
  return new Promise((resolve, reject) => {
    let url = `${BASE_URL}api/toko/v2/orders/${params.id}/`;
    let data = {
      phone_number: params.phone_number,
      activation_code: params.activation_code,
    };
    console.log('Url', url, params);

    axios
      .get(url, { params: data })
      .then((res) => {
        console.log(
          'getOrdersByIdFromCloud res : ',
          JSON.parse(JSON.stringify(res)),
        );
        // resolve(res)
        if (res.status === 200 || res.status === 201) {
          console.log(
            'Dispatch GET ORDER BY ID',
            JSON.parse(JSON.stringify(res.data.data)),
          );
          store.dispatch({
            type: ORDER_DETAIL.GET_ORDER,
            // data: JSON.parse(JSON.stringify(res.data.data)),
            data: res.data.data,
          });
          // resolve(JSON.parse(JSON.stringify(res.data.data)));
          resolve(res.data.data);
        } else {
          reject(
            'getOrdersByIdFromCloud something went wrong: status code',
            res.status,
          );
        }
      })
      .catch((err) => {
        console.log('getOrdersByIdFromCloud error : ', err);
        if (err.response && err.response.status === 400) {
          console.log('getOrdersByIdFromCloud failed');
          reject('getOrdersByIdFromCloud failed');
        } else {
          console.log('getOrdersByIdFromCloud err : ', err);
          reject('getOrdersByIdFromCloud something went wrong:', err.response);
        }
      });
  });
};

export const updateOrderStatusOnCloud = (
  BASE_URL,
  id,
  params,
  status
) => {
  return new Promise((resolve, reject) => {
    let url = `${BASE_URL}api/toko/v2/orders/${id}/`;
    console.log('Url', url);

    console.log('PARAMS!!!', params);

    console.log('Url', url, 'Params', params);
    console.log(Cookies.get('token'))

    axios
      .post(url, params, {
        headers: {
          'Authorization': 'JWT ' + Cookies.get('token'),
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        console.log('updateOrderStatusOnCloud res : ', res);
        // resolve(res)
        if (res.status === 200 || res.status === 201) {
          console.log('Dispatch UPDATED ORDER', res);
          store.dispatch({
            type: ORDER.UPDATE_STATUS,
            data: {
              id,
              status,
            },
          });
          resolve(res);
        } else {
          reject(
            'updateOrderStatusOnCloud something went wrong: status code',
            res.status,
          );
        }
      })
      .catch((err) => {
        console.log('updateOrderStatusOnCloud error : ', err);
        if (err.response && err.response.status === 400) {
          console.log('updateOrderStatusOnCloud adding prodyct failed');
          reject('updateOrderStatusOnCloud adding prodyct failed');
        } else {
          console.log('updateOrderStatusOnCloud err : ', err);
          reject(
            'updateOrderStatusOnCloud something went wrong:',
            err.response,
          );
        }
      });
  });
};

export const setOrderDeliveryDateOnCloud = (
  BASE_URL,
  id,
  order,
  status,
  customer,
  date,
) => {
  return new Promise((resolve, reject) => {
    let url = `${BASE_URL}/api/toko/v2/orders/${id}/`;
    console.log('Url', url);

    let params = {
      phone_number: customer.phone_number,
      _id: id,
      status,
      deliveryDate: date,
      operation: status,
      order: {
        ...order,
      },
      customer,
    };

    console.log('Url', url, 'Params', params);

    axios
      .post(url, params)
      .then((res) => {
        console.log('setOrderDeliveryDateOnCloud res : ', res);
        if (res.status === 200 || res.status === 201) {
          console.log('Dispatch UPDATED ORDER', res);
          store.dispatch({
            type: ORDER.SET_DELIVERY_DATE,
            data: {
              id,
              status,
              deliveryDate: date,
            },
          });
          resolve(res);
        } else {
          reject(
            'setOrderDeliveryDateOnCloud something went wrong: status code',
            res.status,
          );
        }
      })
      .catch((err) => {
        console.log('setOrderDeliveryDateOnCloud error : ', err);
        if (err.response && err.response.status === 400) {
          console.log('setOrderDeliveryDateOnCloud failed');
          reject('setOrderDeliveryDateOnCloud failed');
        } else {
          console.log('setOrderDeliveryDateOnCloud err : ', err);
          reject(
            'setOrderDeliveryDateOnCloud something went wrong:',
            err.response,
          );
        }
      });
  });
};

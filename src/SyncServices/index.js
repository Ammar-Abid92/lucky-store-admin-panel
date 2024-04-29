import axios from 'axios';
import { BASE_URL } from '../constants';
import Cookies from 'js-cookie';

export const getCatalogsFromCloud = () => {
  return new Promise((resolve, reject) => {
    const URL = `${BASE_URL}api/toko/categories/`;
    axios
      .get(URL, {
        headers: {
          Authorization: 'JWT ' + Cookies.get('token'),
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log('getCatalogsFromCloud res', res);
        resolve(res.data);
      })
      .catch((err) => {
        console.log('getCatalogsFromCloud err', err);
        reject(err.response);
      });
  });
};

export const getCatalogProductsFromCloud = (id) => {
  return new Promise((resolve, reject) => {
    const URL = `${BASE_URL}api/toko/products/${id}`;
    axios
      .get(URL, {
        headers: {
          Authorization: 'JWT ' + Cookies.get('token'),
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.log('getCatalogProductsFromCloud err', err);
        reject(err.response);
      });
  });
};

export const getCatalogProductsFromCloudBySearch = (params) => {
  return new Promise((resolve, reject) => {
    const URL = `${BASE_URL}api/toko/v2catalog/search/?product_name=${params.name}&category_id=${params.id}`;
    axios
      .get(URL, {
        headers: {
          Authorization: 'JWT ' + Cookies.get('token'),
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.log('getCatalogProductsFromCloud err', err);
        reject(err.response);
      });
  });
};

export const getCouriers = (params) => {
  console.log('COURIERS PARAMS', params);
  const URL = `${BASE_URL}/api/toko/book/shipment/`;
  return new Promise((resolve, reject) => {
    axios
      .get(URL, {
        headers: {
          Authorization: 'JWT ' + Cookies.get('token'),
          'Content-Type': 'application/json',
        },
        params,
        withCredentials: true,
      })
      .then((res) => {
        console.log('SEEEEE', res.data);
        resolve(res.data);
      })
      .catch((err) => {
        console.log('pagination err', err.response.data.message);
        reject(err);
      });
  });
};
export const sendCourier = (params) => {
  console.log('COURIERS PARAMS', params);
  const URL = `${BASE_URL}api/toko/book/shipment/`;
  return new Promise((resolve, reject) => {
    axios
      .post(
        URL,

        params,

        {
          headers: {
            Authorization: 'JWT ' + Cookies.get('token'),
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        console.log('SEEEEE', res.data);
        resolve(res.data);
      })
      .catch((err) => {
        console.log('pagination err', err.response.data);
        reject(err);
      });
  });
};

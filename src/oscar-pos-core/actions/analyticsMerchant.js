import {ANALYTICS_MERCHANT} from './types';
import {store} from '../../store';
import {BASE_URL} from '../../constants';
import axios from 'axios';
import Cookies from 'js-cookie';

export const getTokoAnalytics = (BASE_URL, params) => {
  return new Promise((resolve, reject) => {
    let url = `${BASE_URL}api/toko/v2/merchant/analytics/`;

    axios
      .post(url, params, {
        headers: {
          'Authorization': 'JWT ' + Cookies.get('token'),
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          let data = {
            orders: res.data.orders,
            revenue: res.data.revenue,
            views: res.data.views,
            start_date: params.start_date,
            end_date: params.end_date,
          };

          store.dispatch({
            type: ANALYTICS_MERCHANT.GET_ANALYTICS_COUNTER,
            data: data,
          });

          resolve(data);
        } else {
          reject(
            'getTokoAnalytics something went wrong: status code',
            res.status,
          );
        }
      })
      .catch((err) => {
        console.log('getTokoAnalytics error : ', err);
        if (err.response && err.response.status === 400) {
          console.log('getTokoAnalytics  failed');
          reject('getTokoAnalytics  failed');
        } else {
          console.log('getTokoAnalytics err : ', err);
          reject('getTokoAnalytics something went wrong:', err.response);
        }
      });
  });
};

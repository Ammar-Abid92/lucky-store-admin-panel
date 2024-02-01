import { useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios'
import { BASE_URL } from './constants';
import Cookies from 'js-cookie';
import { connect, } from 'react-redux';
import Routes from './routes';
import './App.css';
import { logout, updateUser } from './oscar-pos-core/actions';

function App({ user, dispatch }) {

  const checkValidUser = useCallback(() => {
    return new Promise((resolve, reject) => {
      let url = `${BASE_URL}api/toko/checkauth/`;
      // console.log('params for validateOtp:', );
      axios
        .get(url, {
          headers: {
            'Authorization': 'JWT ' + Cookies.get('token'),
            'Content-Type': 'application/json'
          }
        })
        .then((res) => {
          console.log(res)
          if (res.status === 200) {
            dispatch(updateUser(res.data.user_info))
            return resolve(res);

          }
          reject(res.statusText)

        })
        .catch((err) => {
          console.log('validate otp code err: ', err);
          logout()
          reject(err);
        });
    });
  }, [])



  useEffect(() => {
    checkValidUser()

  }, [checkValidUser])

  return (

    <Routes />

  );
}

export default connect(state => {
  return {
    user: state.user
  }
})(App);

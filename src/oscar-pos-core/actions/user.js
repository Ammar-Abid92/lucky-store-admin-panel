import { PRODUCT, USER } from './types';
import axios from 'axios';
import { store } from '../../store';
import Cookies from 'js-cookie';

axios.defaults.xsrfCookieName = 'sessionid';
// axios.defaults.xsrfHeaderName = 'x-sessionid';

export const logout = () => {
  return new Promise((resolve, reject) => {
    try {
      store.dispatch({
        type: USER.REMOVE_USERNAME,
      })
      store.dispatch({
        type: PRODUCT.RESET_PRODUCTS
      })
      Cookies.remove("token");
      resolve();
    } catch (e) {
      console.log('error', e);
      reject(e);
    }
  });
};

export const updateUserPinInOnbaord = (params, BASE_URL) => {
  return new Promise((resolve, reject) => {
    console.log('params : ', params);
    let url = `${BASE_URL}accounts/lite/changecode/`;
    let data = {
      phone_number: params.phone_number,
      code: '',
      otp: params.otp,
    };
    axios
      .post(url, data)
      .then((res) => {
        console.log('updateUserPinInOnbaord res : ', res);
        resolve(res);
      })
      .catch((err) => {
        console.log('updateUserPinInOnbaord error : ', err);
        reject();
      });
  });
};

export const validateUserFromOnboard = (params, BASE_URL) => {
  return new Promise((resolve, reject) => {
    console.log('params : ', params);
    let url = `${BASE_URL}accounts/dukaan/get/`;
    let data = {
      phone_number: params.phone_number,
      pin: params.pin,
    };
    axios
      .post(url, data)
      .then((res) => {
        console.log('validateUserFromOnboard res : ', res);
        // resolve(res)
        if (res.status === 200) {
          resolve(res);
        } else {
          reject('something went wrong');
        }
      })
      .catch((err) => {
        console.log('validateUserFromOnboard error : ', err);
        if (err.response && err.response.status === 401) {
          reject('Invalid code');
        } else {
          reject('Someting went wrong!');
        }
      });
  });
};

export const setUsername = (username) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: USER.SET_USERNAME,
        data: username,
      });
      resolve();
    });
  };
};

export const getUser = (userObj) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: USER.GET_USER,
        data: userObj,
      });
      resolve(userObj);
    });
  };
};

export const updateUser = (params) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      let data = {
        ...getState().user,
        ...params,
      }
      dispatch({
        type: USER.UPDATE_USER,
        data: data,
      });
      resolve(data);
    });
  };
};

export const activateUserInOnboard = (params, BASE_URL) => {
  return new Promise((resolve, reject) => {
    let url = `${BASE_URL}accounts/dukaan/activate/`;
    let data = {
      phone_number: params.phone_number,
      activation_code: params.activation_code,
      firebase_device_token: params.firebase_device_token,
      currency: params.currency,
      country: params.country,
    };
    axios
      .post(url, data)
      .then((res) => {
        console.log('activateUserInOnboard res : ', res);
        // AsyncStorage.setItem('activation_code', (params.activation_code).toString());
        // AsyncStorage.setItem('phone_number', params.phone_number);
        resolve(res);
      })
      .catch((err) => {
        console.log('activateUserInOnboard error : ', err);
        if (err.response && err.response.status === 401) {
          reject('Invalid code');
        } else {
          reject('Someting went wrong!');
        }
        // reject()
      });
  });
};

export const sendOTPtoUser = (params, BASE_URL) => {
  return new Promise((resolve, reject) => {
    let url = `${BASE_URL}accounts/lite/sendotp/`;
    let data = {
      phone_number: params.phone_number,
      otp: params.otp,
    };
    axios
      .post(url, data)
      .then((res) => {
        console.log('send otp to user res : ', res);
        resolve(res);
      })
      .catch((err) => {
        console.log('send otp to user error : ', err);
        reject(err);
      });
  });
};
// export const onLogin = (realm, params) => {
//   return new Promise((resolve, reject) => {
//     UserDB.signinUserInDb(realm, params)
//       .then((res) => {
//         resolve(res);
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });
// };

export const onBoardSignup = (params, BASE_URL) => {
  return new Promise((resolve, reject) => {
    // let url = `http://192.168.10.20:8000/accounts/dukaan/create/`;
    // let baseUrl = route || BASE_URL;
    let url = `${BASE_URL}accounts/dukaan/create/`;
    console.log('Url', url);

    let data = {
      username: params.phone_number,
      phone_number: params.phone_number,
      pin: params.pin,
      telco_network: params.telco_network,
    };
    console.log('Data', data);
    axios
      .post(url, data)
      .then((res) => {
        console.log('on board signup res : ', res);
        // resolve(res)
        if (res.status === 200 || res.status === 201) {
          resolve(res.data);
        } else {
          reject('something went wrong');
        }
      })
      .catch((err) => {
        console.log('onBoardSignup error : ', err);
        if (err.response && err.response.status === 400) {
          console.log('User already exist');
          console.log('ERROR!!!')
          reject('User already exist');
        } else {
          console.log('on board signup err : ', err);
          reject('something went wrong');
        }
      });
  });
};

export const onBoardCheckUser = (params, BASE_URL) => {
  return new Promise((resolve, reject) => {
    let url = `${BASE_URL}accounts/dukaan/check/`;
    console.log('params :', params);
    axios
      .post(url, params)
      .then((res) => {
        console.log('on board check user res: ', res);
        resolve(res);
      })
      .catch((err) => {
        console.log(' onBoardCheckUser error : ', err);
        reject(err);
      });
  });
};

export const login = (params, BASE_URL) => {
  return new Promise((resolve, reject) => {
    let url = `${BASE_URL}api/toko/weblogin/`;
    console.log('params for validateOtp:', params);
    axios
      .post(url, params)
      .then((res) => {
        Cookies.set('token', res.data.token)
        console.log('validate otp code res: ', res);
        resolve(res);
      })
      .catch((err) => {
        console.log('validate otp code err: ', err);
        reject(err);
      });
  });
};

export const resendCode = (params, BASE_URL, isResend) => {
  return new Promise((resolve, reject) => {
    let url = isResend ? `${BASE_URL}api/toko/resendotp/` : `${BASE_URL}api/toko/v2/sendmerchantotp/`;
    console.log('URL!!!!', url);
    console.log('params :', params);
    axios
      .post(url, params)
      .then((res) => {
        console.log('resend code res: ', res);
        resolve(res);
      })
      .catch((err) => {
        console.log('resend code err: ', err);
        reject(err);
      });
  });
};


export const getActivationCode = (params, BASE_URL) => {
  return new Promise((resolve, reject) => {
    // let url = `https://${BASE_URL}/accounts/dukaan/resend/`;
    let url = `${BASE_URL}udhaar/user/code`;
    console.log('params :', params);
    axios
      .post(url, params)
      .then((res) => {
        console.log('getActivationCode res: ', res);
        resolve(res);
      })
      .catch((err) => {
        console.log('getActivationCode err: ', err);
        reject(err);
      });
  });
};

export const sendEditTransactionSMS = (params, BASE_URL) => {
  return new Promise((resolve, reject) => {
    // let url = `${BASE_URL}/udhaar/v1/sms/edit/transaction`;
    let url = `${BASE_URL}udhaar/v2/sms/edit/transaction`;
    console.log('params :', params);
    axios
      .post(url, params)
      .then((res) => {
        console.log('sendEditTransactionSMS res: ', res);
        resolve(res);
      })
      .catch((err) => {
        console.log('sendEditTransactionSMS err: ', err);
        reject(err);
      });
  });
};

export const sendDeleteTransactionSMS = (params, BASE_URL) => {
  return new Promise((resolve, reject) => {
    let url = `${BASE_URL}udhaar/v1/sms/delete/transaction`;
    console.log('params :', params);
    axios
      .post(url, params)
      .then((res) => {
        console.log('sendDeleteTransactionSMS res: ', res);
        resolve(res);
      })
      .catch((err) => {
        console.log('sendDeleteTransactionSMS err: ', err);
        reject(err);
      });
  });
};

export const getSMSContent = (params, BASE_URL) => {
  return new Promise((resolve, reject) => {
    let url = `${BASE_URL}udhaar/v1/sms/generate/report`;
    console.log('params: ', params);
    axios
      .post(url, params)
      .then((res) => {
        console.log('getSMSContent api response then: ', res);
        resolve(res);
      })
      .catch((err) => {
        console.log('getSMSContent api response catch: ', err);
        reject(err);
      });
  });
};

// Dukaan Actions

export const getDukaanUserFromCloud = (params, BASE_URL) => {
  return new Promise((resolve, reject) => {
    console.log('params getDukaanUserFromCloud: ', params);
    let url = `${BASE_URL}accounts/dukaan/get/`;
    let data = {
      phone_number: params.phone_number,
      pin: params.pin || '',
    };
    axios
      .post(url, data)
      .then((res) => {
        console.log('getDukaanUserFromCloud res : ', res);
        // resolve(res)
        if (res.status === 200 || res.status === 201) {
          resolve(res.data);
        } else {
          reject('Someting went wrong!', res);
        }
      })
      .catch((err) => {
        console.log('getDukaanUserFromCloud error : User doesn"t exists ', err);
        if (err.response && err.response.status === 401) {
          reject('Someting went wrong!', err);
        } else {
          reject('Someting went wrong!', err);
        }
      });
  });
};

export const checkVanityAvailable = (params, BASE_URL) => {

  return new Promise((resolve, reject,) => {
    let url = `${BASE_URL}api/toko/checkvanityurl/`;
    axios
      .post(url, params, {
        headers: {
          'Authorization': 'JWT ' + Cookies.get('token'),
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        console.log('checkVanityAvailable res : ', res);
        // resolve(res)
        if (res.status === 200) {
          resolve(res);
        } else {
          reject('checkVanityAvailable something went wrong');
        }
      })
      .catch((err) => {
        console.log('checkVanityAvailable error : ', err);
        if (err.response && err.response.status === 400) {
          console.log('checkVanityAvailable updating user info failed');
          reject('checkVanityAvailable updating user info failed');
        } else {
          console.log('checkVanityAvailable err : ', err);
          reject('checkVanityAvailable something went wrong');
        }
      });
  })
}

export const updateDukaanUserToCloud = (params, BASE_URL) => {
  return new Promise((resolve, reject) => {
    let url = `${BASE_URL}api/toko/updatemerchant/`;

    console.log('Url', url, 'params for updateDukaanUserToCloud', params);

    axios
      .post(url, params, {
        headers: {
          'Authorization': 'JWT ' + Cookies.get('token'),
          'Content-Type': 'application/json'
        }
      }
      )
      .then((res) => {
        console.log('updateDukaanUserToCloud res : ', res);
        // resolve(res)
        if (res.status === 200) {
          resolve(res);
        } else {
          reject('updateDukaanUserToCloud something went wrong');
        }
      })
      .catch((err) => {
        console.log('updateDukaanUserToCloud error : ', err);
        if (err.response && err.response.status === 400) {
          console.log('updateDukaanUserToCloud updating user info failed');
          reject('updateDukaanUserToCloud updating user info failed');
        } else {
          console.log('updateDukaanUserToCloud err : ', err);
          reject('updateDukaanUserToCloud something went wrong');
        }
      });
  });
};

export const addBannerImage = (params, BASE_URL) => {
	return new Promise((resolve, reject) => {
		let url = `${BASE_URL}api/toko/uploadbanner/`;
    console.log("params----->",params)

		axios
			.post(url, params, {
				'headers': {
					'Authorization': 'JWT ' + Cookies.get('token'),
					'Content-Type': 'application/json'
				}
			})
			.then((res) => {
				console.log('addBannerImage res : ', res.data);
				// resolve(res)
				if (res.status === 200 || res.status === 201) {
					resolve(res.data);
				} else {
					reject(
						'addBannerImage went wrong: status code',
						res.status,
					);
				}
			})
			.catch((err) => {
				console.log('addBannerImage error : ', err);
				if (err.response && err.response.status === 400) {
					console.log('addBannerImage adding prodyct failed');
					reject('addBannerImage adding prodyct failed');
				} else {
					console.log('addBannerImage err : ', err);
					reject('addBannerImage went wrong:', err.response);
				}
			});
	});
};

export const modifiedDukaanUserToCloud = (
  params,
  BASE_URL,
  delivery = false,
  commission = false,
  image_update = false,
) => {
  return new Promise((resolve, reject) => {
    let url = `${BASE_URL}accounts/dukaan/update/`;
    let data;
    if (image_update) {
      data = {
        phone_number: params.phone_number,
        activation_code: params.activation_code,
        image: params.image,
      }
    } else if (commission) {
      data = {
        phone_number: params.phone_number,
        activation_code: params.activation_code,
        commission_mode: 'percent',
        commission_percent: params.commission_percent,
      }
    } else if (delivery) {
      data = {
        charge_per_order: params.charge_per_order,
        free_delivery_above: params.free_delivery_above,
        phone_number: params.phone_number,
      };
    } else {
      data = {
        activation_code: params.activation_code,
        id: params.id,
        phone_number: params.phone_number,
        address: params.address,
        landmark: params.landmark,
        name: params.name,
      };
    }
    console.log('Url', url, 'params for modifiedDukaanUserToCloud', data);

    axios
      .post(url, data)
      .then((res) => {
        console.log('modifiedDukaanUserToCloud res : ', res);
        // resolve(res)
        if (res.status === 200) {
          // Updating isSynced to true
          store.dispatch({
            type: USER.UPDATE_USER,
            data: params,
          });
          console.log('USER OBJEcT UPDATE:', params);

          resolve(res);
        } else {
          reject('modifiedDukaanUserToCloud something went wrong');
        }
      })
      .catch((err) => {
        console.log('modifiedDukaanUserToCloud error : ', err);
        if (err.response && err.response.status === 400) {
          console.log('modifiedDukaanUserToCloud updating user info failed');
          reject('modifiedDukaanUserToCloud updating user info failed');
        } else {
          console.log('modifiedDukaanUserToCloud err : ', err);
          reject('modifiedDukaanUserToCloud something went wrong');
        }
      });
  });
};
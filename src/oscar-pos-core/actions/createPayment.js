import { CUSTOMER, CREDIT_HISTORY } from "./types";
import PaymentDB from "../../db/payment";
import axios from "axios";
import Payments from "./DjangoActions/payment";
// import Reactotron from 'reactotron-react-native'

export const getPaymentsForSynching = (db, user_id) => {
  return new Promise((resolve, reject) => {
    PaymentDB.getPaymentsForSynching(db, user_id)
      .then(payments => {
        resolve(payments);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const getImagesForSynching = (db, user_id) => {
  return new Promise((resolve, reject) => {
    PaymentDB.getImagesForSynching(db, user_id)
      .then(payments => {
        resolve(payments);
      })
      .catch(error => {
        reject(error)
      })
  })
}

// export const deletePayment = (db, params) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let payment = await PaymentDB.deletePayment(db, params);
//       resolve(payment);
//     } catch (e) {
//       console.log("catch from deletePayment: ", e);
//       resolve(e);
//     }
//   });
// };

export const deletePayment = (db, params, details) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {

      PaymentDB.deletePayment(db, params).then(res => {

        dispatch({
          type: CREDIT_HISTORY.DELETE_TRANSACTION,
          data: details
        });

        resolve(res);
      }).catch(err => {
        console.log("catch from deletePayment: ", err);
        reject(err)
      });

    });
  };
};

// export const updatePayment = (db, params) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let payment = await PaymentDB.updatePayment(db, params);
//       resolve(payment);
//     } catch (e) {
//       console.log("catch from updatePayment: ", e);
//       resolve(e);
//     }
//   });
// };

export const updatePayment = (db, params, details) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {

      PaymentDB.updatePayment(db, params).then(res => {

        dispatch({
          type: CREDIT_HISTORY.UPDATE_TRANSACTION,
          data: details
        })

        resolve(res);
      }).catch(err => {
        console.log("catch from updatePayment: ", err);
        reject(err)
      });

    });
  };
};

export const testCreatePayment = (data) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {

      let creditHistory = getState().creditHistory
      let customer = creditHistory.find(obj => obj.customer_id === data.id)

      let data1 = {
        id: data.uid,
        customer_id: data.id,
        user_id: data.session_id,
        amount: data.amount,
        date: new Date(data.date),
        payment_mode: data.payment_mode,
        udhaar_note: data.udhaar_note,
        isSynced: false,
        image_url: data.imageURL
      };

      customer ? customer.details.push(data1) : creditHistory.push({
        customer_id: data.id,
        details: [data1]
      })

      dispatch({
        type: CREDIT_HISTORY.GET_CREDIT_HISTORY,
        data: JSON.parse(JSON.stringify(creditHistory))
      });

      resolve(creditHistory)
    }).catch(err => {
      console.log(err)
      reject(err)
    })
  }
}

export const createPayment = (db = null, params) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {

      console.log("before inserting data into database: ", params);
      PaymentDB.createPaymentInDb(db, params).then(res => {
        console.log("createPaymentInDb res : ", res);

        let creditHistory = getState().creditHistory
        let customer = creditHistory.find(obj => obj.customer_id === params.id)

        let data1 = {
          id: params.uid,
          customer_id: params.id,
          user_id: params.session_id,
          amount: params.amount,
          date: new Date(params.date),
          payment_mode: params.payment_mode,
          udhaar_note: params.udhaar_note,
          isSynced: false,
          image_url: params.imageURL
        };

        customer ? customer.details.push(data1) : creditHistory.push({
          customer_id: params.id,
          details: [data1]
        })

        dispatch({
          type: CREDIT_HISTORY.GET_CREDIT_HISTORY,
          data: JSON.parse(JSON.stringify(creditHistory))
        });

        resolve(res);
      }).catch(err => {
        console.log("create payment action catch: ", err);
      });

    });
  };
};

export const sendSMSToCustomer = (params, BASE_URL) => {
  return new Promise((resolve, reject) => {
    // let url = `https://${BASE_URL}/accounts/dukaan/smstocustomer/`;
    // let url = `${BASE_URL}/accounts/dukaan/sendsmsits/`;
    // let url = `${BASE_URL}/udhaar/v1/smstocustomer`;
    // let url = `${BASE_URL}/udhaar/v1/sms/customer/transaction`;
    let url = `${BASE_URL}/udhaar/v2/sms/customer/transaction`;

    console.log("params :", params);
    axios
      .post(url, params)
      .then(res => {
        console.log("sendSMSToCustomer: ", res);
        resolve(res);
      })
      .catch(err => {
        console.log("sendSMSToCustomer err: ", err);

        reject(err);
      });
  });
};

export const uploadReceipt = (params, BASE_URL) => {
  return new Promise((resolve, reject) => {
    // let url = `https://${BASE_URL}/accounts/dukaan/smstocustomer/`;
    // let url = `${BASE_URL}/accounts/dukaan/sendsmsits/`;
    // let url = `${BASE_URL}/udhaar/v1/smstocustomer`;
    // let url = `${BASE_URL}/udhaar/v1/sms/customer/transaction`;
    let url = `${BASE_URL}/udhaar/v1/upload/receipt`;

    console.log("params :", params);
    axios
      .post(url, params)
      .then(res => {
        console.log("uploadReceipt: ", res);
        resolve(res);
      })
      .catch(err => {
        console.log("uploadReceipt err: ", err);

        reject(err);
      });
  });
};


export const getPaymentsFromCloud = (db, user_id = "") => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      // GET PAYMENTS OF SPECIFIC USER FROM CLOUD AND LOAD INTO REALM DB
      Payments.getPayments(user_id).then(res => {
        // Load payments in realm
      });
    });
  };
};

export const createPaymentsToCloud = (db, user_id = "", payments) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      // GET PAYMENTS OF SPECIFIC USER FROM CLOUD AND LOAD INTO REALM DB
      Payments.createPayments(user_id).then(res => {
        // Load payments in realm
      });
    });
  };
};

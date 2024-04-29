import { CREDIT_HISTORY } from "./types";
import PaymentDB from "../../db/payment";

// import Reactotron from 'reactotron-react-native'

export const getBusinessCreditHistory = (realm, params) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      var t0 = Date.now();
      // Reactotron.log("Get Credit history at t0 : ", t0);
      console.log("params from action: ", params, realm);
      PaymentDB.getBusinessCreditHistoryFromDB(realm, params)
        .then(res => {
          var t1 = Date.now();
          // Reactotron.log("Get Credit history at t1 : ", t1);
          console.log(
            "Time consume (Get Business Credit history)= ",
            (t1 - t0) / 1000,
            " sec: "
            // res
          );
          // console.log("res getBusinessCreditHistoryFromDB: ", res);

          resolve(res);
        })
        .catch(err => {
          console.log("catch from getBusinessCreditHistory: ", err);
          reject(err);
        });
    });
  };
};

export const addCustomerCreditHistory = (realm, partner_id) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      PaymentDB.getCreditHistoryFromDB(realm, partner_id).then(res => {

        customerCreditHistory = [
          {
            customer_id: partner_id,
            details: res
          },
          // ...getState().creditHistory
        ]

        customerCreditHistory1 = [
          {
            customer_id: partner_id,
            details: res
          },
          ...getState().creditHistory
        ]

        var historyLength = 100

        if(customerCreditHistory1.length > historyLength) {
          customerCreditHistory1.splice(historyLength, customerCreditHistory1.length - historyLength)
        }

        dispatch({
          type: CREDIT_HISTORY.GET_CREDIT_HISTORY,
          data: JSON.parse(JSON.stringify(customerCreditHistory1))
        });

        resolve(customerCreditHistory1)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export const getCreditHistory = (realm, partner_id) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      var t0 = Date.now();
      // Reactotron.log("Get Credit history at t0 : ", t0);
      PaymentDB.getCreditHistoryFromDB(realm, partner_id)
        .then(res => {
          var t1 = Date.now();
          // Reactotron.log("Get Credit history at t1 : ", t1);
          console.log(
            "Time consume (Get Credit history)= ",
            (t1 - t0) / 1000,
            " sec: ",
            res
          );
          dispatch({
            type: CREDIT_HISTORY.GET_CREDIT_HISTORY,
            data: JSON.parse(JSON.stringify(res))
          });
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  };
};

export const getCreditHistoryOfSearchedCustomer = (realm, customer_id) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      PaymentDB.getCreditHistoryOfSearchedCustomer(realm, customer_id).then(
        res => {
          console.log("from getCreditHistoryOfSearchedCustomer action: ", res);
          resolve(res);
        }
      );
    });
  };
};

export const deleteFromCreditHistory = (details) => {
  return (dispatch, getState) => {

    console.log("Delete Details ", details)

    dispatch({
      type: CREDIT_HISTORY.DELETE_TRANSACTION,
      data: details
    })
  }
}

export const UpdateInCreditHistory = (details) => {
  return (dispatch, getState) => {

    console.log("Update Details ", details)

    dispatch({
      type: CREDIT_HISTORY.UPDATE_TRANSACTION,
      data: details
    })
  }
}

export const clearCreditHistory = () => {
  return (dispatch, getState) => {
    dispatch({
      type: CREDIT_HISTORY.CLEAR_CREDIT_HISTORY
      // data: res
    });
  };
};

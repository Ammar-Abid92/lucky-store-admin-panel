import { CUSTOMER } from "./types";
import CustomerDB from "../../db/customer";
import Customers from "./DjangoActions/customer";
// import Reactotron from 'reactotron-react-native'

export const getCustomersForSynching = (db, user_id) => {
  return new Promise((resolve, reject) => {
    CustomerDB.getCustomersForSynching(db, user_id)
      .then(customers => {
        resolve(customers);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const resetCustomerState = () => {
  return dispatch => {
    dispatch({
      type: CUSTOMER.RESET_CUSTOMER_STATE
    })
  }
}

export const setPopulateNewCustomerListState = () => {
  return dispatch => {
    dispatch({
      type: CUSTOMER.SET_FLAG_FOR_POPULATENEWCUSTOMERSCREEN_STATE
    });
  };
};

export const resetPopulateNewCustomerListState = () => {
  return dispatch => {
    dispatch({
      type: CUSTOMER.RESET_FLAG_FOR_POPULATENEWCUSTOMERSCREEN_STATE
    });
  };
};

export const setCustomerForViewProfileOrEdit = customer => {
  return (dispatch, getState) => {
    dispatch({
      type: CUSTOMER.SET_CUSTOMER_FOR_VIEWPROFILE_OR_EDIT,
      payload: customer
    });
  };
};

export const getCustomers = (db, session_id = "", withDues) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      var t0 = Date.now();
      // Reactotron.log("Get Customers at t0 : ", t0);
      CustomerDB.getCustomersFromDb(db, session_id, withDues)
        .then(res => {
          var t1 = Date.now();
          // Reactotron.log("Get Customers at t1 : ", t1);
          console.log(
            "Time consume (Get Customers)= ",
            (t1 - t0) / 1000,
            " sec"
          );
          dispatch({
            type: CUSTOMER.GET_CUSOTMERS,
            data: res
          });
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  };
};

export const getCustomersFromCloud = (db, user_id = "") => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      // GET CUSTOMERS OF SPECIFIC USER FROM CLOUD AND LOAD INTO REALM DB
      Customers.getCustomers(user_id).then(res => {
        // Load customers in realm
      });
    });
  };
};

export const createCustomersToCloud = (db, user_id = "", customers) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      // CREATE CUSTOMERS OF SPECIFIC USER TO CLOUD
      Customers.createCustomers(user_id, customers).then(res => { });
    });
  };
};
export const updateCustomersToCloud = (db, user_id = "", customers) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      // CREATE CUSTOMERS OF SPECIFIC USER TO CLOUD
      Customers.updateCustomers(user_id, customers).then(res => { });
    });
  };
};

export const customerSearchingQuery = (db = null, customerId, userid) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      CustomerDB.customerQuery(db, customerId, userid)
        .then(response => {
          console.log("response from customersearching action: ", response);
          dispatch({
            type: CUSTOMER.SEARCHED_CUSTOMER,
            data: response
          });
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  };
};

export const getCustomerByPhoneOrName = (
  db = null,
  searchingText,
  customerId
) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      CustomerDB.customerQuery(db, searchingText, customerId)
        .then(response => {
          console.log("response from customersearching action: ", response);
          dispatch({
            type: CUSTOMER.SEARCHED_CUSTOMER,
            data: response
          });
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  };
};

export const getSingleCustomer = (db = null, customer_id, session_id = "") => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      CustomerDB.getSingleCustomerFromDb(db, customer_id, session_id).then(
        res => {
          dispatch({
            type: CUSTOMER.UPDATE_CUSTOMER,
            data: { ...res, id: customer_id }
          });
          resolve(res);
        }
      );
    });
  };
};
export const createBulkCustomer = (db = null, contacts, user_id) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      console.log("contacts:", contacts, " user_id: ", user_id);
      var t0 = Date.now();
      // Reactotron.log("Create Customers at t0 : ", t0);
      CustomerDB.createBulkCustomers(db, contacts, user_id)
        .then(res => {
          var t1 = Date.now();
          // Reactotron.log("Create Customers at t1 : ", t1);
          console.log(
            "Time consume (Create Customers)= ",
            (t1 - t0) / 1000,
            " sec"
          );
          resolve(res);
        })
        .catch(error => {
          console.log("error while creating bulk customers in DB");
        });
    });
  };
};

export const createCustomer = (db = null, customerObj, session_id = "") => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      console.log("params:", customerObj, " session_id: ", session_id);
      var t0 = Date.now();
      // Reactotron.log("Create Customers at t0 : ", t0);
      CustomerDB.createCustomerInDb(db, customerObj, session_id).then(res => {
        if (!db) {
          setCustomerInLocalStorage(customerObj);
        }
        var t1 = Date.now();
        // Reactotron.log("Create Customers at t1 : ", t1);
        console.log(
          "Time consume (Create Customers)= ",
          (t1 - t0) / 1000,
          " sec"
        );
        dispatch({
          type: CUSTOMER.ADD_CUSTOMER,
          data: {
            ...customerObj,
            id: res.id
          }
        });
        resolve(res);
      });
    });
  };
};

export const updateCustomer = (db = null, params, session_id = "") => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      var t0 = Date.now();
      // Reactotron.log("Create Customers at t0 : ", t0);
      console.log("db: ", db, " params: ", params, " session_id: ", session_id);
      CustomerDB.updateCustomerInDb(db, params, session_id)
        .then(res => {
          if (db === null) {
            setUpdateCustomerInLocalStorage({
              ...params.customer_data,
              id: params.customer_id
            });
          }
          var t1 = Date.now();
          // Reactotron.log("Update Customers at t1 : ", t1);
          console.log(
            "Time consume (Update Customers)= ",
            (t1 - t0) / 1000,
            " sec"
          );
          dispatch({
            type: CUSTOMER.UPDATE_CUSTOMER,
            data: { ...params.customer_data, id: params.customer_id }
          });
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  };
};

export const deleteCustomer = (db = null, customer) => {
  console.log("customerId from action: ", customer);
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      CustomerDB.deleteCustomer(db, customer._id)
        .then(res => {
          setDeleteCustomerInLocalStorage(customer.remoteId);
          console.log("deleted Customer from action: ", res);
          dispatch({
            type: CUSTOMER.DELETE_CUTOMER,
            data: res
          });
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  };
};

export const deleteCustomerFromRedux = (customer) => {
  return (dispatch, getState) => {
    dispatch({
      type: CUSTOMER.DELETE_CUTOMER,
      data: customer
    })
  }
}

export const deleteCustomerFromRealm = (db = null, customer) => {
  console.log("customerId from action: ", customer);
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      CustomerDB.removeCustomerFromDb(db, customer)
        .then(res => {
          console.log("deleted Customer from action: ", res);
          dispatch({
            // type: CUSTOMER.DELETE_CUTOMER_FROM_REALM,
            type: CUSTOMER.DELETE_CUTOMER,
            data: res
          });
          resolve(res);
        })
        .catch(error => {
          console.log("error : ", error);
          reject(error);
        });
    });
  };
};

export const setCustomerForDetails = (customer, db = null) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: CUSTOMER.SET_CUSTOMER_FOR_DETAILS,
        payload: customer
      });
      resolve();
    });
  };
};

export const updateCustomerOutstandingPayment = (customer) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {

      // let customers = getState().customers
      // let customer = customers.find(obj => obj.id === customer_id)
      // console.log("Update Customer Outstanding ", customer.total_outstanding_payment)
      
      // try{
      //   customer.total_outstanding_payment = 1000
      //   console.log("Update Customer Outstanding 2 ", customer)
      // } catch(e) {
      //   alert(e)
      // }
      
      dispatch({
        type: CUSTOMER.UPDATE_CUSTOMER_OUTSTANDING_BALANCE,
        payload: customer
      })

    })
  }
}

export const addCustomerInOrder = (db = null, customer) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      console.log("add Customer in order: ", customer);
      dispatch({
        type: CUSTOMER.SET_CUSTOMER_FOR_ORDER,
        payload: customer
      });
      resolve();
    });
  };
};

export const removeCustomerFromOrder = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      console.log("remove Customer from order: ");
      dispatch({
        type: CUSTOMER.RESET_CUSTOMER_FOR_ORDER
      });
      resolve();
    });
  };
};

export const addCustomerForRestorePayment = (customer) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      console.log("Add Customer for Payment Restore: ", customer)
      
      dispatch({
        type: CUSTOMER.ADD_CUSTOMER_FOR_RESTORE_PAYMENT,
        payload: customer
      });

      resolve();
    })
  }
}

export const removeCustomerForRestorePayment = (customer) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      console.log("Remove Customer for Payment Restore: ", customer)

      dispatch({
        type: CUSTOMER.REMOVE_CUSTOMER_FOR_RESTORE_PAYMENT,
        payload: customer
      });

      resolve();
    })
  }
}

// export const updateCustomerIdForOdoo = (productBarcode, productId, product) => {
//   return (dispatch, getState) => {
//     return new Promise((resolve, reject) => {
//       console.log("updateProductsIdForOdoo : ", productBarcode, "  ---   ", productId, " -------   ", product);
//       CustomerDB.updateCustomerInDb(productBarcode, productId, product).then(res => {
//         //   console.log("res : ", res);
//         let productData = {
//           ...product,
//           id: productId
//         }
//         dispatch({
//           type: PRODUCT.UPDATE_PRODUCT_ID,
//           data: { newId: productId, id: product.id }
//         });
//         resolve();
//       });
//     });
//   };
// };

export const updateCustomerIdForOdoo = customerObj => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      console.log("updateProductsIdForOdoo : ", customerObj);
      CustomerDB.updateCustomerIdInDB(customerObj).then(res => {
        dispatch({
          type: CUSTOMER.UPDATE_CUSTOMER_ID,
          data: { newId: customerObj.id, id: customerObj._id }
        });
        resolve();
      });
    });
  };
};

const setCustomerInLocalStorage = customer => {
  let prevCustomer = [];
  let allCustomer = [];
  prevCustomer = JSON.parse(localStorage.getItem("customer", customer)) || [];
  console.log("Customer Obj : ", customer);
  console.log("prevCustomer : ", prevCustomer);
  for (let i = 0; i < prevCustomer.length; i++) {
    allCustomer.push(prevCustomer[i]);
  }
  allCustomer.push(customer);
  console.log("allCustomer : ", allCustomer);
  localStorage.setItem("customer", JSON.stringify(allCustomer));
};

const setDeleteCustomerInLocalStorage = customer => {
  let prevCustomer = [];
  let allCustomer = [];
  prevCustomer =
    JSON.parse(localStorage.getItem("deleteCustomers", customer)) || [];
  console.log("delete Customer Obj : ", customer);
  console.log("prevCustomer : ", prevCustomer);
  for (let i = 0; i < prevCustomer.length; i++) {
    allCustomer.push(prevCustomer[i]);
  }
  allCustomer.push(customer);
  console.log("allCustomer : ", allCustomer);
  localStorage.setItem("deleteCustomers", JSON.stringify(allCustomer));
};

const setUpdateCustomerInLocalStorage = customer => {
  let prevCustomer = [];
  let allCustomer = [];
  prevCustomer =
    JSON.parse(localStorage.getItem("updateCustomers", customer)) || [];
  console.log("update Customer Obj : ", customer);
  console.log("prevCustomer : ", prevCustomer);
  for (let i = 0; i < prevCustomer.length; i++) {
    allCustomer.push(prevCustomer[i]);
  }
  allCustomer.push(customer);
  console.log("allCustomer : ", allCustomer);
  localStorage.setItem("updateCustomers", JSON.stringify(allCustomer));
};
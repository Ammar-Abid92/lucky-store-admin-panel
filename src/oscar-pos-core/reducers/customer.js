import initialState from "./initialState";
import { CUSTOMER } from "../actions/types";

export var customerReducer = (state = initialState.customers, action) => {
  let customers = [...state];
  switch (action.type) {
    case CUSTOMER.GET_CUSOTMERS:
      console.log("GET_CUSOTMERS: ", [...action.data]);
      return [...action.data];
    case CUSTOMER.ADD_CUSTOMER:
      return [...state, action.data];
    case CUSTOMER.UPDATE_CUSTOMER_ID:
      let customerIndex;
      customerIndex = customers
        .map(item => {
          return item.id;
        })
        .indexOf(action.data.id);
      console.log("customerIndex : ", customerIndex);
      customers[customerIndex] = {
        ...customers[customerIndex],
        remoteId: action.data.newId
      };
      return [...customers];
    case CUSTOMER.UPDATE_CUSTOMER:
      let updateCustomers = state;
        let cusIndex = updateCustomers
        .map(item => {
          return item.id;
        })
        .indexOf(action.data.id);
      updateCustomers[cusIndex] = action.data;
      return [...updateCustomers];

    case CUSTOMER.UPDATE_CUSTOMER_OUTSTANDING_BALANCE:
      
      let customers = state;
      cusIndex = customers.map(item => {
        return item.id
      }).indexOf(action.payload.id)

      let customer = customers[cusIndex]

      customer = {
        ...customer, 
        total_outstanding_payment: action.payload.update ? action.payload.amount : action.payload.payment_mode == "Udhaar" ? customer.total_outstanding_payment + action.payload.amount : customer.total_outstanding_payment - action.payload.amount
      }

      let newCustomers = customers.filter(c => c.id != action.payload.id)

      return [...newCustomers, customer]

      // customers = state;
      // cusIndex = customers
      //   .map(item => {
      //     return item.id;
      //   })
      //   .indexOf(action.payload.id);
      // customers[cusIndex].total_outstanding_payment =
      //   action.payload.amount;
      // return [...customers];

      // customers = state
      // let customer = customers.find(obj => obj.id === action.payload.id)
      // customer.total_outstanding_payment = action.payload.payment_mode == "Udhaar" ? customer.total_outstanding_payment + action.payload.amount : customer.total_outstanding_payment - action.payload.amount 
      // console.log("OUTSTANDING --- ", customers)
      // console.log("OUTSTANDING --- 2 ", customer)
      // return [...customers]

    case CUSTOMER.DELETE_CUTOMER:
      let allCustomers = [...state]
      // for (let i = 0; i < allCustomers.length; i++) {
      //   if (allCustomers[i].id == action.data) {
      //     allCustomers.splice(i, 1);
      //     break;
      //   }
      // }

      let delIndex = allCustomers.map(item => {
        return item.id
      }).indexOf(action.data)

      allCustomers.splice(delIndex, 1)

      return [...allCustomers]

      // return [...allCustomers];
    
    case CUSTOMER.RESET_CUSTOMER_STATE:
      return [];

    // case CUSTOMER.DELETE_CUTOMER_FROM_REALM:
    //   for (let i = 0; i < customers.length; i++) {
    //     if (customers[i].id == action.data) {
    //       customers.splice(i, 1);
    //       break;
    //     }
    //   }
    //   return [...customers];
    default:
      return state;
  }
};

export var setCustomerForOrder = (
  state = initialState.setCustomerForOrder,
  action
) => {
  switch (action.type) {
    case CUSTOMER.SET_CUSTOMER_FOR_ORDER:
      return action.payload;
    case CUSTOMER.RESET_CUSTOMER_FOR_ORDER:
      return null;
    default:
      return state;
  }
};

export var setCustomerForDetails = (
  state = initialState.setCustomerForDetails,
  action
) => {
  switch (action.type) {
    case CUSTOMER.SET_CUSTOMER_FOR_DETAILS:
      return action.payload;
    case CUSTOMER.RESET_CUSTOMER_FOR_DETAILS:
      return null;
    default:
      return state;
  }
};

export var setCustomerForUdhaar = (
  state = initialState.setCustomerForUdhaar,
  action
) => {
  switch (action.type) {
    case CUSTOMER.SET_CUSTOMER_FOR_UDHAAR:
      return action.payload;
    case CUSTOMER.RESET_CUSTOMER_FOR_UDHAAR:
      return null;
    default:
      return state;
  }
};

export var setCustomerForViewProfileOrEdit = (
  state = initialState.setCustomerForViewProfileOrEdit,
  action
) => {
  switch (action.type) {
    case CUSTOMER.SET_CUSTOMER_FOR_VIEWPROFILE_OR_EDIT:
      console.log('SET_CUSTOMER_FOR_VIEWPROFILE_OR_EDIT: ', action.payload)
      return action.payload;
    case CUSTOMER.RESET_CUSTOMER_FOR_VIEWPROFILE_OR_EDIT:
      return null;
    default:
      return state;
  }
};

export let setPopulateNewCustomerListState = (
  state = initialState.populateNewCustomerListState,
  action
) => {
  switch (action.type) {
    case CUSTOMER.SET_FLAG_FOR_POPULATENEWCUSTOMERSCREEN_STATE:
      return true;
    case CUSTOMER.RESET_FLAG_FOR_POPULATENEWCUSTOMERSCREEN_STATE:
      return false;
    default:
      return state;
  }
};

export var setCustomerForRestoringPaymentReducer = (state = initialState.customers_to_restore, action) => {
  switch (action.type) {
    case CUSTOMER.ADD_CUSTOMER_FOR_RESTORE_PAYMENT:
      return [...state, action.payload];
    case CUSTOMER.REMOVE_CUSTOMER_FOR_RESTORE_PAYMENT:
      let customers = state
      const delIndex = customers.indexOf(action.payload);
      
      if(delIndex > -1) {
        customers.splice(delIndex, 1)
      }
      return customers
    default:
      return state;
  }
}
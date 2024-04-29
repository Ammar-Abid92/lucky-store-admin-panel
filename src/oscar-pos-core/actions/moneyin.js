
import { MONEYIN } from "./types";
import MoneyInDB from "../../db/moneyin";


export var putMoneyIn = (data) => {
  return (dispatch, getState) => {
    dispatch({
      type: MONEYIN.PUT_MONEY_IN,
      data
    })
  }
};

export const submitMoneyIn = (db = null, params) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      console.log('SUBMIT MONEY IN:   ', params)
      MoneyInDB.submitMoneyINInDb(db, params).then(res => {
        resolve(res)
      })
    })
  }
}



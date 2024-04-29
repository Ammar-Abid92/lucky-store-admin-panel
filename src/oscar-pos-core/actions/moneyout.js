
import { MONEYOUT } from "./types";
import MoneyOutDB from "../../db/moneyout";

export var takeMoneyOut = (data) => {
  return (dispatch, getState) => {
    dispatch({
      type: MONEYOUT.TAKE_MONEY_OUT,
      data
    })
  }
}


export const submitMoneyOut = (db = null, params) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      // console.log('SUBMIT MONEY OUT:   ', params)
      MoneyOutDB.submitMoneyOUTInDb(db, params).then(res => {
        resolve(res)
      })
    })
  }
}


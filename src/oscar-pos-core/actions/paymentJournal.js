import { PAYMENT_JOURNAL } from "./types";
import JournalDB from "../../db/journals";



export const createJournals = db => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      JournalDB.createJournalsInDb(db).then(res => {
        resolve(res)
      })
        .catch(err =>
          reject(err))
    })
  }
}


export const getJournals = db => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      JournalDB.getJournalsFromDb(db).then(res => {
        dispatch({
          type: PAYMENT_JOURNAL.GET_ALL_JOURNALS,
          data: res
        });
        resolve(res)
      })
        .catch(err =>
          reject(err))
    })
  }
}

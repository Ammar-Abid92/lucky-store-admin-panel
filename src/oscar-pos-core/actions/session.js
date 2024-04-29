import { SESSION } from "./types";
import SessionDB from "../../db/session";
export const close_pos_session = (db = null, pos_session_id, session_id) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      SessionDB.closePosSessionInDb(db, pos_session_id, session_id).then(
        res => {
          resolve(res);
        }
      );
    });
  };
};

export const set_opening_balance = (db = null, amount, pos_session_id) => {
  console.log("openSessionResponse2: ", pos_session_id);
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      SessionDB.setOpeningBalanceInDb(db, amount, pos_session_id)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  };
};

export const set_closing_balance = (db = null, amount, pos_session_id) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      SessionDB.setClosingBalanceInDb(db, amount, pos_session_id)
        .then(res => {
          dispatch({
            type: SESSION.GET_SESSION_SUMMARY,
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

export const openPosSession = (db = null, user_id) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      // console.log("OPEN POS SESSION")
      SessionDB.openSessionInDb(db, user_id)
        .then(res => {
          dispatch({
            type: SESSION.SET_POS_SESSION_ID,
            data: res
          });
          resolve(res);
        })
        .catch(err => reject(err));
    });
  };
};

export const checkPosSession = (db = null, user_id) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      // console.log("CHECK SESSION")
      SessionDB.checkPosSessionInDb(db, user_id)
        .then(session => {
          resolve(session);
        })
        .catch(err => {
          reject(err);
        });
    });
  };
};

export const getAllSessions = (db = null, user_id) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      SessionDB.getAllSessionsFromDb(db, user_id).then(res => {
        dispatch({
          type: SESSION.GET_SESSIONS,
          data: res
        });
        resolve(res);
      });
    });
  };
};

export const getSessionSummary = (db = null, selectedSession) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      SessionDB.getSessionSummaryFromDb(db, selectedSession)
        .then(res => {
          dispatch({
            type: SESSION.GET_SESSION_SUMMARY,
            data: res[0]
          });
          resolve(res[0]);
        })
        .catch(err => {
          reject(err);
        });
    });
  };
};

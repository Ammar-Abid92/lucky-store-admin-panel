import { BUSINESS_CARD } from "./types";
import BusinessCardDB from "../../db/businessCard";
// import { BUSINESS_CARD_SCHEMA } from "../Schema";

export const createBusinessCard = (db = null, businessCardObj, session_id = "") => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            var t0 = Date.now();

            BusinessCardDB.createBusinessCardInDB(db, businessCardObj, session_id).then(res => {
                // if (!db) {
                //     setCustomerInLocalStorage(customerObj);
                // }

                var t1 = Date.now();
                console.log(
                    "Time consume (Create Customers)= ",
                    (t1 - t0) / 1000,
                    " sec"
                );

                dispatch({
                    type: BUSINESS_CARD.ADD_BUSINESS_CARD,
                    data: {
                        ...businessCardObj,
                        id: res.id
                    }
                });
                resolve(res);
            })
        })
    }
}

export const getBusinessCard = (db, businessCardObj) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            BusinessCardDB.getBusinessCardFromDB(db, businessCardObj).then(res => {
                dispatch({
                    type: BUSINESS_CARD.GET_BUSINESS_CARD,
                    data: res
                });
                resolve(res);
            }).catch(err => reject(err))
        })
    }
}

export const updateBusinessCard = (db = null, businessCardObj, business_card_id = "") => {
    return(dispatch, getState) => {
        return new Promise((resolve, reject) =>{
            console.log("db: ", db, " params: ", businessCardObj, " session_id: ", business_card_id);

            BusinessCardDB.updateBusinessCardInDB(db, businessCardObj, business_card_id).then(res => {
                dispatch({
                    type: BUSINESS_CARD.UPDATE_BUSINESS_CARD,
                    data: { ...businessCardObj, id: business_card_id }
                });
                resolve(res);
            }).catch(err => reject(err))
        })
    }
}
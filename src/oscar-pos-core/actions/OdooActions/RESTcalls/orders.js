import axios from "axios";
import { REST_BASE_URL } from "../../../constants";
import Tokens from "./token";

export default class Order {
    static submitOrdersBatch(orders) {

    }
    static submitOrder = data => {
        // return (dispatch, getState) => {
            return new Promise((resolve, reject) => {
                let token = Tokens.getToken();
                axios
                    .post(`${REST_BASE_URL}api/pos/manage_orders_batch/`, data,
                        {
                            headers: { Authorization: token }
                        }
                    )
                    .then(response => {
                        console.log("Submit Order Response : ", response)
                        if (response.status === 201) {
                            resolve(response);
                        } else {
                            reject(response);
                        }
                    })
                    .catch(function (error) {
                        console.log("Submit Order Err : ", error)
                        reject(error);
                    });

            });
        // };
    };
}
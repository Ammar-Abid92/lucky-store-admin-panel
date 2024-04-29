import axios from "axios";
import { REST_BASE_URL } from "../../../constants";
import Tokens from "./token";

export default class Payments {
    static submitPayment = data => {
        // return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            let token = Tokens.getToken();
            axios
                .post(`${REST_BASE_URL}api/pos/payments/`, data,
                    {
                        headers: { Authorization: token }
                    }
                )
                .then(response => {
                    console.log("Submit Payment Response : ", response)
                    if (response.status === 201) {
                        resolve(response);
                    } else {
                        reject(response);
                    }
                })
                .catch(function (error) {
                    console.log("Submit Payment Err : ", error)
                    reject(error);
                });

        });
        // };
    };

}
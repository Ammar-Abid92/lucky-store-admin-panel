import axios from "axios";
import { REST_BASE_URL } from "../../../constants";
import Token from "./token"

export default class Auth {
    static authOnLogin = (params) => {
        return new Promise((resolve, reject) => {
            Token.deleteToken()
            console.log("Login Params : ", params)
            axios.post(`${REST_BASE_URL}api/login/`, {
                email: params.email,
                password: params.password,
                url: params.domain,
                db: params.db
            })
                .then(
                    response => {
                        console.log("AuthOnLogin Res : ", response)
                        Token.saveToken(response.data.token)
                        resolve(response);

                    }
                ).catch(err => {
                    console.log("AuthOnLogin Err : ", err)
                    reject(err);
                })
        })
    };
};

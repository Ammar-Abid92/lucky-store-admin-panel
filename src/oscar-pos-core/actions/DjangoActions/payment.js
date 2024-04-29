import axios from "axios";

export default class Payments {
    static getPayments(user_id) {
        return new Promise((resolve, reject) => {
            // MAKE AN API CALL (GET) FOR GETTING PAYMENTS OF SPECIFIC CUSTOMER FROM CLOUD DB AND SET INTO LOCAL DB
        })
    }

    
    static createPayments(user_id, payments) {
        return new Promise((resolve, reject) => {
            // MAKE AN API CALL (POST) FOR CREATING PAYMENTS OF SPECIFIC CUSTOMER TO CLOUD DB
        })
    }

    static deletePayments(user_id, payments) {
        return new Promise((resolve, reject) => {
            // MAKE AN API CALL (DELETE) FOR DELETING PAYMENTS OF SPECIFIC CUSTOMER TO CLOUD DB
        })
    }

}
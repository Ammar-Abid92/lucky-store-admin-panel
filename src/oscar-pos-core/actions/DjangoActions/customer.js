

export default class Customers {
    static getCustomers(user_id) {
        return new Promise((resolve, reject) => {
            // MAKE AN API CALL (GET) FOR GETTING CUSTOMERS OF SPECIFIC USER FROM CLOUD DB AND SET INTO LOCAL DB
        })
    }

    static updateCustomers(user_id, customers) {
        return new Promise((resolve, reject) => {
            // MAKE AN API CALL (PUT) FOR UPDATING CUSTOMERS OF SPECIFIC USER TO CLOUD DB
        })
    }

   

    static createCustomers(user_id, customers) {
        return new Promise((resolve, reject) => {
            // MAKE AN API CALL (POST) FOR CREATING CUSTOMERS OF SPECIFIC USER TO CLOUD DB
        })
    }

     static deleteCustomers(user_id, customers) {
        return new Promise((resolve, reject) => {
            // MAKE AN API CALL (DELETE) FOR DELETING CUSTOMERS OF SPECIFIC USER TO CLOUD DB
        })
    }

}
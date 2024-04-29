/* eslint-disable no-unused-vars */
import { REST_BASE_URL } from "../../../constants";
import axios from "axios";
import Tokens from "./token";
import Sets from "../../../Sets";
import CustomerDB from "../../../../db/customer";
import { customerFromLocalToOdoo } from "../../../DataMiddleware";
import { store } from "../../../../store";
import { CUSTOMER } from "../../../actions/types";

export default class Customers {
  static createCustomer(customers) {
    return new Promise((resolve, reject) => {
      let token = Tokens.getToken();
      console.log("token: ", token);
      axios
        .post(`${REST_BASE_URL}api/pos/customers_batch/`, {
          headers: { Authorization: token },
          data: { customers }
        })
        .then(response => {
          console.log("customer created on odoo: ", response);
          resolve(response);
        })
        .catch(error => {
          console.error("error while creating product on odoo: ", error);
          reject(error);
        });
    });
  }

  static deleteCustomer(customers) {
    return new Promise((resolve, reject) => {
      let token = Tokens.getToken();
      console.log("token: ", token);
      axios
        .delete(`${REST_BASE_URL}api/pos/customers_batch/`, {
          headers: { Authorization: token },
          data: { customers }
        })
        .then(response => {
          console.log("deleted customers on odoo: ", response);
          resolve(response.data);
        })
        .catch(error => {
          console.error("error while delete customers on odoo: ", error);
          reject(error);
        });
    });
  }

  static getCustomers() {
    return new Promise((resolve, reject) => {
      let token = Tokens.getToken();
      axios
        .get(`${REST_BASE_URL}api/pos/customers/`, {
          headers: { Authorization: token }
        })
        .then(response => {
          if (response.status === 200) {
            resolve(response);
          } else {
            console.error("error while getting customers: ", response);
            reject(response);
          }
        })
        .catch(function (error) {
          reject(error);
          console.error("error catch getting customers: ", error);
        });
    });
  }

  static updateCustomer(customers) {
    return new Promise((resolve, reject) => {
      let token = Tokens.getToken();
      console.log("token: ", token);
      axios
        .put(`${REST_BASE_URL}api/pos/customers_batch/`, {
          headers: { Authorization: token },
          data: { customers }
        })
        .then(response => {
          console.log("update customers on odoo: ", response);
          resolve(response.data);
        })
        .catch(error => {
          console.error("error while update customers on odoo: ", error);
          reject(error);
        });
    });
  }
}

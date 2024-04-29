import { REST_BASE_URL } from "../../../constants";
import axios from "axios";
import Tokens from "./token";
import Sets from "../../../Sets";
import ProductDB from "../../../../db/product";
import { getProductFromLocalToOdoo } from "../../../DataMiddleware";
import { store } from "../../../../store";
import { PRODUCT } from "../../../actions/types";
import { uuid } from "../../../constants";

const odooFormatedProduct = [];
export default class Products {
  static createProduct(productData) {
    console.log("Products Obj  : ", productData)
    return new Promise((resolve, reject) => {
      let token = Tokens.getToken();
      console.log('token: ', token)
      axios
        .post(`${REST_BASE_URL}api/pos/products_batch/`, {
          headers: { Authorization: token },
          data: productData
        })
        .then(response => {
          console.log("product created on odoo: ", response);
          resolve(response.data)
        })
        .catch(error => {
          console.error("error while creating product on odoo: ", error);
          reject(error)
        });
    });
  }

  static getProducts() {
    return new Promise((resolve, reject) => {
      let token = Tokens.getToken();
      axios
        .get(`${REST_BASE_URL}api/pos/products/`, {
          headers: { Authorization: token }
        })
        .then(response => {
          if (response.status === 200) {
            resolve(response);
          } else {
            console.error("error while getting products: ", response);
            reject(response);
          }
        })
        .catch(function (error) {
          reject(error);
          console.error("error catch getting products: ", error);
        });
    });
  }

  static deleteProduct(productsIds) {
    return new Promise((resolve, reject) => {
      let token = Tokens.getToken();
      axios
        .delete(`${REST_BASE_URL}api/pos/products_batch/`, {
          headers: { Authorization: token },
          data: productsIds
        })
        .then(response => {
          if (response.status === 200) {
            resolve(response);
          } else {
            console.error("error while deleting products: ", response);
            reject(response);
          }
        })
        .catch(function (error) {
          reject(error);
          console.error("error catch deleting products: ", error);
        });
    });
  }


  static updateProduct(products) {
    return new Promise((resolve, reject) => {
      let token = Tokens.getToken();
      axios
        .put(`${REST_BASE_URL}api/pos/products_batch/`, {
          headers: { Authorization: token },
          data: products
        })
        .then(response => {
          if (response.status === 200) {
            resolve(response);
          } else {
            console.error("error while updating products: ", response);
            reject(response);
          }
        })
        .catch(function (error) {
          reject(error);
          console.error("error catch updating products: ", error);
        });
    });
  }


  static loadRemoteProductInLocalDB(oldProductsBarcode, newproducts) {
    let tempArray = [],
      tempArray1 = [],
      newProductsKeyValue = {},
      uniqueProducts = [],
      uniqueBarcodes = [];
    return new Promise((resolve, reject) => {
      for (let i = 0; i < newproducts.length; i++) {
        if (newproducts[i].barcode) {
          newProductsKeyValue[`${newproducts[i].barcode}`] = newproducts[i];
          tempArray.push(newproducts[i].barcode);
        }
      }
      console.log("oldProductsBarcode: ", oldProductsBarcode);
      console.log("tempArray: ", tempArray);
      for (let i = 0; i < tempArray.length; i++) {
        let uid = uuid();
        if (oldProductsBarcode.indexOf(tempArray[i]) === -1) {
          uniqueBarcodes.push(tempArray[i]);
          newProductsKeyValue[tempArray[i]].remoteId = newProductsKeyValue[tempArray[i]].id;
          newProductsKeyValue[tempArray[i]].id = uid;
          newProductsKeyValue[tempArray[i]]._id = uid;
          uniqueProducts.push(newProductsKeyValue[tempArray[i]]);
        }
      }
      // let uniqueBarcodes = Sets.symmetricDifference(
      //     oldProductsBarcode,
      //     tempArray
      //   ),
      //   iterators = {};
      // console.log("uniqueBarcodes: ", uniqueBarcodes);
      // iterators = uniqueBarcodes.values();
      // console.log("iterators.next().value: ", iterators.next().value);
      // while (iterators.next().value) {
      //   let a = newProductsKeyValue[iterators.next().value];
      //   console.log("newProductKeyValue: ", a);
      //   if (a) {
      //     uniqueProducts.push(a);
      //   }
      // }
      console.log("uniqueProducts: ", uniqueProducts);
      if (uniqueProducts.length) {
        store.dispatch({
          type: PRODUCT.SET_PRODUCTS_BARCODE,
          data: uniqueBarcodes
        });
        store.dispatch({
          type: PRODUCT.ADD_PRODUCT,
          data: uniqueProducts
        })
        ProductDB.insertBulk(uniqueProducts)
          .then(res => {
            console.log("products inserted into database: ", res);
            resolve(res);
          })
          .catch(err => {
            console.log("error while inserting error: ", err);
            reject(err);
          });
      } else {
        resolve();
      }
      console.log(uniqueProducts);
      console.log("tempArray: ", tempArray, tempArray1);
    });
  }
}

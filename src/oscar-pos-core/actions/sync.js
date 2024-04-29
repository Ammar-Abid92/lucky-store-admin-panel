/* eslint-disable no-unused-vars */

import Order from "./OdooActions/RESTcalls/orders";
import Products from "./OdooActions/RESTcalls/product";
import {
  getStructuredOrder,
  getProductFromLocalToOdoo,
  customerFromLocalToOdoo
} from "../DataMiddleware/index";
import { updateProductsIdForOdoo } from "./product";
import { updateCustomerIdForOdoo } from "./customer";
import Customers from "./OdooActions/RESTcalls/customer";
import Payments from "./OdooActions/RESTcalls/Payments";
// export const sync = async function sync(dispatch) {
export const sync = async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    let orders = JSON.parse(localStorage.getItem("order")) || [];
    let products = JSON.parse(localStorage.getItem("product")) || [];
    let deletedProds = JSON.parse(localStorage.getItem("deletedProds")) || [];
    let updatedProds = JSON.parse(localStorage.getItem("updatedProds")) || [];
    let customers = JSON.parse(localStorage.getItem("customer")) || [];
    let deleteCustomers = JSON.parse(localStorage.getItem("deleteCustomers")) || [];
    let updateCustomers = JSON.parse(localStorage.getItem("updateCustomers")) || [];
    let payments = JSON.parse(localStorage.getItem("payments")) || [];


    if (products.length) {
      try {
        await postProductsToOdoo(products, dispatch);
      } catch (err) {
        reject("Error while syncing products");
      }
    }

    if (orders.length) {
      try {
        await postOrdersToOdoo(orders);
      } catch (err) {
        reject("Error while syncing orders");
      }
    }

    if (deletedProds.length) {
      try {
        await deleteProductsFromOdoo();
      } catch (err) {
        reject("Error while deleting products");
      }
    }

    if (customers.length) {
      try {
        await postCustomersToOdoo(customers, dispatch);
      } catch (err) {
        reject("Error while syncing customers");
      }
    }
    if (updatedProds.length) {
      try {
        await updateProductsInOdoo(updatedProds);
      } catch (err) {
        reject("Error while updating products");
      }
    }

    if (deleteCustomers.length) {
      try {
        await deleteCustomersFromOdoo();
      } catch (err) {
        reject("Error while deleting customers");
      }
    }

    if (updateCustomers.length) {
      try {
        await updateCustomersInOdoo(updateCustomers);
      } catch (err) {
        reject("Error while updating customers");
      }
    }
    if (payments.length) {
      try {
        await postPaymentsToOdoo();
      } catch (err) {
        reject("Error while posting payments");
      }
    }

    console.log("-------------- SYNCING FINISHED -------------")
    resolve();
  });
}

const postProductsToOdoo = (products, dispatch) => {
  return new Promise((resolve, reject) => {
    console.log("Products from Local Storage : ", products);
    let odooProductData = [];
    for (let i = 0; i < products.length; i++) {
      odooProductData.push(getProductFromLocalToOdoo(products[i]));
    }
    console.log("odooProductData  : ", odooProductData);
    let productBarcodeAndIds;
    Products.createProduct(odooProductData)
      .then(res => {
        console.log("NEW PRODUCTS HAS BEEN SYNCED TO ODOO SUCESSFULLY !!")
        productBarcodeAndIds = { ...res };
        updateProductIdsInOrderLines(productBarcodeAndIds, products)
          .then(res => {
            Object.keys(productBarcodeAndIds).forEach((key, index) => {
              let productBarcode = key;
              let productId = productBarcodeAndIds[key];
              dispatch(
                updateProductsIdForOdoo(
                  productBarcode,
                  productId,
                  products[index]
                )
              )
                .then(res => {
                  resolve();
                })
                .catch(err => {
                  reject(err);
                });
            });
            localStorage.setItem("product", null);
          })
          .catch(err => {
            reject(err);
          });
      })
      .catch(err => {
        reject(err);
      });
  });
};
const updateProductIdsInOrderLines = (productBarcodeAndIds, products) => {
  return new Promise((resolve, reject) => {
    let orders = JSON.parse(localStorage.getItem("order")) || [];
    console.log(
      "updateProductIdsInOrderLines +++ ",
      productBarcodeAndIds,
      products
    );
    console.log("Orders from Local Storage : ", orders);
    for (let i = 0; i < orders.length; i++) {
      for (let j = 0; j < orders[i].lines.length; j++) {
        let product = products.find(product => {
          return product.id === orders[i].lines[j].product_id;
        });
        console.log("product : ", product);
        if (product) {
          console.log("product if: ", product);
          orders[i].lines[j].remoteId = productBarcodeAndIds[product.barcode];
        }
      }
    }
    localStorage.setItem("order", JSON.stringify(orders));
    resolve();
  });
};

const postOrdersToOdoo = orders => {
  return new Promise((resolve, reject) => {
    let orders = JSON.parse(localStorage.getItem("order")) || [];
    console.log("Orders from Local Storage : ", orders);
    let odooOrderData = [];
    for (let i = 0; i < orders.length; i++) {
      odooOrderData.push(getStructuredOrder(orders[i]));
    }
    console.log("odooOrderData  : ", odooOrderData);
    Order.submitOrder(odooOrderData)
      .then(res => {
        console.log("ORDERS HAS BEEN SYNCED TO ODOO SUCESSFULLY !!")
        localStorage.setItem("order", null);
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const deleteProductsFromOdoo = () => {
  return new Promise((resolve, reject) => {
    let deletedProds = JSON.parse(localStorage.getItem("deletedProds")) || [];
    console.log("deletedProds from Local Storage : ", deletedProds);

    Products.deleteProduct(deletedProds)
      .then(res => {
        console.log("DELETED PRODUCTS HAS BEEN SYNCED TO ODOO SUCESSFULLY !!")
        localStorage.setItem("deletedProds", null);
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const updateProductsInOdoo = updatedProds => {
  return new Promise((resolve, reject) => {
    console.log("updatedProds from Local Storage : ", updatedProds);
    let updatedProdsOdoo = [];
    for (let i = 0; i < updatedProds.length; i++) {
      updatedProdsOdoo.push({
        id: updatedProds[i].id,
        remoteId: updatedProds[i].remoteId,
        ...getProductFromLocalToOdoo(updatedProds[i])
      });
      delete updatedProdsOdoo[i].pos_categ_id;
    }
    console.log("updatedProdsOdoo : ", updatedProdsOdoo);
    Products.updateProduct(updatedProdsOdoo)
      .then(res => {
        console.log("UPDATED PRODUCTS HAS BEEN SYNCED TO ODOO SUCESSFULLY !!")
        localStorage.setItem("updatedProds", null);
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const updateCustomersInOdoo = updateCustomers => {
  return new Promise((resolve, reject) => {
    let odooCustomerData = [];
    console.log("updateCustomer from localstorage: ", updateCustomers);
    for (let i = 0; i < updateCustomers.length; i++) {
      delete updateCustomers[i].id;
      delete updateCustomers[i].user_id;
      //   delete customers[i].rev;
      //   delete customers[i]._id;
      // delete updateCustomers[i].phone;
      //   delete customers[i].email;
      delete updateCustomers[i].loyalty_points;
      delete updateCustomers[i].total_outstanding_payment;
      delete updateCustomers[i].address;
      updateCustomers[i].phone = "+92" + updateCustomers[i].phone.slice(1);
      odooCustomerData.push(customerFromLocalToOdoo(updateCustomers[i]));
    }
    Customers.updateCustomer(odooCustomerData)
      .then(res => {
        console.log("UPDATED CUSTOMERS HAS BEEN SYNCED TO ODOO SUCESSFULLY !!")
        localStorage.setItem("updateCustomers", null);
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const deleteCustomersFromOdoo = () => {
  return new Promise((resolve, reject) => {
    let deleteCustomers =
      JSON.parse(localStorage.getItem("deleteCustomers")) || [];
    console.log("deletedCustomers from Local Storage : ", deleteCustomers);

    Customers.deleteCustomer(deleteCustomers)
      .then(res => {
        console.log("DELETED CUSTOMERS HAS BEEN SYNCED TO ODOO SUCESSFULLY !!")
        localStorage.setItem("deleteCustomers", null);
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const postCustomersToOdoo = (customers, dispatch) => {
  return new Promise((resolve, reject) => {
    let odooCustomerData = [];
    console.log("Customers from local Storage: ", customers);
    for (let i = 0; i < customers.length; i++) {
      delete customers[i].id;
      delete customers[i].user_id;
      //   delete customers[i].rev;
      //   delete customers[i]._id;
      // delete customers[i].phone;
      //   delete customers[i].email;
      delete customers[i].loyalty_points;
      delete customers[i].total_outstanding_payment;
      delete customers[i].address;
      customers[i].phone = "+92" + customers[i].phone.slice(1);
      odooCustomerData.push(customerFromLocalToOdoo(customers[i]));
    }
    console.log("odooCustomerData  : ", odooCustomerData);
    Customers.createCustomer(odooCustomerData)
      .then(res => {
        console.log("NEW CUSTOMERS HAS BEEN SYNCED TO ODOO SUCESSFULLY !!")
        for (let i = 0; i < res.data.length; i++) {
          console.log("res.data[i]: ", res.data[i]);
          dispatch(updateCustomerIdForOdoo(res.data[i]))
            .then(data => {
              console.log("data: ", data);
              // resolve(data)
            })
            .catch(error => {
              console.error("error: ", error);
            });
        }
        console.log("created customers in database: ", res);
        localStorage.setItem("customer", null);
        resolve()
      })
      .catch(error => {
        console.error("error: ", error);
      });
  });
};


const postPaymentsToOdoo = () => {
  return new Promise((resolve, reject) => {
    let payments =
      JSON.parse(localStorage.getItem("payments")) || [];
    console.log("payments from Local Storage : ", payments);

    Payments.submitPayment(payments)
      .then(res => {
        console.log("PAYMENTS HAS BEEN SYNCED TO ODOO SUCESSFULLY !!")
        localStorage.setItem("payments", null);
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};
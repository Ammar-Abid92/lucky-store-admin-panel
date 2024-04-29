/* eslint-disable no-unused-vars */
import { uuid } from "../constants";
let orderSchema = {
  //order schema
  /* similar to odoo */
  name: "string",
  amount_paid: "float",
  amount_tax: "float",
  amount_return: "int",
  //   lines: { type: "list", objectType: ORDER_LINES_SCHEMA },
  statement_id: { type: "int", optional: true }, //but in odoo its array of arrays
  pos_session_id: "string",
  partner_id: "string",
  user_id: "string",
  creation_date: "date",
  amount_total: "float",

  /* only locally available  */
  id: "string",
  to_invoice: { type: "bool", default: false },
  // sequence_number: "int",
  // statement_ids: { type: 'list', objectType: JOURNAL_SCHEMA },
  account_id: { type: "int", optional: true },
  journal_id: { type: "int", optional: true },
  amount: { type: "int", optional: true }
};

let lineSchema = {
  /* similar to odoo */
  qty: "int",
  price_unit: "int", // Sale price
  discount: "int",
  product_id: "int",
  id: "string",
  isVoid: { type: "bool", default: false },
  note: { type: "string", optional: true },

  /* only locally available */
  order_id: "string",
  discount_note: { type: "string", optional: true },
  cost_price: "int", // Cost Price,
  display_name: "string",
  pack_lot_ids: { type: "list", objectType: "string", optional: true },
  tax_ids: { type: "list", objectType: "string", optional: true }
};

export function getStructuredOrder(orderObj) {
  let { lines } = orderObj,
    temArray = [];
  for (let i = 0; i < lines.length; i++) {
    let updatedLine = {
      qty: parseInt(lines[i].qty),
      price_unit: Number(lines[i].price_unit),
      // discount: Number(lines[i].discount),
      discount: Number((lines[i].discount / lines[i].price_unit) * 100),
      // product_id: lines[i].product_id,
      product_id: lines[i].remoteId,
      // tax_ids: [[6, false, [8]]],
      tax_ids: [],
      id: lines[i].id,
      isVoid: false,
      hasBeenVoided: false,
      isReturned: false,
      discountType: lines[i].discount_type
        ? lines[i].discount_type === "rs"
          ? "$"
          : "%"
        : "%",
      discountAmount:
        lines[i].discount_type === "rs" ? lines[i].discount.toString() : null,
      discount_note: "",
      modif_options: [],
      note: "",
      pack_lot_ids: [],
      course: 0,
      mp_dirty: false,
      mp_skip: false
    };
    temArray.push([0, 0, updatedLine]);
  }
  let odooOrder = {
    // id: "1-manager-00752-003-0178",
    data: {
      name: "Order# 1-manager-00752-003-0178",
      // amount_paid: Number(orderObj.amount_paid),
      amount_paid: Number(orderObj.cash_given),
      amount_total: Number(orderObj.amount_total),
      amount_tax: Number(orderObj.amount_tax),
      amount_return: Number(orderObj.amount_return),
      to_invoice: orderObj.to_invoice,
      allowDeleteLine: true,
      lines: temArray,
      statement_ids: [[]],
      pos_session_id: 752,
      partner_id: orderObj.customer_id || false,
      user_id: 1,
      uid: "1-manager-00752-003-0178",
      sequence_number: 178,
      creation_date: orderObj.creation_date,
      fiscal_position_id: false,
      printed: false,
      payment_clicked: true,
      bank_name: false,
      credit_card_no: false,
      card_holder_name: false,
      discount_per: false,
      locked: false,
      opened_by: false,
      table: "15",
      table_id: 31,
      floor: "Dine - In (POS 1)",
      floor_id: 2,
      customer_count: 1,
      multiprint_resume: {
        3: {
          qty: 1,
          note: "",
          course: 0,
          product_id: 54642
        }
      },
      selected_course: 0,
      cashier: "Administrator",
      waiter: "Administrator",
      wk_loyalty_points: 0,
      tpoints: 0,
      redeemTaken: false,
      remaining_points: 0,
      earned_points: 0,
      rider: {},
      delivery_order_status: "Preparing",
      call_center_order: false,
      call_center_order_status: "Waiting"
    },
    // to_invoice: false,
    to_invoice: orderObj.to_invoice
  };

  return odooOrder;
}

export function customerFromLocalToOdoo(localCustomer) {
  let newCustomer = {};
  return localCustomer;
}

export function getProductFromLocalToOdoo(localProduct) {
  let newProductObj = {
    // kitchen_code: false,
    // tracking: "none",
    // list_price: localProduct.list_price,
    lst_price: localProduct.list_price,
    standard_price: localProduct.standard_price,
    // description: false,
    // uom_id: [1, "Unit(s)"],
    // price: localProduct.price,
    barcode: localProduct.barcode,
    // discount_str: 0.0,
    // item_code: false,
    // product_tmpl_id: [56109, localProduct.display_name],
    pos_categ_id: [2, `${localProduct.category} / ${localProduct.subcategory}`],
    // wk_point_for_loyalty: 0,
    allow_custom_price: false,
    category: localProduct.category,
    subcategory: localProduct.subcategory,
    // default_code: false,
    // product_modifiers: [4581],
    // to_weight: false,
    display_name: localProduct.display_name,
    name: localProduct.display_name,
    // taxes_id: [8],
    description_sale: false
    // ingredient_notes: "No Ingredient Notes Provided."
  };

  return newProductObj;
}

function getProductFromOdooToLocal(odooProduct) {
  let newProductObj = {
    id: uuid(),
    ...odooProduct,
    standard_price: odooProduct.list_price * 0.85,
    category: odooProduct.pos_categ_id[1].slice(
      0,
      odooProduct.pos_categ_id[1].indexOf("/") + 1
    ),
    subcategory: odooProduct.pos_categ_id[1].slice(
      odooProduct.pos_categ_id[1].indexOf("/")
    ),
    qty_in_stock: 0
  };
  return newProductObj;
}

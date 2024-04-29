import base64js from 'base64-js';
import {BASE_64} from '../constants';
export const LAST_SYNC_SCHEMA = 'LAST_SYNC_SCHEMA';
export const ORDER_LINES_SCHEMA = 'ORDER_LINES';
export const ORDER_SCHEMA = 'ORDER';
export const CUSTOMER_SCHEMA = 'CUSTOMER';
export const JOURNAL_SCHEMA = 'JOURNAL';
export const PRODUCT_SCHEMA = 'PRODUCT';
export const CATEGORY_SCHEMA = 'CATEGORY';
export const SESSION_SCHEMA = 'SESSION';
export const MONEY_IN_SCHEMA = 'MONEY_IN';
export const MONEY_OUT_SCHEMA = 'MONEY_OUT';
export const USER_SCHEMA = 'USERS';
export const PAYMENT_SCHEMA = 'PAYMENT';
export const DELETED_RECORD_SCHEMA = 'DELETED_RECORD_SCHEMA';
export const BUSINESS_CARD_SCHEMA = 'BUSINESS_CARD_SCHEMA';
export const CONTACTS_SCHEMA = 'CONTACTS_SCHEMA';

// data types for realm bool , int , float , double , string , data , and date

export const ContactsSchema = {
  name: CONTACTS_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'string',
    user_id: 'string',
    contact_id: 'string',
    name: {type: 'string', indexed: true},
    phone: 'string',
  },
};

export const LastsyncSchema = {
  name: LAST_SYNC_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'string',
    lastSyncAt: 'date',
  },
};
export const DeleteRecordSchema = {
  name: DELETED_RECORD_SCHEMA,
  primaryKey: 'recordId',
  properties: {
    recordId: 'string',
    recordType: 'string',
  },
};
export const UserSchema = {
  name: USER_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'string',
    // name: {type: 'string', optional: true, default: ''},
    firebase_device_token: {type: 'string', optional: true, default: ''},
    telco_network: {type: 'string', optional: true, default: ''},
    // password: "string",
    phone_number: 'string',
    pin: {type: 'string', optional: true, default: '0000'},
    category: {type: 'string', optional: false, default: ''},
    activation_code: {type: 'string', optional: true, default: '0000'},
    isActive: {type: 'bool', optional: true, default: false},
    isSynced: {type: 'bool', optional: true, default: false}, // introducing new field (cloud sync)
    name: {type: 'string', optional: true}, // Dukaan Fields
    address: {type: 'string', optional: true}, // Dukaan Fields
    landmark: {type: 'string', optional: true}, // Dukaan Fields
    store_coordinates_longitude: {type: 'string', optional: true}, // Dukaan Fields
    store_coordinates_latitude: {type: 'string', optional: true}, // Dukaan Fields
    vanity_url: {type: 'string', optional: true}, // Dukaan Fields
    charge_per_order: {type: 'float', optional: true},
    free_delivery_above: {type: 'float', optional: true},
    currency: {type: 'string', optional: true},
    country: {type: 'string', optional: true},
    commission_mode: {type: 'string', optional: true},
    commission_percent: {type: 'int', optional: true},
    image: {type: 'string', optional: true},
  },
};
export const CustomerSchema = {
  name: CUSTOMER_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'string',
    user_id: 'string',
    name: 'string',
    phone: {type: 'string', optional: true, default: ''},
    transaction_sms: {type: 'bool', default: true},
    email: 'string',
    address: 'string',
    sms: {type: 'string', optional: true},
    total_outstanding_payment: 'float',
    loyalty_points: 'int',
    collection_date: {type: 'date', default: null, optional: true},
    creation_date: {type: 'date', default: new Date(), optional: true},
    isSynced: {type: 'bool', optional: true, default: false}, // introducing new field (cloud sync)
  },
};
export const PrdouctSchema = {
  name: PRODUCT_SCHEMA,
  primaryKey: '_id',
  properties: {
    _id: 'string',
    name: {type: 'string', optional: true},
    price: {type: 'float', optional: true},
    description: {type: 'string', optional: true},
    variants: {type: 'list', objectType: 'string', optional: true}, // schema for this is needed
    isActive: {type: 'bool', optional: true},
    perUnit: {type: 'string', optional: true},
    costPrice: {type: 'float', optional: true},
    continue_without_stock: {type: 'bool', optional: true},
    stockable: {type: 'bool', optional: true},
    // categories: {
    //   type: 'list',
    //   objectType: CATEGORY_SCHEMA,
    // },
    categories: {type: 'list', objectType: 'string', optional: true},
    photo: {type: 'list', objectType: 'string', optional: true}, // schema needed for data and uri
  },
  phone_number: {type: 'string', optional: true},
  activation_code: {type: 'string', optional: true},
};

export const CategorySchema = {
  name: CATEGORY_SCHEMA,
  primaryKey: '_id',
  properties: {
    //Dukaan Fields
    _id: 'string',
    name: {type: 'string', optional: true},
    phone_number: {type: 'string', optional: true},
    activation_code: {type: 'string', optional: true},
  },
};

export const OrderLinesSchema = {
  name: ORDER_LINES_SCHEMA,
  primaryKey: 'id',
  properties: {
    /* similar to odoo */
    qty: 'int',
    price_unit: 'int', // Sale price
    discount: 'int',
    product_id: 'int',
    id: 'string',
    isVoid: {type: 'bool', default: false},
    note: {type: 'string', optional: true},
    /* only locally available */
    order_id: 'string',
    discount_note: {type: 'string', optional: true},
    cost_price: 'int', // Cost Price,
    display_name: 'string',
    pack_lot_ids: {type: 'list', objectType: 'string', optional: true},
    tax_ids: {type: 'list', objectType: 'string', optional: true},
  },
};
export const JournalSchema = {
  name: JOURNAL_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'int',
    journal_id: 'int',
    name: 'string',
    account_id: 'int',
  },
};
export const OrderSchema = {
  name: ORDER_SCHEMA,
  primaryKey: 'id',
  // primaryKey: "sequence_number",
  properties: {
    /* similar to odoo */
    name: 'string',
    amount_paid: 'float',
    amount_tax: 'float',
    amount_return: 'int',
    lines: {type: 'list', objectType: ORDER_LINES_SCHEMA},
    statement_id: {type: 'int', optional: true}, //but in odoo its array of arrays
    pos_session_id: 'string',
    partner_id: 'string',
    user_id: 'string',
    creation_date: 'date',
    amount_total: 'float',
    /* only locally available  */
    id: 'string',
    to_invoice: {type: 'bool', default: false},
    // sequence_number: "int",
    // statement_ids: { type: 'list', objectType: JOURNAL_SCHEMA },
    account_id: {type: 'int', optional: true},
    journal_id: {type: 'int', optional: true},
    amount: {type: 'int', optional: true},
  },
};
export const SessionSchema = {
  name: SESSION_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'string',
    user_id: 'string',
    state: 'string',
    start_at: 'date',
    stop_at: {type: 'date', default: null, optional: true},
    cash_register_balance_start: {type: 'float', default: 0, optional: true},
    cash_register_balance_end: {type: 'float', default: 0, optional: true},
    cash_register_balance_end_real: {
      type: 'float',
      default: 0,
      optional: true,
    },
    cash_register_difference: {type: 'float', default: 0, optional: true},
    no_of_transactions: {type: 'int', default: 0, optional: true},
    no_of_customers: {type: 'int', default: 0, optional: true},
    total_money_in_amount: {type: 'int', default: 0, optional: true},
    total_money_out_amount: {type: 'int', default: 0, optional: true},
    money_in: {type: 'list', objectType: MONEY_IN_SCHEMA},
    money_out: {type: 'list', objectType: MONEY_OUT_SCHEMA},
    total_transactions_amount: {type: 'float', default: 0, optional: true},
    total_amount_paid: {type: 'float', default: 0, optional: true},
    total_outstanding_amount: {type: 'float', default: 0, optional: true},
  },
};
export const MoneyInSchema = {
  name: MONEY_IN_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'string',
    user_id: 'string',
    pos_session_id: 'string',
    amount: 'int',
    reason: 'string',
  },
};
export const MoneyOutSchema = {
  name: MONEY_OUT_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'string',
    user_id: 'string',
    pos_session_id: 'string',
    amount: 'int',
    reason: 'string',
  },
};
export const PaymentSchema = {
  name: PAYMENT_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'string',
    customer_id: {type: 'string', indexed: true},
    user_id: 'string',
    amount: 'float',
    balance: {type: 'float', default: 0, optional: true},
    date: 'date',
    payment_mode: 'string',
    image_url: {type: 'string', default: '', optional: true},
    udhaar_note: {type: 'string', default: '', optional: true},
    old_amount: {type: 'float', optional: true, default: 0},
    isSynced: {type: 'bool', optional: true, default: false}, // introducing new field (cloud sync)
  },
};

export const BusinessCardSchema = {
  name: BUSINESS_CARD_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'string',
    user_id: 'string',
    business_name: 'string',
    phone_number: 'string',
    business_category: {type: 'string', default: '', optional: true},
    address: {type: 'string', default: '', optional: true},
    email: {type: 'string', default: '', optional: true},
    about_us: {type: 'string', default: '', optional: true},
    contact_name: {type: 'string', default: '', optional: true},
  },
};

const hex =
  'cbf4857160b34b91193dcb8c32cf6f3786bcbd53c26798b86f6a5ab9d41a6c8dd42a43b9194b84aaf0e3349a771a136bcbd7873c8b66f861f27a9ec281dd6fd0';
const encryptionKey = base64js.toByteArray(BASE_64);
let key = new Int8Array(64);
export const databaseOpt = {
  path: 'oscar_pos_encrypted.realm',
  // path: "oscar_pos.realm",
  schema: [
    LastsyncSchema,
    DeleteRecordSchema,
    OrderSchema,
    OrderLinesSchema,
    CustomerSchema,
    JournalSchema,
    PrdouctSchema,
    CategorySchema,
    SessionSchema,
    MoneyInSchema,
    MoneyOutSchema,
    UserSchema,
    PaymentSchema,
    BusinessCardSchema,
    ContactsSchema,
  ],
  schemaVersion: 68,
  // schemaVersion: 2,
  // encryptionKey: key,
  encryptionKey,
};

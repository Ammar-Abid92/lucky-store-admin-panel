import React from 'react';

// import {
//   TouchableNativeFeedback,
//   Platform,
//   TouchableOpacity,
//   TouchableHighlight,
//   NetInfo,
//   AsyncStorage
// } from "react-native";
// import { NavigationActions, StackActions } from 'react-navigation';
export const days = ['SUN', 'MON', 'TUES', 'WED', 'THU', 'FRI', 'SAT'];
export const BASE_64 =
  'y/SFcWCzS5EZPcuMMs9vN4a8vVPCZ5i4b2paudQabI3UKkO5GUuEqvDjNJp3GhNry9eHPItm+GHyep7Cgd1v0A==';
// export const BASE_URL = __DEV__ ? "onstage.oscarhub.org": "dukaanonboard.oscar.pk" ;
// export const BASE_URL = "onstage.oscarhub.org";
// export const REST_BASE_URL = "https://ohstage.oscarhub.org";
// export const REST_BASE_URL = "http://127.0.0.1:8000";
export const REST_BASE_URL = 'http://192.168.10.40:8000';
// export const BASE_URL = "dukaanonboard.oscar.pk";
export const patt = /03[0-9]{2}(?!1234567)(?!1111111)(?!7654321)[0-9]{7}/; // VALIDATION FOR PAKISTANI MOBILE NUMBER
export const dates = ['Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days'];
export const escapeRegExp = (text) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};
export const validateEmail = (email) => {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const formatted_date = (current_datetime) => {
  current_datetime = new Date(current_datetime);
  current_datetime =
    current_datetime.getDate() +
    '-' +
    (current_datetime.getMonth() + 1) +
    '-' +
    current_datetime.getFullYear();
  return current_datetime.toString();
};

export const getDateForAnalytics = (duration) => {
  let n = 0,
    obj = {};
  let date = new Date();
  let startDate = '';
  switch (duration) {
    case 'Yesterday':
      n = 1;
      console.log(duration);
      obj.startDate = new Date(
        new Date(new Date().setDate(new Date().getDate() - n)).setHours(0, 0, 0, 0)
      );
      obj.endDate = new Date(
        new Date(new Date().setDate(new Date().getDate() - n)).setHours(23, 59, 0, 0)
      );
      break;
    case 'Last 7 Days':
      n = 7;
      console.log(duration);
      obj.startDate = new Date(
        new Date(new Date().setDate(new Date().getDate() - n)).setHours(0, 0, 0, 0)
      );
      obj.endDate = new Date(
        new Date(new Date().setDate(new Date().getDate() - 1)).setHours(23, 59, 0, 0)
      );
      break;
    case 'Last 30 Days':
      n = 30;
      obj.startDate = new Date(
        new Date(new Date().setDate(new Date().getDate() - n)).setHours(0, 0, 0, 0)
      );
      obj.endDate = new Date(
        new Date(new Date().setDate(new Date().getDate() - 1)).setHours(23, 59, 0, 0)
      );
      break;
    default:
      console.log(duration);
      obj.startDate = new Date(
        new Date(new Date().setDate(new Date().getDate() - 0)).setHours(0, 0, 0, 0)
      );
      obj.endDate = new Date(
        new Date(new Date().setDate(new Date().getDate() - 0)).setHours(23, 59, 0, 0)
      );
  }
  return obj;
};
export const colorsForPaymentMethodChart = {
  linearGradient: {
    x1: 0,
    x2: 0,
    y1: 0,
    y2: 1,
  },
  stops: [
    [0, '#f7a071'],
    [1, '#e8b20c'],
  ],
};

export const colorsForSalesByDayChart = {
  linearGradient: {
    x1: 0,
    x2: 0,
    y1: 0,
    y2: 1,
  },
  stops: [
    [0, '#ff799a'],
    [1, '#f8c282'],
  ],
};

export const colorsForSalesByHourChart = {
  linearGradient: {
    x1: 0,
    x2: 0,
    y1: 0,
    y2: 1,
  },
  stops: [
    [0, '#cf73fe'],
    [1, '#fd80bf'],
  ],
};
export const barChartTemplate = {
  chart: {
    backgroundColor: '#F9F9FE',
    marginLeft: 45,
    height: 382,
    fontFamily: 'Roboto',
    fontWeight: 400,
    spacingTop: 10,
    type: 'line',
    style: {
      paddingBottom: 10,
      fontSize: 16,
    },
  },
  title: {
    useHTML: true,
    style: {
      color: '#414042',
      fontSize: 16,
      fontWeight: 400,
      fontFamily: 'Roboto',
    },
    text: null,
    align: 'left',
    x: -5,
    y: 5,
  },
  xAxis: {
    categories: [],
    labels: {
      style: {
        fontSize: '8px',
      },
    },
  },
  yAxis: [
    {
      title: {
        text: null,
      },
    },
  ],
  legend: {
    itemStyle: {
      fontWeight: '400',
      fontSize: '13px',
      fontFamily: 'Roboto',
      color: '#414042',
    },
  },
  labels: {
    items: [],
  },
  series: [],
  credits: {
    enabled: false,
  },
  exporting: { enabled: false },
};
// export const isEmpty = (data) => {
//   let errorObj = {};
//   console.log("Data : ", data)
//   return new Promise((resolve, reject) => {
//     for (let i in data) {
//       if (!data[i]) {
//         errorObj[i] = `${i} can not be empty`

//         resolve(errorObj)
//         break
//       }
//     }
//     reject(errorObj)
//   })
//   // return false;
// }
export const isEmpty = (name, phone) => {
  return !name || !phone;
};
export const isUserExist = (customers, phone) => {
  return customers.find((customer) => phone === customer.phone);
};

export const isUserExistForUpdation = (customers, phone, customer_id) => {
  return customers.find((customer) => phone === customer.phone && customer_id !== customer.id);
};

export const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const getUserPin = () => Math.floor(1000 + Math.random() * 9000);

export const formatNum = (num) => {
  // return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  if (num) {
    return num
      ? Number(num)
          .toFixed(2)
          .replace(/[.,]00$/, '')
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      : num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  return;
};

export const formatWeightNum = (num) => {
  return num
    ? num
        .replace(/[^0-9.]/g, '')
        .replace(/\.{2,}/g, '.')
        .replace(/^0*([^0]\d*\.\d{3}).*/g, '$1')
    : num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatInputNum = (num) => {
  return num
    ? num
        .replace(/[^0-9.]/g, '')
        .replace(/\.{2,}/g, '.')
        .replace(/^0*([^0]\d*\.\d{2}).*/g, '$1')
    : num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formateDate_dd_month_yy = (date) => {
  date = new Date(date);
  const months = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ];
  let current_datetime = new Date(date);
  let formatted_date =
    current_datetime.getDate() +
    ' ' +
    months[current_datetime.getMonth()] +
    ' ' +
    current_datetime.getFullYear();
  return formatted_date;
};

export var getTotal = (cart, products) => {
  // console.log("products : ", products)
  let total = 0;
  if (Object.keys(cart).length) {
    // console.log('CART : ', cart)
    for (let key in cart) {
      var cartProd = products.find((product) => {
        return product.id == key || product.id == parseInt(key);
      });
      let price = cart[key].price || cartProd.price;
      total += cart[key].qty * price;
      if (cart[key].discount_type) {
        if (cart[key].discount_type === 'rs') {
          total -= cart[key].discount;
        } else {
          total -= (cart[key].discount * (cart[key].qty * price)) / 100;
        }
      }
    }
  }
  return total;
};

export let sortedProducts = (arrayOfProduct) => {
  let newArray = arrayOfProduct.sort((a, b) => {
    return a.display_name - b.display_name;
  });
  return newArray;
};

export const getDate = (item) => {
  let splitedDate = item.split(' ');
  splitedDate.splice(splitedDate.length - 2, 2);
  return splitedDate.join(' ');
};
export var getCustomer = (partner_id, customers) => {
  var temp = customers.find((item) => {
    // return item.id === parseInt(partner_id);
    return item.id === partner_id;
  });
  return temp ? temp : null;
};

export var themeStyleSheet = {
  //Theme Color
  statusbarColor: '#552484',
  whitecolor: '#fff',
  //disableColor: "#d6cfd7",
  disableColor: '#ddd',
  containerColor: '#fafbfb',
  searchContMain: '#f5f5f6',
  searchTextColor: '#414042',
  searchTextColorupdate: '#cecece',
  iconLightColor: '#d1d3d4',
  SearchBoxDarkColor: '#8880b2',
  lightPurpleColor: '#615b81',
  productListBgColor: '#F1F2F2',
  productIntialColor: '#958CDC',
  productNameColor: '#58595B',
  productDetailTextColor: '#A7A9AC',
  productChargeBtn: '#D7DF23',
  addCutomerColor: '#00AEEF',
  paymentButton: '#EFEFEF',
  paymentButtonDisable: '#fbfbfb',
  udhaarButton: '#ffbc29',
  paymentButtonIcon: '#300F38',
  segmentBgColor: '#E6E7E8',
  switchDeactivatebg: '#BCBEC0',
  switchActivatebg: '#8DC63F',
  progressbarColor: '#a67be5',
  discountBtnBg: '#5D5D5D',
  addBtnBg: '#958CDC',
  voidBtnBg: '#FF9900',
  dltBtnBg: '#ED1C24',
  orderStatusText: '#FBB040',
  headerbgColor: '#662d94',
  qtyBorderColor: '#f0f1f5',
  removeBtBg: '#ea4335',
  cashButtonBg: '#31cfe8',
  disableBtn: '#f4f4f4',
  calculatorBorder: '#f0f1f1',
  disableColornew: '#dedede',
  greenColor: '#39b54a',
  udharAmunt: '#ff714a',
  customerPhoneNumber: '#575757',
  tableHeaderbg: '#fcfcfc',
  udhartableCell: '#e51a32',
  splashScreenBg: '#d14ffb',
  newBgColor: '#f2f3f3',
  payNowButton: '#27aae1',
  lightGray: '#cecece',

  //Theme Color
  borderLightColor: 'rgba(0,0,0,0.1)',

  // Font Family
  robotoFont: 'robotoRegular',
  robotoBoldFont: 'robotoBold',
  robotoBoldFont: 'robotoBold',
  robotoLightFont: 'robotoLight',
  robotoThinFont: 'robotoThin',
  robotoMediumFont: 'robotoMedium',

  // Header Styling
  headerHeight: 65,
  headerSingleColor: '#a180e2',

  // FONT SIZE
  fontSize16: 16,
  fontSize12: 12,
  fontSize14: 14,
  fontSize16: 16,
  fontSize18: 18,
  fontSize20: 20,
  fontSize22: 22,
  fontSize24: 24,
  fontSize26: 26,
  fontSize28: 28,
  fontSize30: 30,
  fontSize32: 32,
  fontSize34: 34,
  fontSize36: 36,
  fontSize38: 38,
  fontSize40: 40,
  fontSize42: 42,
  fontSize44: 44,
  fontSize46: 46,
  fontSize66: 66,
  fontSize70: 70,
  fontSize90: 90,
  fontSize120: 120,
  fontSize150: 150,

  //Padding
  padding: 0,
  paddingTen: 10,
  paddingTewelve: 12,
  paddingFifteen: 15,
  paddingTewenty: 20,
  paddingTewentyFive: 25,

  //Padding Top
  paddingTp: 0,
  paddingTpFive: 5,
  paddingTpTen: 10,
  paddingTpTewelve: 12,
  paddingTpFifteen: 15,
  paddingTpTewenty: 20,
  //Padding Bottom
  paddingBt: 0,
  paddingBtFive: 5,
  paddingBtTen: 10,
  paddingBtFifteen: 15,
  paddingBtTewenty: 20,
  //Padding Left
  paddingLt: 0,
  paddingLtFive: 5,
  paddingLtTen: 10,
  paddingLtFifteen: 15,
  paddingLtTewenty: 20,
  //Padding Right
  paddingRt: 0,
  paddingRtFive: 5,
  paddingRtTen: 10,
  paddingRtFifteen: 15,
  paddingRtTewenty: 20,

  //Margin
  margin: 0,
  marginTen: 10,
  marginTewelve: 12,
  marginFifteen: 15,
  marginTewenty: 20,
  marginTewentyFive: 25,
  //Margin Top
  marginTp: 0,
  marginTpFive: 5,
  marginTpTen: 10,
  marginTpFifteen: 15,
  marginTpTewenty: 20,
  //Margin Bottom
  marginBt: 0,
  marginBtFive: 5,
  marginBtTen: 10,
  marginBtFifteen: 15,
  marginBtTewenty: 20,
  //Margin Left
  marginLt: 0,
  marginLtFive: 5,
  marginLtTen: 10,
  marginLtFifteen: 15,
  marginLtTewenty: 20,
  //Margin Right
  marginRt: 0,
  marginRtFive: 5,
  marginRtTen: 10,
  marginRtFifteen: 15,
  marginRtTewenty: 20,

  //Margin MinusRight
  marginRtMinusFive: -5,
  marginRtMinusTen: -10,
  marginRtMinusFifteen: -15,
  marginRtMinusTewenty: -20,
  //Margin MinusLeft
  marginLtMinusFive: -5,
  marginLtMinusTen: -10,
  marginLtMinusFifteen: -15,
  marginLtMinusTewenty: -20,
  //Margin MinusTop
  marginTpMinusFive: -5,
  marginTpMinusTen: -10,
  marginTpMinusFifteen: -15,
  marginTpMinusTewenty: -20,
  //Margin MinusBottom
  marginBtMinusFive: -5,
  marginBtMinusTen: -10,
  marginBtMinusFifteen: -15,
  marginBtMinusTewenty: -20,
};

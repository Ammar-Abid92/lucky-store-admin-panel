// export const BASE_URL = 'https://api.buytoko.com';
// export const BASE_URL = 'https://dukaan-api-stage.oscar.pk';
// export const BASE_URL = 'http://localhost:8080';
// export const WEB_BASE_URL = 'https://toko.pk/shop';
// export const WEB_BASE_URL = 'https://toko-stage.oscar.pk';
// export const WEB_BASE_URL = __DEV__
//   ? 'https://toko-stage.oscar.pk'
// : 'https://buytoko.com';
let ENVIRONMENT = "DEV";
export let WEB_BASE_URL;
export let CUSTOMER_BASE_URL;

// const setBaseURL = () => {
//   let temp = window.location.href.split("/");
//   let url = temp[2];
//   if (
//       url.includes("oscar.pk") ||
//       url.includes("localhost") ||
//       url.includes("192.")
//   ) {
//       ENVIRONMENT = "DEV";
//       return "https://dukaan-api-stage.oscar.pk";
//   } else {
//       ENVIRONMENT = "PROD"
//       return "https://api.buytoko.com";
//   }
// };


const setBaseURL = () => {
  let temp = window.location.href.split("/");
  let url = temp[2];

  if (process.env.NODE_ENV === 'development' || url.includes("sell.ubook.pk")) {
    ENVIRONMENT = "DEV";
    WEB_BASE_URL = 'sell.ubook.pk';
    CUSTOMER_BASE_URL = 'ubook.pk';
    return `https://api.ubook.pk/`;
  } else {
    ENVIRONMENT = "PROD"
    WEB_BASE_URL = 'sell.toko.pk';
    CUSTOMER_BASE_URL = 'toko.pk'
    return `https://api.toko.pk/`;
  }
};


if (ENVIRONMENT === "PROD") {
  window.console.log = function () { };
}
export const BASE_URL = setBaseURL();

export const patt = /03[0-4]{1}[0-9]{1}(?!1234567)(?!1111111)(?!7654321)[0-9]{7}/; // VALIDATION FOR PAKISTANI MOBILE NUMBER

export const createTitle = (val) =>
  String(val)
    .replace(new RegExp('-'), ' ')
    .replace(new RegExp('_'), ' ')
    .split(' ')
    .map((v) => v.toString().charAt(0).toUpperCase() + v.slice(1))
    .join(' ')
    .toString();

export const getCurrency = (country_name) => {

  if (country_name == 'Pakistan') {
    return 'Rs. ';
  } else if (
    country_name == 'United States of America' ||
    country_name == 'Canada'
  ) {
    return '$ ';
  } else if (country_name == 'United Kingdom') {
    return '£ ';
  } else if (country_name == 'Saudi Arabia') {
    return 'SAR ';
  } else if (country_name == 'United Arab Emirates') {
    return 'AED ';
  } else if (country_name == 'Oman') {
    return 'OMR';
  } else if (country_name == 'Bahrain') {
    return 'BD ';
  } else if (country_name == 'Qatar') {
    return 'QR ';
  } else {
    return '$ ';
  }
}

export var themeStyleSheet = {
  red: '#e51a32', //delete
  extraLightGray: '#f5f5f7', //seperator
  lightGray: '#cecece', //disabled input fields, fields line
  mediumGray: '#565656', //date,time,information
  darkGray: '#414143', //back btn,titles,customer name
  brightGreen: '#4ac600', //checkmark,accept,advance
  brightOrange: '#f96a32', //udhaar
  mainColor: '#3b0c36', //top bar, icons, input field labels, menu
  white: '#fff',
  whiteShade: '#f5f5f7',
  bluishwhite: '#f8fcff',
  skyBlue: '#27aae1', //notification,link
  mustardYellow: '#f2bc1d', // notification
  screenBg: '#f8f8f8',

  //Udhaar
  // statusbarColor: "#552484",
  // statusbarColor: '#00a9dd',

  playTutorialIconColor: '#a1008a',
  fontColor: '#414143',
  statusbarColor: '#0b195e',
  whitecolor: '#fff',
  // orangeColor: "#ff6b01",
  giveudhaarbtncolor: '#f96a32',
  orangeColor: '#4ac600',
  giveudhaarBtn: '#ffbb28',
  acceptpaymentBtn: '#8ec63f',
  balanceBoxBg: '#f5f5f7',
  balanceBoxInnerText: '#e31b35',
  notesBorderColor: '#e7e7e9',
  tickmarkbg: '#d6df22',
  udhaarscreenheaderIcon: '#fe6a00',
  acceptpaymentscreenheaderIcon: '#8ec63f',
  udhaarborderBottom: '#f8f8f8',
  calenderIconColor: '#bdbdbd',
  calenderDateColor: '#58585a',
  totalColor: '#d3d3d5',
  heartColor: '#ef4136',
  // oscarLogoIconColor: "#510146",#3b0c36
  oscarLogoIconColor: '#3b0c36',

  loginTextColor: '#b6c563',
  //disableColor: "#d6cfd7",
  disableColor: '#ddd',
  disableColor2: '#969393',
  containerColor: '#fafbfb',
  iconandtextnewclr: '#404042',
  serachinputplaceholder: '#5a5a5d',
  searchbBoxbordercolornew: '#e3e3e5',
  customerListingName: '#3f3f41',
  customerListingNumbernew: '#565656',
  listingUdhaarText: '#e61a33',
  searchContMain: '#f5f5f6',
  searchTextColor: '#717072',
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
  udhaarButton: '#e55c00',
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
  // headerbgColor: "#662d94",
  // headerbgColor: '#00aeef',
  headerbgColor: '#070d59',
  qtyBorderColor: '#f0f1f5',
  removeBtBg: '#ea4335',
  cashButtonBg: '#21a52a',
  disableBtn: '#f4f4f4',
  calculatorBorder: '#f0f1f1',
  disableColornew: '#dedede',
  greenColor: '#39b54a',
  udharAmunt: '#ff714a',
  customerPhoneNumber: '#575757',
  tableHeaderbg: '#fcfcfc',
  udhartableCell: '#f96a32',
  splashScreenBg: '#d14ffb',
  newBgColor: '#f2f3f3',
  payNowButton: '#27aae1',
  gradientColorTop: '#3d0137',
  gradientColorBottom: '#9e0088',
  greenColor: '#50b54f',
  redColor: '#e61b31',
  lightGrayColor: '#f0f0f0',
  darkGrayColor: '#414143',
  //Theme Color
  borderLightColor: 'rgba(0,0,0,0.1)',
  // Header Styling
  headerHeight: 65,
  headerSingleColor: '#a180e2',
};

export const formatAMPM = (date) => {
  const GMT = 5; // Pakistan GMT +5
  let hours = date.getHours() + GMT;
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour ‘0’ should be ‘12’
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};

export const formatCreationDate = (date) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dateFilter = ["Yesterday", "Today"];
  let current_date = new Date(date);
  const dateString = `${current_date.getDate()} ${monthNames[current_date.getMonth()]
    } ${current_date.getFullYear()}, ${formatAMPM(current_date)}`;
  return dateString;
};






export const dates = [
  'Today',
  'Yesterday',
  'Last 7 Days',
  'Last 30 Days',
  'Last Month',
];

// export const ALL_COUNTRIES = [{
//   "name": "Afghanistan",
//   "dial_code": "0093",
//   "code": "AF",
//   "path": require('../assets/Flags/Afghanistan.png')
// },
// {
//   "name": "Albania",
//   "dial_code": "00355",
//   "code": "AL",
//   "path": require('../assets/Flags/Albania.png')
// },
// {
//   "name": "Algeria",
//   "dial_code": "00213",
//   "code": "DZ",
//   "path": require('../assets/Flags/Algeria.png')
// },
// {
//   "name": "American Samoa",
//   "dial_code": "001684",
//   "code": "AS",
//   "path": require('../assets/Flags/American_Samoa.png')
// },
// {
//   "name": "Andorra",
//   "dial_code": "00376",
//   "code": "AD",
//   "path": require('../assets/Flags/Andorra.png')
// },
// {
//   "name": "Angola",
//   "dial_code": "00244",
//   "code": "AO",
//   "path": require('../assets/Flags/Angola.png')
// },
// {
//   "name": "Anguilla",
//   "dial_code": "001264",
//   "code": "AI",
//   "path": require('../assets/Flags/Anguilla.png')
// },
// {
//   "name": "Antigua and Barbuda",
//   "dial_code": "001268",
//   "code": "AG",
//   "path": require('../assets/Flags/Antigua_and_Barbuda.png')
// },
// {
//   "name": "Argentina",
//   "dial_code": "0054",
//   "code": "AR",
//   "path": require('../assets/Flags/Argentina.png')
// },
// {
//   "name": "Armenia",
//   "dial_code": "00374",
//   "code": "AM",
//   "path": require('../assets/Flags/Armenia.png')
// },
// {
//   "name": "Aruba",
//   "dial_code": "00297",
//   "code": "AW",
//   "path": require('../assets/Flags/Aruba.png')
// },
// {
//   "name": "Australia",
//   "dial_code": "0061",
//   "code": "AU",
//   "path": require('../assets/Flags/Australia.png')
// },
// {
//   "name": "Austria",
//   "dial_code": "0043",
//   "code": "AT",
//   "path": require('../assets/Flags/Austria.png')
// },
// {
//   "name": "Azerbaijan",
//   "dial_code": "00994",
//   "code": "AZ",
//   "path": require('../assets/Flags/Azerbaijan.png')
// },
// {
//   "name": "Bahamas",
//   "dial_code": "001242",
//   "code": "BS",
//   "path": require('../assets/Flags/Bahamas.png')
// },
// {
//   "name": "Bahrain",
//   "dial_code": "00973",
//   "code": "BH",
//   "path": require('../assets/Flags/Bahrain.png')
// },
// {
//   "name": "Bangladesh",
//   "dial_code": "00880",
//   "code": "BD",
//   "path": require('../assets/Flags/Bangladesh.png')
// },
// {
//   "name": "Barbados",
//   "dial_code": "001246",
//   "code": "BB",
//   "path": require('../assets/Flags/Barbados.png')
// },
// {
//   "name": "Belarus",
//   "dial_code": "00375",
//   "code": "BY",
//   "path": require('../assets/Flags/Belarus.png')
// },
// {
//   "name": "Belgium",
//   "dial_code": "0032",
//   "code": "BE",
//   "path": require('../assets/Flags/Belgium.png')
// },
// {
//   "name": "Belize",
//   "dial_code": "00501",
//   "code": "BZ",
//   "path": require('../assets/Flags/Belize.png')
// },
// {
//   "name": "Benin",
//   "dial_code": "00229",
//   "code": "BJ",
//   "path": require('../assets/Flags/Benin.png')
// },
// {
//   "name": "Bermuda",
//   "dial_code": "001441",
//   "code": "BM",
//   "path": require('../assets/Flags/Bermuda.png')
// },
// {
//   "name": "Bhutan",
//   "dial_code": "00975",
//   "code": "BT",
//   "path": require('../assets/Flags/Bhutan.png')
// },
// {
//   "name": "Bolivia",
//   "dial_code": "00591",
//   "code": "BO",
//   "path": require('../assets/Flags/Bolivia.png')
// },
// {
//   "name": "Bosnia",
//   "dial_code": "00387",
//   "code": "BA",
//   "path": require('../assets/Flags/Bosnia.png')
// },
// {
//   "name": "Botswana",
//   "dial_code": "00267",
//   "code": "BW",
//   "path": require('../assets/Flags/Botswana.png')
// },
// {
//   "name": "Brazil",
//   "dial_code": "0055",
//   "code": "BR",
//   "path": require('../assets/Flags/Brazil.png')
// },
// {
//   "name": "Brunei",
//   "dial_code": "00673",
//   "code": "BN",
//   "path": require('../assets/Flags/Brunei.png')
// },
// {
//   "name": "Bulgaria",
//   "dial_code": "00359",
//   "code": "BG",
//   "path": require('../assets/Flags/Bulgaria.png')
// },
// {
//   "name": "Burkina Faso",
//   "dial_code": "00226",
//   "code": "BF",
//   "path": require('../assets/Flags/Burkina_Faso.png')
// },
// {
//   "name": "Burundi",
//   "dial_code": "00257",
//   "code": "BI",
//   "path": require('../assets/Flags/Burundi.png')
// },
// {
//   "name": "Cambodia",
//   "dial_code": "00855",
//   "code": "KH",
//   "path": require('../assets/Flags/Cambodia.png')
// },
// {
//   "name": "Cameroon",
//   "dial_code": "00237",
//   "code": "CM",
//   "path": require('../assets/Flags/Cameroon.png')
// },
// {
//   "name": "Canada",
//   "dial_code": "001",
//   "code": "CA",
//   "path": require('../assets/Flags/Canada.png')
// },
// {
//   "name": "Cayman Islands",
//   "dial_code": "00345",
//   "code": "KY",
//   "path": require('../assets/Flags/Cayman_Islands.png')
// },
// {
//   "name": "Central African Republic",
//   "dial_code": "00236",
//   "code": "CF",
//   "path": require('../assets/Flags/Central_African_Republic.png')
// },
// {
//   "name": "Chad",
//   "dial_code": "00235",
//   "code": "TD",
//   "path": require('../assets/Flags/Chad.png')
// },
// {
//   "name": "Chile",
//   "dial_code": "0056",
//   "code": "CL",
//   "path": require('../assets/Flags/Chile.png')
// },
// {
//   "name": "China",
//   "dial_code": "0086",
//   "code": "CN",
//   "path": require('../assets/Flags/China.png')
// },
// {
//   "name": "Christmas Island",
//   "dial_code": "0061",
//   "code": "CX",
//   "path": require('../assets/Flags/Christmas_Island.png')
// },
// {
//   "name": "Colombia",
//   "dial_code": "0057",
//   "code": "CO",
//   "path": require('../assets/Flags/Colombia.png')
// },
// {
//   "name": "Comoros",
//   "dial_code": "00269",
//   "code": "KM",
//   "path": require('../assets/Flags/Comoros.png')
// },
// {
//   "name": "Cook Islands",
//   "dial_code": "00682",
//   "code": "CK",
//   "path": require('../assets/Flags/Cook_Islands.png')
// },
// {
//   "name": "Costa Rica",
//   "dial_code": "00506",
//   "code": "CR",
//   "path": require('../assets/Flags/Costa_Rica.png')
// },
// {
//   "name": "Cote d'Ivoire",
//   "dial_code": "00225",
//   "code": "CI",
//   "path": require("../assets/Flags/Cote_Divoire.png")
// },
// {
//   "name": "Croatia",
//   "dial_code": "00385",
//   "code": "HR",
//   "path": require('../assets/Flags/Croatia.png')
// },
// {
//   "name": "Cuba",
//   "dial_code": "0053",
//   "code": "CU",
//   "path": require('../assets/Flags/Cuba.png')
// },
// {
//   "name": "Cyprus",
//   "dial_code": "00357",
//   "code": "CY",
//   "path": require('../assets/Flags/Cyprus.png')
// },
// {
//   "name": "Czech Republic",
//   "dial_code": "00420",
//   "code": "CZ",
//   "path": require('../assets/Flags/Czech_Republic.png')
// },
// {
//   "name": "Denmark",
//   "dial_code": "0045",
//   "code": "DK",
//   "path": require('../assets/Flags/Denmark.png')
// },
// {
//   "name": "Djibouti",
//   "dial_code": "00253",
//   "code": "DJ",
//   "path": require('../assets/Flags/Djibouti.png')
// },
// {
//   "name": "Dominica",
//   "dial_code": "001767",
//   "code": "DM",
//   "path": require('../assets/Flags/Dominica.png')
// },
// {
//   "name": "Ecuador",
//   "dial_code": "00593",
//   "code": "EC",
//   "path": require('../assets/Flags/Ecuador.png')
// },
// {
//   "name": "Egypt",
//   "dial_code": "0020",
//   "code": "EG",
//   "path": require('../assets/Flags/Egypt.png')
// },
// {
//   "name": "El Salvador",
//   "dial_code": "00503",
//   "code": "SV",
//   "path": require('../assets/Flags/El_Salvador.png')
// },
// {
//   "name": "Equatorial Guinea",
//   "dial_code": "00240",
//   "code": "GQ",
//   "path": require('../assets/Flags/Equatorial_Guinea.png')
// },
// {
//   "name": "Eritrea",
//   "dial_code": "00291",
//   "code": "ER",
//   "path": require('../assets/Flags/Eritrea.png')
// },
// {
//   "name": "Estonia",
//   "dial_code": "00372",
//   "code": "EE",
//   "path": require('../assets/Flags/Estonia.png')
// },
// {
//   "name": "Ethiopia",
//   "dial_code": "00251",
//   "code": "ET",
//   "path": require('../assets/Flags/Ethiopia.png')
// },
// {
//   "name": "Falkland Islands",
//   "dial_code": "00500",
//   "code": "FK",
//   "path": require('../assets/Flags/Falkland_Islands.png')
// },
// {
//   "name": "Faroe Islands",
//   "dial_code": "00298",
//   "code": "FO",
//   "path": require('../assets/Flags/Faroe_Islands.png')
// },
// {
//   "name": "Fiji",
//   "dial_code": "00679",
//   "code": "FJ",
//   "path": require('../assets/Flags/Fiji.png')
// },
// {
//   "name": "Finland",
//   "dial_code": "00358",
//   "code": "FI",
//   "path": require('../assets/Flags/Finland.png')
// },
// {
//   "name": "France",
//   "dial_code": "0033",
//   "code": "FR",
//   "path": require('../assets/Flags/France.png')
// },
// {
//   "name": "French Polynesia",
//   "dial_code": "00689",
//   "code": "PF",
//   "path": require('../assets/Flags/French_Polynesia.png')
// },
// {
//   "name": "Gabon",
//   "dial_code": "00241",
//   "code": "GA",
//   "path": require('../assets/Flags/Gabon.png')
// },
// {
//   "name": "Gambia",
//   "dial_code": "00220",
//   "code": "GM",
//   "path": require('../assets/Flags/Gambia.png')
// },
// {
//   "name": "Georgia",
//   "dial_code": "00995",
//   "code": "GE",
//   "path": require('../assets/Flags/Georgia.png')
// },
// {
//   "name": "Germany",
//   "dial_code": "0049",
//   "code": "DE",
//   "path": require('../assets/Flags/Germany.png')
// },
// {
//   "name": "Ghana",
//   "dial_code": "00233",
//   "code": "GH",
//   "path": require('../assets/Flags/Ghana.png')
// },
// {
//   "name": "Gibraltar",
//   "dial_code": "00350",
//   "code": "GI",
//   "path": require('../assets/Flags/Gibraltar.png')
// },
// {
//   "name": "Greece",
//   "dial_code": "0030",
//   "code": "GR",
//   "path": require('../assets/Flags/Greece.png')
// },
// {
//   "name": "Greenland",
//   "dial_code": "00299",
//   "code": "GL",
//   "path": require('../assets/Flags/Greenland.png')
// },
// {
//   "name": "Grenada",
//   "dial_code": "001473",
//   "code": "GD",
//   "path": require('../assets/Flags/Grenada.png')
// },
// {
//   "name": "Guam",
//   "dial_code": "001671",
//   "code": "GU",
//   "path": require('../assets/Flags/Guam.png')
// },
// {
//   "name": "Guatemala",
//   "dial_code": "00502",
//   "code": "GT",
//   "path": require('../assets/Flags/Guatemala.png')
// },
// {
//   "name": "Guinea-Bissau",
//   "dial_code": "00245",
//   "code": "GW",
//   "path": require('../assets/Flags/Guinea_Bissau.png')
// },
// {
//   "name": "Guinea",
//   "dial_code": "00224",
//   "code": "GN",
//   "path": require('../assets/Flags/Guinea.png')
// },
// {
//   "name": "Guyana",
//   "dial_code": "00595",
//   "code": "GY",
//   "path": require('../assets/Flags/Guyana.png')
// },
// {
//   "name": "Haiti",
//   "dial_code": "00509",
//   "code": "HT",
//   "path": require('../assets/Flags/Haiti.png')
// },
// {
//   "name": "Honduras",
//   "dial_code": "00504",
//   "code": "HN",
//   "path": require('../assets/Flags/Honduras.png')
// },
// {
//   "name": "Hong Kong",
//   "dial_code": "00852",
//   "code": "HK",
//   "path": require('../assets/Flags/Hong_Kong.png')
// },
// {
//   "name": "Hungary",
//   "dial_code": "0036",
//   "code": "HU",
//   "path": require('../assets/Flags/Hungary.png')
// },
// {
//   "name": "Iceland",
//   "dial_code": "00354",
//   "code": "IS",
//   "path": require('../assets/Flags/Iceland.png')
// },
// {
//   "name": "India",
//   "dial_code": "0091",
//   "code": "IN",
//   "path": require('../assets/Flags/India.png')
// },
// {
//   "name": "Indonesia",
//   "dial_code": "0062",
//   "code": "ID",
//   "path": require('../assets/Flags/Indonesia.png')
// },
// {
//   "name": "Iran",
//   "dial_code": "0098",
//   "code": "IR",
//   "path": require('../assets/Flags/Iran.png')
// },
// {
//   "name": "Iraq",
//   "dial_code": "00964",
//   "code": "IQ",
//   "path": require('../assets/Flags/Iraq.png')
// },
// {
//   "name": "Ireland",
//   "dial_code": "00353",
//   "code": "IE",
//   "path": require('../assets/Flags/Ireland.png')
// },
// {
//   "name": "Israel",
//   "dial_code": "00972",
//   "code": "IL",
//   "path": require('../assets/Flags/Israel.png')
// },
// {
//   "name": "Italy",
//   "dial_code": "0039",
//   "code": "IT",
//   "path": require('../assets/Flags/Italy.png')
// },
// {
//   "name": "Jamaica",
//   "dial_code": "001876",
//   "code": "JM",
//   "path": require('../assets/Flags/Jamaica.png')
// },
// {
//   "name": "Japan",
//   "dial_code": "0081",
//   "code": "JP",
//   "path": require('../assets/Flags/Japan.png')
// },
// {
//   "name": "Jordan",
//   "dial_code": "00962",
//   "code": "JO",
//   "path": require('../assets/Flags/Jordan.png')
// },
// {
//   "name": "Kazakhstan",
//   "dial_code": "0077",
//   "code": "KZ",
//   "path": require('../assets/Flags/Kazakhstan.png')
// },
// {
//   "name": "Kenya",
//   "dial_code": "00254",
//   "code": "KE",
//   "path": require('../assets/Flags/Kenya.png')
// },
// {
//   "name": "Kiribati",
//   "dial_code": "00686",
//   "code": "KI",
//   "path": require('../assets/Flags/Kiribati.png')
// },
// {
//   "name": "Kuwait",
//   "dial_code": "00965",
//   "code": "KW",
//   "path": require('../assets/Flags/Kuwait.png')
// },
// {
//   "name": "Kyrgyzstan",
//   "dial_code": "00996",
//   "code": "KG",
//   "path": require('../assets/Flags/Kyrgyzstan.png')
// },
// {
//   "name": "Laos",
//   "dial_code": "00856",
//   "code": "LA",
//   "path": require('../assets/Flags/Laos.png')
// },
// {
//   "name": "Latvia",
//   "dial_code": "00371",
//   "code": "LV",
//   "path": require('../assets/Flags/Latvia.png')
// },
// {
//   "name": "Lebanon",
//   "dial_code": "00961",
//   "code": "LB",
//   "path": require('../assets/Flags/Lebanon.png')
// },
// {
//   "name": "Lesotho",
//   "dial_code": "00266",
//   "code": "LS",
//   "path": require('../assets/Flags/Lesotho.png')
// },
// {
//   "name": "Liberia",
//   "dial_code": "00231",
//   "code": "LR",
//   "path": require('../assets/Flags/Liberia.png')
// },
// {
//   "name": "Libya",
//   "dial_code": "00218",
//   "code": "LY",
//   "path": require('../assets/Flags/Libya.png')
// },
// {
//   "name": "Liechtenstein",
//   "dial_code": "00423",
//   "code": "LI",
//   "path": require('../assets/Flags/Liechtenstein.png')
// },
// {
//   "name": "Lithuania",
//   "dial_code": "00370",
//   "code": "LT",
//   "path": require('../assets/Flags/Lithuania.png')
// },
// {
//   "name": "Luxembourg",
//   "dial_code": "00352",
//   "code": "LU",
//   "path": require('../assets/Flags/Luxembourg.png')
// },
// {
//   "name": "Macao",
//   "dial_code": "00853",
//   "code": "MO",
//   "path": require('../assets/Flags/Macao.png')
// },
// {
//   "name": "Macedonia",
//   "dial_code": "00389",
//   "code": "MK",
//   "path": require('../assets/Flags/Macedonia.png')
// },
// {
//   "name": "Madagascar",
//   "dial_code": "00261",
//   "code": "MG",
//   "path": require('../assets/Flags/Madagascar.png')
// },
// {
//   "name": "Malawi",
//   "dial_code": "00265",
//   "code": "MW",
//   "path": require('../assets/Flags/Malawi.png')
// },
// {
//   "name": "Malaysia",
//   "dial_code": "0060",
//   "code": "MY",
//   "path": require('../assets/Flags/Malaysia.png')
// },
// {
//   "name": "Maldives",
//   "dial_code": "00960",
//   "code": "MV",
//   "path": require('../assets/Flags/Maldives.png')
// },
// {
//   "name": "Mali",
//   "dial_code": "00223",
//   "code": "ML",
//   "path": require('../assets/Flags/Mali.png')
// },
// {
//   "name": "Malta",
//   "dial_code": "00356",
//   "code": "MT",
//   "path": require('../assets/Flags/Malta.png')
// },
// {
//   "name": "Marshall Islands",
//   "dial_code": "00692",
//   "code": "MH",
//   "path": require('../assets/Flags/Marshall_Islands.png')
// },
// {
//   "name": "Martinique",
//   "dial_code": "00596",
//   "code": "MQ",
//   "path": require('../assets/Flags/Martinique.png')
// },
// {
//   "name": "Mauritania",
//   "dial_code": "00222",
//   "code": "MR",
//   "path": require('../assets/Flags/Mauritania.png')
// },
// {
//   "name": "Mauritius",
//   "dial_code": "00230",
//   "code": "MU",
//   "path": require('../assets/Flags/Mauritius.png')
// },
// {
//   "name": "Mexico",
//   "dial_code": "0052",
//   "code": "MX",
//   "path": require('../assets/Flags/Mexico.png')
// },
// {
//   "name": "Micronesia",
//   "dial_code": "00691",
//   "code": "FM",
//   "path": require('../assets/Flags/Micronesia.png')
// },
// {
//   "name": "Moldova",
//   "dial_code": "00373",
//   "code": "MD",
//   "path": require('../assets/Flags/Moldova.png')
// },
// {
//   "name": "Monaco",
//   "dial_code": "00377",
//   "code": "MC",
//   "path": require('../assets/Flags/Monaco.png')
// },
// {
//   "name": "Mongolia",
//   "dial_code": "00976",
//   "code": "MN",
//   "path": require('../assets/Flags/Mongolia.png')
// },
// {
//   "name": "Montserrat",
//   "dial_code": "001664",
//   "code": "MS",
//   "path": require('../assets/Flags/Montserrat.png')
// },
// {
//   "name": "Morocco",
//   "dial_code": "00212",
//   "code": "MA",
//   "path": require('../assets/Flags/Morocco.png')
// },
// {
//   "name": "Mozambique",
//   "dial_code": "00258",
//   "code": "MZ",
//   "path": require('../assets/Flags/Mozambique.png')
// },
// {
//   "name": "Myanmar",
//   "dial_code": "0095",
//   "code": "MM",
//   "path": require('../assets/Flags/Myanmar.png')
// },
// {
//   "name": "Namibia",
//   "dial_code": "00264",
//   "code": "NA",
//   "path": require('../assets/Flags/Namibia.png')
// },
// {
//   "name": "Nauru",
//   "dial_code": "00674",
//   "code": "NR",
//   "path": require('../assets/Flags/Nauru.png')
// },
// {
//   "name": "Nepal",
//   "dial_code": "00977",
//   "code": "NP",
//   "path": require('../assets/Flags/Nepal.png')
// },
// {
//   "name": "Netherlands Antilles",
//   "dial_code": "00599",
//   "code": "AN",
//   "path": require('../assets/Flags/Netherlands_Antilles.png')
// },
// {
//   "name": "Netherlands",
//   "dial_code": "0031",
//   "code": "NL",
//   "path": require('../assets/Flags/Netherlands.png')
// },
// {
//   "name": "New Zealand",
//   "dial_code": "0064",
//   "code": "NZ",
//   "path": require('../assets/Flags/New_Zealand.png')
// },
// {
//   "name": "Nicaragua",
//   "dial_code": "00505",
//   "code": "NI",
//   "path": require('../assets/Flags/Nicaragua.png')
// },
// {
//   "name": "Niger",
//   "dial_code": "00227",
//   "code": "NE",
//   "path": require('../assets/Flags/Niger.png')
// },
// {
//   "name": "Nigeria",
//   "dial_code": "00234",
//   "code": "NG",
//   "path": require('../assets/Flags/Nigeria.png')
// },
// {
//   "name": "Niue",
//   "dial_code": "00683",
//   "code": "NU",
//   "path": require('../assets/Flags/Niue.png')
// },
// {
//   "name": "Norfolk Island",
//   "dial_code": "00672",
//   "code": "NF",
//   "path": require('../assets/Flags/Norfolk_Island.png')
// },
// {
//   "name": "Norway",
//   "dial_code": "0047",
//   "code": "NO",
//   "path": require('../assets/Flags/Norway.png')
// },
// {
//   "name": "Oman",
//   "dial_code": "00968",
//   "code": "OM",
//   "path": require('../assets/Flags/Oman.png')
// },
// {
//   "name": "Pakistan",
//   "dial_code": "0092",
//   "code": "PK",
//   "path": require('../assets/Flags/Pakistan.png')
// },
// {
//   "name": "Palau",
//   "dial_code": "00680",
//   "code": "PW",
//   "path": require('../assets/Flags/Palau.png')
// },
// {
//   "name": "Panama",
//   "dial_code": "00507",
//   "code": "PA",
//   "path": require('../assets/Flags/Panama.png')
// },
// {
//   "name": "Papua New Guinea",
//   "dial_code": "00675",
//   "code": "PG",
//   "path": require('../assets/Flags/Papua_New_Guinea.png')
// },
// {
//   "name": "Paraguay",
//   "dial_code": "00595",
//   "code": "PY",
//   "path": require('../assets/Flags/Paraguay.png')
// },
// {
//   "name": "Peru",
//   "dial_code": "0051",
//   "code": "PE",
//   "path": require('../assets/Flags/Peru.png')
// },
// {
//   "name": "Philippines",
//   "dial_code": "0063",
//   "code": "PH",
//   "path": require('../assets/Flags/Philippines.png')
// },
// {
//   "name": "Pitcairn Islands",
//   "dial_code": "00872",
//   "code": "PN",
//   "path": require('../assets/Flags/Pitcairn_Islands.png')
// },
// {
//   "name": "Poland",
//   "dial_code": "0048",
//   "code": "PL",
//   "path": require('../assets/Flags/Poland.png')
// },
// {
//   "name": "Portugal",
//   "dial_code": "00351",
//   "code": "PT",
//   "path": require('../assets/Flags/Portugal.png')
// },
// {
//   "name": "Puerto Rico",
//   "dial_code": "001939",
//   "code": "PR",
//   "path": require('../assets/Flags/Puerto_Rico.png')
// },
// {
//   "name": "Qatar",
//   "dial_code": "00974",
//   "code": "QA",
//   "path": require('../assets/Flags/Qatar.png')
// },
// {
//   "name": "Romania",
//   "dial_code": "0040",
//   "code": "RO",
//   "path": require('../assets/Flags/Romania.png')
// },
// {
//   "name": "Russia",
//   "dial_code": "007",
//   "code": "RU",
//   "path": require('../assets/Flags/Russia.png')
// },
// {
//   "name": "Rwanda",
//   "dial_code": "00250",
//   "code": "RW",
//   "path": require('../assets/Flags/Rwanda.png')
// },
// {
//   "name": "Saint Kitts and Nevis",
//   "dial_code": "001869",
//   "code": "KN",
//   "path": require('../assets/Flags/Saint_Kitts_and_Nevis.png')
// },
// {
//   "name": "Saint Lucia",
//   "dial_code": "001758",
//   "code": "LC",
//   "path": require('../assets/Flags/Saint_Lucia.png')
// },
// {
//   "name": "Saint Pierre",
//   "dial_code": "00508",
//   "code": "PM",
//   "path": require('../assets/Flags/Saint_Pierre.png')
// },
// {
//   "name": "Saint Vincent and the Grenadines",
//   "dial_code": "001784",
//   "code": "VC",
//   "path": require('../assets/Flags/Saint_Vincent_and_the_Grenadines.png')
// },
// {
//   "name": "Samoa",
//   "dial_code": "00685",
//   "code": "WS",
//   "path": require('../assets/Flags/Samoa.png')
// },
// {
//   "name": "San Marino",
//   "dial_code": "00378",
//   "code": "SM",
//   "path": require('../assets/Flags/San_Marino.png')
// },
// {
//   "name": "Sao Tomé and Principe",
//   "dial_code": "00239",
//   "code": "ST",
//   "path": require('../assets/Flags/Sao_Tome_and_Principe.png')
// },
// {
//   "name": "Saudi Arabia",
//   "dial_code": "00966",
//   "code": "SA",
//   "path": require('../assets/Flags/Saudi_Arabia.png')
// },
// {
//   "name": "Senegal",
//   "dial_code": "00221",
//   "code": "SN",
//   "path": require('../assets/Flags/Senegal.png')
// },
// {
//   "name": "Serbia",
//   "dial_code": "00381",
//   "code": "RS",
//   "path": require('../assets/Flags/Serbia.png')
// },
// {
//   "name": "Seychelles",
//   "dial_code": "00248",
//   "code": "SC",
//   "path": require('../assets/Flags/Seychelles.png')
// },
// {
//   "name": "Sierra Leone",
//   "dial_code": "00232",
//   "code": "SL",
//   "path": require('../assets/Flags/Sierra_Leone.png')
// },
// {
//   "name": "Singapore",
//   "dial_code": "0065",
//   "code": "SG",
//   "path": require('../assets/Flags/Singapore.png')
// },
// {
//   "name": "Slovakia",
//   "dial_code": "00421",
//   "code": "SK",
//   "path": require('../assets/Flags/Slovakia.png')
// },
// {
//   "name": "Slovenia",
//   "dial_code": "00386",
//   "code": "SI",
//   "path": require('../assets/Flags/Slovenia.png')
// },
// {
//   "name": "Solomon Islands",
//   "dial_code": "00677",
//   "code": "SB",
//   "path": require('../assets/Flags/Solomon_Islands.png')
// },
// {
//   "name": "Somalia",
//   "dial_code": "00252",
//   "code": "SO",
//   "path": require('../assets/Flags/Somalia.png')
// },
// {
//   "name": "South Africa",
//   "dial_code": "0027",
//   "code": "ZA",
//   "path": require('../assets/Flags/South_Africa.png')
// },
// {
//   "name": "South Georgia",
//   "dial_code": "00500",
//   "code": "GS",
//   "path": require('../assets/Flags/South_Georgia.png')
// },
// {
//   "name": "Spain",
//   "dial_code": "0034",
//   "code": "ES",
//   "path": require('../assets/Flags/Spain.png')
// },
// {
//   "name": "Sri Lanka",
//   "dial_code": "0094",
//   "code": "LK",
//   "path": require('../assets/Flags/Sri_Lanka.png')
// },
// {
//   "name": "Sudan",
//   "dial_code": "00249",
//   "code": "SD",
//   "path": require('../assets/Flags/Sudan.png')
// },
// {
//   "name": "Suriname",
//   "dial_code": "00597",
//   "code": "SR",
//   "path": require('../assets/Flags/Suriname.png')
// },
// {
//   "name": "Swaziland",
//   "dial_code": "00268",
//   "code": "SZ",
//   "path": require('../assets/Flags/Swaziland.png')
// },
// {
//   "name": "Sweden",
//   "dial_code": "0046",
//   "code": "SE",
//   "path": require('../assets/Flags/Sweden.png')
// },
// {
//   "name": "Switzerland",
//   "dial_code": "0041",
//   "code": "CH",
//   "path": require('../assets/Flags/Switzerland.png')
// },
// {
//   "name": "Syria",
//   "dial_code": "00963",
//   "code": "SY",
//   "path": require('../assets/Flags/Syria.png')
// },
// {
//   "name": "Taiwan",
//   "dial_code": "00886",
//   "code": "TW",
//   "path": require('../assets/Flags/Taiwan.png')
// },
// {
//   "name": "Tajikistan",
//   "dial_code": "00992",
//   "code": "TJ",
//   "path": require('../assets/Flags/Tajikistan.png')
// },
// {
//   "name": "Tanzania",
//   "dial_code": "00255",
//   "code": "TZ",
//   "path": require('../assets/Flags/Tanzania.png')
// },
// {
//   "name": "Thailand",
//   "dial_code": "0066",
//   "code": "TH",
//   "path": require('../assets/Flags/Thailand.png')
// },
// {
//   "name": "Timor-Leste",
//   "dial_code": "00670",
//   "code": "TL",
//   "path": require('../assets/Flags/Timor-Leste.png')
// },
// {
//   "name": "Togo",
//   "dial_code": "00228",
//   "code": "TG",
//   "path": require('../assets/Flags/Togo.png')
// },
// {
//   "name": "Tonga",
//   "dial_code": "00676",
//   "code": "TO",
//   "path": require('../assets/Flags/Tonga.png')
// },
// {
//   "name": "Trinidad and Tobago",
//   "dial_code": "001868",
//   "code": "TT",
//   "path": require('../assets/Flags/Trinidad_and_Tobago.png')
// },
// {
//   "name": "Tunisia",
//   "dial_code": "00216",
//   "code": "TN",
//   "path": require('../assets/Flags/Tunisia.png')
// },
// {
//   "name": "Turkey",
//   "dial_code": "0090",
//   "code": "TR",
//   "path": require('../assets/Flags/Turkey.png')
// },
// {
//   "name": "Turkmenistan",
//   "dial_code": "00993",
//   "code": "TM",
//   "path": require('../assets/Flags/Turkmenistan.png')
// },
// {
//   "name": "Turks and Caicos Islands",
//   "dial_code": "001649",
//   "code": "TC",
//   "path": require('../assets/Flags/Turks_and_Caicos_Islands.png')
// },
// {
//   "name": "Tuvalu",
//   "dial_code": "00688",
//   "code": "TV",
//   "path": require('../assets/Flags/Tuvalu.png')
// },
// {
//   "name": "UAE",
//   "dial_code": "00971",
//   "code": "AE",
//   "path": require('../assets/Flags/UAE.png')
// },
// {
//   "name": "Uganda",
//   "dial_code": "00256",
//   "code": "UG",
//   "path": require('../assets/Flags/Uganda.png')
// },
// {
//   "name": "Ukraine",
//   "dial_code": "00380",
//   "code": "UA",
//   "path": require('../assets/Flags/Ukraine.png')
// },
// {
//   "name": "United Kingdom",
//   "dial_code": "0044",
//   "code": "GB",
//   "path": require('../assets/Flags/United_Kingdom.png')
// },
// {
//   "name": "United States of America",
//   "dial_code": "001",
//   "code": "US",
//   "path": require('../assets/Flags/United_States_of_America.png')
// },
// {
//   "name": "Uruguay",
//   "dial_code": "00598",
//   "code": "UY",
//   "path": require('../assets/Flags/Uruguay.png')
// },
// {
//   "name": "Uzbekistan",
//   "dial_code": "00998",
//   "code": "UZ",
//   "path": require('../assets/Flags/Uzbekistan.png')
// },
// {
//   "name": "Vanuatu",
//   "dial_code": "00678",
//   "code": "VU",
//   "path": require('../assets/Flags/Vanuatu.png')
// },
// {
//   "name": "Venezuela",
//   "dial_code": "0058",
//   "code": "VE",
//   "path": require('../assets/Flags/Venezuela.png')
// },
// {
//   "name": "Vietnam",
//   "dial_code": "0084",
//   "code": "VN",
//   "path": require('../assets/Flags/Vietnam.png')
// },
// {
//   "name": "Wallis and Futuna",
//   "dial_code": "00681",
//   "code": "WF",
//   "path": require('../assets/Flags/Wallis_and_Futuna.png')
// },
// {
//   "name": "Yemen",
//   "dial_code": "00967",
//   "code": "YE",
//   "path": require('../assets/Flags/Yemen.png')
// },
// {
//   "name": "Zambia",
//   "dial_code": "00260",
//   "code": "ZM",
//   "path": require('../assets/Flags/Zambia.png')
// },
// {
//   "name": "Zimbabwe",
//   "dial_code": "00263",
//   "code": "ZW",
//   "path": require('../assets/Flags/Zimbabwe.png')
// }
// ]
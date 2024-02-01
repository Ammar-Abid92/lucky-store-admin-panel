import { getUser, resendCode } from "../../../oscar-pos-core/actions";
import US from "../../../assets/images/United_States_of_America.png";
import SaudiArabia from "../../../assets/images/Saudi_Arabia.png";
import { BASE_URL, getCurrency } from "../../../constants";
import Pakistan from "../../../assets/images/Pakistan.png";
import Bahrain from "../../../assets/images/Bahrain.png";
import Canada from "../../../assets/images/Canada.png";
import Qatar from "../../../assets/images/Qatar.png";
import React, { useEffect, useState } from "react";
import Oman from "../../../assets/images/Oman.png";
import { Modal, Dropdown } from "react-bootstrap";
import UAE from "../../../assets/images/UAE.png";
import { analytics } from "../../../firebase";
import { Spinner } from "react-bootstrap";
import Header from "../../common/Header";
import { connect } from "react-redux";
import "./style.css";

const FLAGS = [
  {
    img: Bahrain,
    name: "Bahrain",
    code: "BH",
    dial_code: "00973",
  },
  {
    img: Canada,
    name: "Canada",
    code: "CA",
    dial_code: "001",
  },
  {
    img: Pakistan,
    name: "Pakistan",
    code: "PK",
    dial_code: "0092",
  },
  {
    img: Qatar,
    name: "Qatar",
    code: "QA",
    dial_code: "00974",
  },
  {
    img: SaudiArabia,
    name: "Saudi Arabia",
    code: "KSA",
    dial_code: "00966",
  },
  {
    img: US,
    name: "United States of America",
    code: "US",
    dial_code: "001",
  },
  {
    img: UAE,
    name: "United Arab Emirates",
    code: "UAE",
    dial_code: "00971",
  },
  {
    img: Oman,
    name: "Oman",
    code: "OM",
    dial_code: "00968",
  },
];

const Login = ({ history, user, dispatch, location }) => {
  const [phone_number, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [device, setDevice] = useState(false);
  const [errors, setErrors] = useState({});
  const [country, setCountry] = useState({
    img: Pakistan,
    name: "Pakistan",
    code: "PK",
    dial_code: "0092",
  });

  useEffect(() => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(
        navigator.userAgent
      )
    ) {
      setDevice(true);
    }
  }, []);

  const handlePhoneNumber = (text, key) => {
    setErrors(false);
    let newText = "";
    for (var i = 0; i < text.length; i++) {
      if (!isNaN(text[i]) && text[i] !== " ") {
        newText = newText + text[i];
      }
    }

    if (key == "phone_number") {
      setPhoneNumber(newText);
    }
  };

  const validateNumber = () => {
    let isValid = true;
    let err = "";

    let patt =
      country.code === "PK"
        ? /03[0-9]{2}(?!1234567)(?!1111111)(?!7654321)[0-9]{7}/
        : country.code === "KSA"
          ? /5[?!013456789]{1}[0-9]{7}/
          : country.code === "OM"
            ? /9[?!123456789]{1}[0-9]{6}/
            : country.code === "UAE"
              ? /5[?!024568]{1}[0-9]{7}/
              : /3[1-9]{1}[0-9]{6}/;

    if (!phone_number) {
      isValid = false;
      err = "Mobile Number is Required";
    }
    if (phone_number.includes(" ")) {
      isValid = false;
      err = "Phone number can not have spaces";
    }
    if (country.code === "PK") {
      if (phone_number.match(patt) === null || phone_number.length != 11) {
        isValid = false;
        err = "Mobile number should be in format e.g. 03xx1234567";
      }
    } else if (country.code === "KSA") {
      if (phone_number.match(patt) === null || phone_number.length != 9) {
        isValid = false;
        err = "Mobile number should be in format e.g. 5xxxxxxxx";
      }
    } else if (country.code === "QA") {
      if (
        (phone_number.match(/33[0-9]{6}/) === null ||
          phone_number.match(/55[0-9]{6}/) === null ||
          phone_number.match(/66[0-9]{6}/) === null ||
          phone_number.match(/77[0-9]{6}/) === null) &&
        phone_number.length != 8
      ) {
        isValid = false;
        err = "Mobile number should be in format e.g. xxxxxxxx";
      }
    } else if (country.code === "UAE") {
      if (phone_number.match(patt) === null || phone_number.length != 9) {
        isValid = false;
        err = "Mobile number should be in format e.g. 5xxxxxxxx";
      }
    } else if (country.code === "OM") {
      if (phone_number.match(patt) === null || phone_number.length != 8) {
        isValid = false;
        err = "Mobile number should be in format e.g. 9xxxxxxx";
      }
    } else if (country.code === "BH") {
      if (phone_number.match(patt) === null || phone_number.length != 8) {
        isValid = false;
        err = "Mobile number should be in format e.g. 3xxxxxxx";
      }
    } else if (country.code === "CA" && phone_number.length != 10) {
      isValid = false;
      err = "Mobile number should be in format e.g. xxxxxxxxxx";
    } else if (country.code === "US" && phone_number.length != 10) {
      isValid = false;
      err = "Mobile number should be in format e.g. xxxxxxxxxx";
    }

    if (isValid == true) return isValid;
    else return err;
  };

  const handleSignUp = (e) => {
    setLoading(true);
    e.preventDefault();
    if (validateNumber() != true) {
      setErrors({ phone: validateNumber() });
      setLoading(false);
    } else {
      const params = {
        phone_number:
          (country.code === "KSA"
            ? "+966"
            : country.code === "BH"
              ? "+973"
              : country.code === "CA"
                ? "+1"
                : country.code === "QA"
                  ? "+974"
                  : country.code === "US"
                    ? "+1"
                    : country.code === "UAE"
                      ? "+971"
                      : country.code === "OM"
                        ? "+968"
                        : "") + String(phone_number),
        voice_otp: false,
      };

      if (navigator.onLine) {
        resendCode(params, BASE_URL, false)
          .then((res) => {
            if (res.data.sent == true) {
              if (res.data.created == true) {
                analytics.logEvent('signup_request', { phone_number: params.phone_number });
              } else if (res.data.created == false) {
                analytics.logEvent('user_already_exists', { phone_number: params.phone_number });
              }
              createUserInRedux(res.data.Activation_code, params.phone_number);
            } else if (res.data.sent == false) {
              setLoading(false);
              setErrors({
                phone_number: "OTP code was not sent",
              });
              return;
            } else {
              setLoading(false);
              setErrors({
                phone_number: "Uncaught error.",
              });
              return;
            }
          })
          .catch((err) => {
            console.log("err", err);
          });
      } else {
        console.log("OFFLINE");
      }
    }
  };

  const createUserInRedux = (activation_code, number) => {
    let params = {
      phone_number: number,
      activation_code,
      country_code: country.dial_code,
      country: country.name,
      country_id: country.code,
      currency: getCurrency(country.name),
    };
    dispatch(getUser(params)).then((user) => {
      if (!user.pin) {
        history.push("/VerificationScreen");
      }
    });
  };

  const handleCountry = (item) => {
    setErrors("");
    setPhoneNumber("");
    setCountry({
      img: item.img,
      name: item.name,
      code: item.code,
      dial_code: item.dial_code,
    });
  };

  const getCountryValidation = (type) => {
    if (type == "maxLength") {
      switch (country.code) {
        case "PK":
          return 11;
        case "KSA":
          return 9;
        case "BH":
          return 8;
        case "CA":
          return 10;
        case "QA":
          return 8;
        case "US":
          return 10;
        case "UAE":
          return 9;
        case "OM":
          return 8;
        default:
          return 11;
      }
    } else if (type == "disabled") {
      switch (country.code) {
        case "PK":
          if (phone_number.length === 11) return true;
          else return false;
        case "KSA":
          if (phone_number.length === 9) return true;
          else return false;
        case "BH":
          if (phone_number.length === 8) return true;
          else return false;
        case "CA":
          if (phone_number.length === 10) return true;
          else return false;
        case "QA":
          if (phone_number.length === 8) return true;
          else return false;
        case "US":
          if (phone_number.length === 10) return true;
          else return false;
        case "UAE":
          if (phone_number.length === 9) return true;
          else return false;
        case "OM":
          if (phone_number.length === 8) return true;
          else return false;
        default:
          return false;
      }
    }
  };

  const handlePhone = (value) => {
    if (/^[0-9]+$/.test(+value)) {
      setErrors("");
      if (+value >= 0) {
        setPhoneNumber(value);
      } else {
        setPhoneNumber("");
      }
    }
  };

  return (
    <>
      <Header />
      <section className="body_Content_Section">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="backIconMain">
              <a href="https://home.toko.pk/">
                <span>
                  <svg
                    fill="var(--lightGray)"
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                  >
                    <path
                      fill=""
                      d="M8.593,12.534l9.215-9.197c0.188-0.185,0.372-0.366,0.543-0.557c0.205-0.226,0.281-0.507,0.209-0.756
                                        c-0.079-0.278-0.305-0.489-0.608-0.577c-0.088-0.025-0.166-0.038-0.234-0.038c-0.077,0-0.281,0-0.614,0.334l-10.8,10.788
                                        c1.255,1.251,3.804,3.803,6.127,6.128c2.305,2.308,4.387,4.39,4.754,4.753c0.267,0.265,0.5,0.333,0.931,0.205
                                        c0.331-0.108,0.498-0.316,0.538-0.69c0.024-0.296-0.163-0.532-0.371-0.74L8.593,12.534z"
                    />
                  </svg>
                </span>
              </a>
            </div>
            <div className="col-sm-3">
              <div className="agentImage">
                <span className="avatar_img med"></span>
              </div>
            </div>
            <div className="col-sm-12">
              <div className="login_page_top_content mainPage">
                <h1>
                  Hey! I’m Nikki.
                  <br /> Let's set up your free online store in 2 minutes{" "}
                </h1>
              </div>
              <div className="loginPageSubHeading">
                <p>What's your mobile number?</p>
                <p>We will send you a verification code</p>
              </div>
            </div>

            <div className="col-sm-5">
              <div className="newCardBox">
                <div className="login_page_form_section">
                  <form
                    className="DeliveryFormMain"
                    onSubmit={(e) => {
                      if (loading) return;
                      else handleSignUp(e);
                    }}
                  >
                    <div className="DeliveryFormInputContainer loginForm">
                      <div className="flagDropDownandInput">
                        <div className="flagDropDown">
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="success"
                              id="dropdown-basic"
                            >
                              <img src={country.img} />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              {FLAGS.map((item, index) => {
                                return (
                                  <Dropdown.Item key={index}>
                                    <div
                                      className="flagDropdownList"
                                      onClick={() => handleCountry(item)}
                                    >
                                      <img src={item.img} />
                                      <p>{item.name}</p>
                                      {country.code === item.code ? (
                                        <span className="countrySelectCheckmark"></span>
                                      ) : null}
                                    </div>
                                  </Dropdown.Item>
                                );
                              })}
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div className="flagDropDownRight">
                          <div className="flagDropSeperator"></div>
                          {country.code !== "PK" ? (
                            <span className="textStyling16 mediumGrayColor flagPrependText">
                              +
                              {country.code === "KSA"
                                ? "966"
                                : country.code === "BH"
                                  ? "973"
                                  : country.code === "CA"
                                    ? "1"
                                    : country.code === "QA"
                                      ? "974"
                                      : country.code === "US"
                                        ? "1"
                                        : country.code === "UAE"
                                          ? "971"
                                          : country.code === "OM"
                                            ? "968"
                                            : "92"}
                            </span>
                          ) : null}
                          <input
                            preventAutoFocus={true}
                            className={
                              country.code !== "PK" ? "prependtextAdd" : ""
                            }
                            name="mobile"
                            placeholder={
                              country.code === "KSA"
                                ? "5xxxxxxxx"
                                : country.code === "BH"
                                  ? "3xxxxxxx"
                                  : country.code === "CA"
                                    ? "xxxxxxxxxx"
                                    : country.code === "QA"
                                      ? "xxxxxxxx"
                                      : country.code === "US"
                                        ? "xxxxxxxxxx"
                                        : country.code === "UAE"
                                          ? "5xxxxxxxx"
                                          : country.code === "OM"
                                            ? "9xxxxxxx"
                                            : "03xxxxxxxxx"
                            }
                            maxLength={getCountryValidation("maxLength")}
                            autocomplete="off"
                            autoFocus={true}
                            // ref={focsuRef}
                            required
                            type="tel"
                            value={phone_number}
                            onChange={(e) => handlePhone(e.target.value)}
                            inputMode="numeric"
                          />
                        </div>
                      </div>
                      {errors.phone ? (
                        <p className="inputErrorPara textCenter">
                          {errors.phone}
                        </p>
                      ) : (
                        <p className="inputErrorPara"></p>
                      )}
                      <div className="loginOtpButonMain">
                        <button
                          type="submit"
                          className={
                            getCountryValidation("disabled")
                              ? "login_btn_next"
                              : "login_btn_next login_disable"
                          }
                          disabled={loading}
                        >
                          {loading ? (
                            <Spinner
                              className="loaderCircle Products"
                              animation="border"
                              role="status"
                            ></Spinner>
                          ) : (
                            "Next"
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal
        className="modalMainConts"
        show={device}
        onHide={() => setDevice(false)}
        keyboard={false}
        centered
        dialogClassName={"animate-bottom selectNetworModal"}
      >
        <div className="modalInnerCont">
          <div className="modalHeader">
            <p className="headerleftSide">DEVICE ALERT</p>
            <p className="headerRightSide" onClick={() => setDevice(false)}>
              <span>
                <svg
                  fill="#3B0C36"
                  height="20"
                  width="20"
                  viewBox="0 0 50 50"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#575757"
                    d="M23.351,25.488L10.163,38.675c-0.589,0.593-0.589,1.554,0.002,2.146c0.253,0.255,0.646,0.398,1.077,0.398
                                            h0.002c0.428,0,0.817-0.144,1.068-0.396l13.19-13.188l13.188,13.188c0.535,0.536,1.611,0.534,2.146,0.001
                                            c0.286-0.285,0.443-0.666,0.443-1.072c-0.004-0.406-0.159-0.79-0.445-1.078L27.646,25.49L40.835,12.3
                                            c0.284-0.285,0.444-0.666,0.444-1.073c0-0.405-0.16-0.786-0.446-1.073c-0.504-0.503-1.642-0.503-2.138-0.002L25.502,23.341
                                            L12.307,10.154c-0.503-0.506-1.638-0.505-2.142,0c-0.288,0.287-0.444,0.669-0.444,1.074c0,0.406,0.157,0.787,0.442,1.07
                                            L23.351,25.488z"
                  />
                </svg>
              </span>
            </p>
          </div>
          <div className="container-fluid">
            <div className="row justify-content-md-center">
              <div className="deviceAlertContent">
                <p>This feature only for the Desktop</p>
                <p>DOWNLOAD THE APP</p>
              </div>
              <div className="downloadButton">
                <button
                  className="googlePlay"
                  onClick={() =>
                    window.open(
                      "https://play.google.com/store/apps/details?id=com.selltoko"
                    )
                  }
                >
                  <i classNamegooglePlay></i>
                </button>
                <button
                  className="appStore"
                  onClick={() =>
                    window.open(
                      "https://apps.apple.com/us/app/toko-build-free-online-store/id1547422230"
                    )
                  }
                >
                  <i appStore></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default connect((state) => {
  return {
    user: state.user,
  };
})(Login);

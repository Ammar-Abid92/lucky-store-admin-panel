import { getUser } from "../../../oscar-pos-core/actions";
import { getCurrency } from "../../../constants";
import Pakistan from "../../../assets/images/Pakistan.png";
import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import Header from "../../common/Header";
import { connect } from "react-redux";
import "./style.css";
import firebase from "../../../firebase";
import { message } from 'antd';

const Login = ({ history, dispatch }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [verificationCode, setVerificationCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);

  const country = {
    code: "PK",
    name: "Pakistan",
    dial_code: "0092"
  }

  const validateNumber = () => {
    let isValid = true;
    let err = "";

    let patt = /^\+92\d{10}$/;

    if (!phoneNumber) {
      isValid = false;
      err = "Mobile Number is Required";
    }
    if (phoneNumber.includes(" ")) {
      isValid = false;
      err = "Phone number can not have spaces";
    }
    if (country.code === "PK") {
      if (phoneNumber.match(patt) === null || phoneNumber.length != 13) {
        isValid = false;
        err = "Mobile number should be in format e.g. +923xx1234567";
      }
    }
    if (isValid == true) return isValid;
    else return err;
  };

  const handleSendCode = async () => {
    try {
      const appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
      const confirmation = await firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier);
      confirmation && setConfirmationResult(confirmation);
    } catch (error) {
      message.error('Some Error Occurred. Please Try Again!');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  const handleVerifyCode = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      if (verificationCode.length === 6) {
        const isCodeVerified = await confirmationResult.confirm(verificationCode);
        if (isCodeVerified) {
          localStorage.setItem('userConfirmation', JSON.stringify(confirmationResult));
          setLoading(false);
          message.success('Logged In Successfully!');
        }
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (validateNumber() != true) {
      setErrors({ phone: validateNumber() });
      setLoading(false);
    } else {
      if (navigator.onLine) {
        handleSendCode();
        setLoading(false);
      } else {
        console.log("OFFLINE");
      }
    }
  };

  const createUserInRedux = (activation_code, number) => {
    let params = {
      phoneNumber: number,
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

  const getCountryValidation = (type) => {
    if (type == "maxLength") {
      return 13;
    } else if (type == "disabled") {
      if (phoneNumber.length === 13 && phoneNumber.match(/^\+92\d{10}$/)) return true;
    }
  };

  const handlePhone = (value) => {
    setPhoneNumber(value);
  };

  return (
    <>
      <Header />
      <section className="body_Content_Section">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-sm-12">
              <div className="login_page_top_content mainPage">
                <h1>
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
                      else handleLogin(e);
                    }}
                  >
                    {!confirmationResult ?
                      <div className="DeliveryFormInputContainer loginForm">
                        <div className="flagImgAndInput">
                          <div className="flagImg">
                            <img src={Pakistan} alt="" />
                          </div>
                          <div className="flagDropDownRight">
                            <div className="flagDropSeperator"></div>
                            <input
                              className={
                                country.code !== "PK" ? "prependtextAdd" : ""
                              }
                              name="mobile"
                              placeholder="+923xx1234567"
                              maxLength={getCountryValidation("maxLength")}
                              autoComplete="off"
                              autoFocus={true}
                              required
                              type="text"
                              value={phoneNumber}
                              onChange={(e) => handlePhone(e.target.value)}
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
                        <div id="recaptcha-container"></div>
                      </div>
                      :
                      <div className={'otpVerificationContainer'}>
                        <input type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} placeholder="Enter a 6 digit OTP Code" />
                        {!loading ? <button onClick={handleVerifyCode} className={confirmationResult && verificationCode.length === 6 ? 'verifyCodeBtnEnabled' : 'verifyCodeBtnDisabled'}>Verify Code</button> :
                          <span style={{ marginTop: '10px' }}>
                            <Spinner
                              className="loaderCircle verficatoinSpin"
                              animation="border"
                              role="status"
                            ></Spinner>
                          </span>
                        }
                      </div>
                    }
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default connect((state) => {
  return {
    user: state.user,
  };
})(Login);

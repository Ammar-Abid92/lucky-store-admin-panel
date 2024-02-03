import { getUser, resendCode } from "../../../oscar-pos-core/actions";
import { BASE_URL, getCurrency } from "../../../constants";
import Pakistan from "../../../assets/images/Pakistan.png";
import React, { useEffect, useRef, useState } from "react";
import { Modal, Dropdown } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import Header from "../../common/Header";
import { connect } from "react-redux";
import "./style.css";
import firebase from "../../../firebase";
import OtpInput from "react-otp-input";


const Login = ({ history, user, dispatch, location }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [device, setDevice] = useState(false);
  const [errors, setErrors] = useState({});

  const [verificationCode, setVerificationCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);

  const DURATION = "59";

  const [showResendCode, setShowResendCode] = useState(false);
  const [invalidCode, setInvalidCode] = useState(false);
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const OtpInputRef = useRef();

  useEffect(() => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(
        navigator.userAgent
      )
    ) {
      setDevice(true);
    }
  }, []);

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
      console.error('Error sending code:', error);
    }
  };

  const handleVerifyCode = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      console.log('code', verificationCode)
      if (verificationCode.length === 6) {
        const isCodeVerified = await confirmationResult.confirm(verificationCode);
        if (isCodeVerified) {
          console.log('Phone number verified successfully!');
          localStorage.setItem('userConfirmation', JSON.stringify(confirmationResult));
          setLoading(false);
        }
        // history.push('/Home');
        window.location.reload();
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
                      else handleLogin(e);
                    }}
                  >
                    {!confirmationResult &&
                      <>
                        <div className="DeliveryFormInputContainer loginForm">
                          <div className="flagImgAndInput">
                            <div className="flagImg">
                              <img src={Pakistan} alt="" />
                            </div>
                            <div className="flagDropDownRight">
                              <div className="flagDropSeperator"></div>
                              <input
                                preventAutoFocus={true}
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
                        </div>
                        <div id="recaptcha-container"></div>
                      </>
                    }
                    {confirmationResult && <div className={'otpVerificationContainer'}>
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

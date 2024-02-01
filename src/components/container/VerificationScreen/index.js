import tElenor from "../../../assets/images/Telenor.png";
import { analytics, getToken } from "../../../firebase";
import sCom from "../../../assets/images/SCO-Logo.png";
import uFone from "../../../assets/images/Ufone.png";
import zOng from "../../../assets/images/zong.png";
import jAzz from "../../../assets/images/Jazz.png";
import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../../constants";
import { Spinner } from "react-bootstrap";
import Header from "../../common/Header";
import { Modal } from "react-bootstrap";
import OtpInput from "react-otp-input";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import { useRef } from "react";
import "./style.css";
import {
  updateDukaanUserToCloud,
  resendCode,
  updateUser,
  getUser,
  login,
} from "../../../oscar-pos-core/actions";

const DURATION = "59";

const VerificationScreen = ({ history, user, dispatch }) => {
  const [showResendCode, setShowResendCode] = useState(false);
  const [networkModal, setNetworkModal] = useState(false);
  const [invalidCode, setInvalidCode] = useState(false);
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [loading, setLoading] = useState(false);
  const [telenor, setTelenor] = useState(false);
  const [ufone, setUfone] = useState(false);
  const [zong, setZong] = useState(false);
  const [jazz, setJazz] = useState(false);
  const [scom, setScom] = useState(false);
  const [code, setCode] = useState("");
  const OtpInputRef = useRef();

  useEffect(() => {
    if (!timeLeft) return;
    const intervalId = setInterval(() => {
      if (timeLeft == 1) {
        setShowResendCode(true);
      } else if (timeLeft < 11) {
        setTimeLeft(("0" + (timeLeft - 1)).toString());
      } else {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const sendCode = (telco, voice_otp) => {
    analytics.logEvent('resend_code',);

    let params = {
      phone_number: user.phone_number.toString(),
      telco: telco ? telco : null,
      voice_otp: voice_otp ? voice_otp : false,
    };
    resendCode(params, BASE_URL, true)
      .then((resp) => {
        let userObj = { ...user };
        userObj["activation_code"] = resp.data.Activation_code.toString();
        dispatch(updateUser(userObj))
          .then((response) => {
            setTimeLeft(DURATION);
            setShowResendCode(false);
            setInvalidCode(false);
            setCode("");
          })
          .catch((err) => {
            console.log("catch user updated from resendCode: ", err);
          });
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };

  const checkNetwork = (network) => {
    if (network === "Jazz") {
      setJazz(true);
    }
    if (network === "Telenor") {
      setTelenor(true);
    }
    if (network === "Ufone") {
      setUfone(true);
    }
    if (network === "Zong") {
      setZong(true);
    }
    if (network === "Scom") {
      setScom(true);
    }
    setShowResendCode(false);
    OtpInputRef.current.focusInput(0);
    setTimeLeft(DURATION);
    sendCode(network, true);
    setInvalidCode(false);

    network !== "Jazz" && setJazz(false);
    network !== "Telenor" && setTelenor(false);
    network !== "Ufone" && setUfone(false);
    network !== "Zong" && setZong(false);
    network !== "Scom" && setScom(false);

    setNetworkModal(!networkModal);
  };

  const updateUserInRedux = (params) => {
    try {
      return new Promise((resolve, reject) => {
        dispatch(updateUser(params)).then((user) => {
          console.log("redux user -->", user);
          resolve(params);
        });
      });
    } catch (e) {
      console.log("Error in: ", e);
    }
  };

  const handleChange = async (otp) => {
    analytics.logEvent('entering_code');
    setInvalidCode(false);
    setCode(otp);

    if (otp.length == 4) {
      setLoading(true);
      const fcmToken = await getToken();
      let obj = {
        activation_code: otp,
        phone_number: user.phone_number,
        device_token: fcmToken,
      };
      login(obj, BASE_URL)
        .then((res) => {
          if (res.data.status == false) {
            setInvalidCode("Invalid code");
            OtpInputRef.current.focusInput(0);
            setLoading(false);
            setCode("");
            return;
          } else {
            analytics.logEvent('correct_code', { code: otp });
            Cookies.set("token", res.data.token);
            // createUserInRedux(res.data.data).then(res => {
            //     if (!res.vanity_url) {
            //         history.push('/AddBusinessDetails');
            //     } else {
            //         history.push('/Home')
            //     }
            // }).catch(err => {
            //     console.log('err', err);
            //     return;
            // })

            if (res.data.data.country) {
              res.data.data.currency = user.currency;

              updateUserInRedux(res.data.data).then((res) => {
                if (!res.vanity_url) {
                  history.push("/AddBusinessDetails");
                } else {
                  analytics.logEvent('login_successful');
                  history.push("/Home");
                }
              });
            } else {
              let params = {
                country: user.country_id,
              };
              res.data.data.currency = user.currency;
              res.data.data.country = user.country_id;

              updateDukaanUserToCloud(params, BASE_URL)
                .then((upd_res) => {
                  updateUserInRedux(res.data.data).then((res) => {
                    if (!res.vanity_url) {
                      history.push("/AddBusinessDetails");
                    } else {
                      analytics.logEvent('login_successful');
                      history.push("/Home");
                    }
                  });
                })
                .catch((err) => console.log("update country Error:", err));
            }
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log("error from validateOTP: ", error);
        });
    }
  };

  const createUserInRedux = (params) => {
    return new Promise((resolve, reject) => {
      dispatch(getUser(params)).then((user) => {
        resolve(params);
      });
    });
  };

  return (
    <>
      <Header />
      <section className="body_Content_Section verficationSection">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="backIconMain">
              <span onClick={() => history.goBack()}>
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
            </div>
            <div className="col-sm-3">
              <div className="agentImage">
                <span className="avatar_img med"></span>
              </div>
            </div>
            <div className="col-sm-12">
              <div className="login_page_top_content">
                <h1>
                  Verify <br />
                  <b>
                    {user && user.phone_number
                      ? user.country_code === "0092"
                        ? "+92" + user.phone_number.replace(/^.{1}/g, "")
                        : user.phone_number
                      : ""}
                  </b>
                </h1>
                <p className="displayNone">Waiting to auto detect OTP code</p>
              </div>
            </div>

            <div className="col-sm-5">
              <div className="veirficationCardBox">
                <div className="verificationInputMainCont">
                  <p className="enterDigitTex">Enter 4 Digits Code</p>
                  <div className="verificationInputInnerMain">
                    <OtpInput
                      shouldAutoFocus={true}
                      containerStyle={{ width: "75%" }}
                      className="verificationInputInnerCont"
                      value={code}
                      onChange={handleChange}
                      numInputs={4}
                      isInputNum={true}
                      ref={(e) => (OtpInputRef.current = e)}
                    />
                  </div>
                  {invalidCode ? (
                    <p className="invaliOtpCode">{invalidCode}</p>
                  ) : (
                    <p className="invaliOtpCode"></p>
                  )}
                </div>
                {showResendCode == false ? (
                  <div className="waitingForCode">
                    <p className="waitingCodeTex">
                      Waiting for Code: 00:{timeLeft}
                    </p>
                  </div>
                ) : (
                  <div className="waitingForCode">
                    <p className="waitingCodeTex">Did not receive code?</p>
                  </div>
                )}
                <div className="verificationActionSectiion">
                  <button
                    type="submit"
                    className={
                      !showResendCode || loading
                        ? "verification_btn verification_disable"
                        : "verification_btn"
                    }
                    disabled={showResendCode && !loading ? false : true}
                    onClick={() => setNetworkModal(!networkModal)}
                  >
                    {loading ? null : (
                      <span
                        className={
                          showResendCode == true
                            ? "resendIcon"
                            : "resendIcon_white"
                        }
                      >
                        <svg
                          fill="var(--lightGray)"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                        >
                          <g>
                            <path
                              fill=""
                              d="M8.049,22.949c-1.269,0-2.265-0.996-2.265-2.268v-2.106H4.979c-1.942,0-3.521-1.581-3.521-3.522V5.937
                                                    c0-1.942,1.579-3.523,3.521-3.523h15.119c1.916,0,3.475,1.581,3.475,3.523v9.116c0,1.941-1.578,3.522-3.52,3.522h-6.922
                                                    l-3.444,3.659C9.246,22.697,8.666,22.949,8.049,22.949z M4.978,3.965c-1.083,0-1.967,0.884-1.967,1.971v9.116
                                                    c0,1.084,0.884,1.968,1.967,1.968h2.358v3.662c0,0.465,0.367,0.715,0.711,0.715c0.135,0,0.329-0.039,0.509-0.229l3.902-4.148
                                                    h7.593c1.085,0,1.969-0.881,1.969-1.968V5.937c0-1.105-0.845-1.971-1.922-1.971L4.978,3.965L4.978,3.965z"
                            />
                          </g>
                          <g>
                            <circle fill="" cx="7.549" cy="10.48" r="1.678" />
                            <circle fill="" cx="12.515" cy="10.48" r="1.677" />
                            <circle fill="" cx="17.482" cy="10.48" r="1.678" />
                            <circle fill="" cx="7.516" cy="10.48" r="1.688" />
                            <circle fill="" cx="12.515" cy="10.48" r="1.689" />
                            <circle fill="" cx="17.516" cy="10.48" r="1.688" />
                          </g>
                        </svg>
                      </span>
                    )}
                    <span>
                      {loading ? (
                        <Spinner
                          className="loaderCircle verficatoinSpin"
                          animation="border"
                          role="status"
                        ></Spinner>
                      ) : (
                        "Resend Code"
                      )}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="havingTroubleBox">
            <span>
              having trouble? call us at{" "}
              <span className="havingTroublePhone">03450012332</span>
            </span>
          </div>
        </div>

        <Modal
          className="modalMainConts"
          show={networkModal}
          onHide={() => setNetworkModal(false)}
          keyboard={false}
          centered
          dialogClassName={"animate-bottom selectNetworModal"}
        >
          <div className="modalInnerCont">
            <div className="modalHeader">
              <p className="headerleftSide">
                Have you changed your mobile network?
              </p>
              <p
                className="headerRightSide"
                onClick={() => setNetworkModal(false)}
              >
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
              <div className="modalBodyContent">
                <div className="row">
                  <div className="col-sm-12">
                    <p className="modaltelecosDescription">
                      Please select your new network to receive OTP
                    </p>
                  </div>
                </div>

                <div className="row justify-content-md-center">
                  <div className="modalTelcosMain">
                    <button
                      className="modalBodyButton"
                      onClick={() => checkNetwork("Jazz")}
                    >
                      <img src={jAzz} alt="jazz" title="Jazz" />
                    </button>
                    <button
                      className="modalBodyButton"
                      onClick={() => checkNetwork("Telenor")}
                    >
                      <img src={tElenor} alt="Telenor" title="Telenor" />
                    </button>
                    <button
                      className="modalBodyButton"
                      onClick={() => checkNetwork("Ufone")}
                    >
                      <img src={uFone} alt="Ufone" title="ufone" />
                    </button>
                    <button
                      className="modalBodyButton"
                      onClick={() => checkNetwork("Zong")}
                    >
                      <img src={zOng} alt="Zong" title="Zong" />
                    </button>
                    <button
                      className="modalBodyButton"
                      onClick={() => checkNetwork("Scom")}
                    >
                      <img src={sCom} alt="scom" title="scom" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </section>
    </>
  );
};

export default connect((state) => {
  return {
    user: state.user,
  };
})(VerificationScreen);

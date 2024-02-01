import React, { useEffect, useState } from "react";
import { analytics } from "../../../firebase";
import { Dropdown } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import Header from "../../common/Header";
import { connect } from "react-redux";
import "./style.css";
import {
  updateDukaanUserToCloud,
  checkVanityAvailable,
  updateUser,
} from "../../../oscar-pos-core/actions";
import {
  CUSTOMER_BASE_URL,
  themeStyleSheet,
  BASE_URL,
} from "../../../constants";

var BUTTONS = [
  {
    name: "Aluminum / Steel / Glass Shop",
  },
  {
    name: "Bakery / Cake Shop",
  },
  {
    name: "Beauty Products / Cosmetics",
  },
  {
    name: "Bike Dealer & Spare Parts",
  },
  {
    name: "Book / Stationary / Photocopy / Printing Store",
  },
  {
    name: "Car Dealer & Spare Parts",
  },
  {
    name: "Chemicals / Fertilizers / Pesticides Shop",
  },
  {
    name: "Clinic / Hospital / Dentist",
  },
  {
    name: "Construction / Building Material",
  },
  {
    name: "Dry Cleaners",
  },
  {
    name: "Electronics & Appliances Store",
  },
  {
    name: "Event Management",
  },
  {
    name: "Fruits & Vegetables Stall",
  },
  {
    name: "Garments / Clothing Shop",
  },
  {
    name: "Generator & Parts",
  },
  {
    name: "Gym & Sports Equipment / Toy Shop",
  },
  {
    name: "Hardware / Tiles / Sanitary / Paint Shop",
  },
  {
    name: "Hotel / Guesthouse",
  },
  {
    name: "Insurance & Financial Services",
  },
  {
    name: "Interior Designer",
  },
  {
    name: "Internet Service Provider",
  },
  {
    name: "Jewellery & Gems",
  },
  {
    name: "Kiryana / Mini-Mart / Grocery",
  },
  {
    name: "Leather / Rexine / Shoe Shop",
  },
  {
    name: "Local & Online Services",
  },
  {
    name: "Meat Shop / Poultry Farm / Milk Shop",
  },
  {
    name: "Medical Store & Pharmacy",
  },
  {
    name: "Mobile Recharge / Easypaisa Shop",
  },
  {
    name: "Mobile, Computers & Accessories",
  },
  {
    name: "Pan Shop",
  },
  {
    name: "Petrol Pump",
  },
  {
    name: "Plastic Works",
  },
  {
    name: "Printing Press",
  },
  {
    name: "Real Estate",
  },
  {
    name: "Restaurant / Cafe / Catering / Canteen",
  },
  {
    name: "School / Educational Institution / Tuition",
  },
  {
    name: "Stone / Marble Business",
  },
  {
    name: "Surgical Instruments",
  },
  {
    name: "Transportation / Taxi / Careem / Uber",
  },
  {
    name: "Travel Agent",
  },
  {
    name: "Water Plant",
  },
  {
    name: "Other",
  },
];

const AddBusinessDetails = ({ history, user, dispatch }) => {

  const [category, setCategory] = useState(user.business_category);
  const [other_category, setOtherCategory] = useState("");
  const [coordinates, setCoordinates] = useState({});
  const [available, setAvailable] = useState(false);
  const [is_valid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (
      url.length > 0 &&
      name.length > 0 &&
      (category === "Other" ? other_category : category)
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [url, name, category, other_category]);

  useEffect(() => {
    getEstimatedLocation();
  }, []);

  const submitDetails = (e) => {
    e.preventDefault();
    setLoading(true);

    let err = {};
    let isError = false;

    if (!name) {
      err = {
        name: "Business name is required",
      };
      isError = true;
    }
    if (!url) {
      err = {
        ...err,
        url: "Store link is required",
      };
      isError = true;
    } else if (/\s/.test(url)) {
      err = {
        ...err,
        url: "URL cannot contain spaces",
      };
      isError = true;
    } else if (!url.match(/^([a-zA-Z0-9_]+)$/)) {
      err = {
        ...err,
        url: "URL cannot contain special characters",
      };
      isError = true;
    } else if (available == false) {
      err = {
        ...err,
        url: "URL already exists, please enter another",
      };
      isError = true;
    } else if (!category) {
      err = {
        ...err,
        category: "Please select your business category",
      };
      isError = true;
    } else if (category == "Other" && !other_category) {
      err = {
        ...err,
        other_category: "Please select your business category",
      };
      isError = true;
    }

    if (isError == true) {
      setErrors(err);
      setLoading(false);
    } else {
      let params = {
        vanity_url: url,
        name: name,
        phone_number: user.phone_number,
        store_coordinates_latitude: coordinates.store_coordinates_latitude,
        store_coordinates_longitude: coordinates.store_coordinates_longitude,
        business_category: category === "Other" ? other_category : category,
      };
      setTokoStore(params);
    }
  };

  const getEstimatedLocation = () => {
    analytics.logEvent('location_permission');

    navigator.geolocation.getCurrentPosition(
      function (position) {

        const { longitude, latitude } = position.coords;
        if (latitude && longitude) {
          let coords = {
            store_coordinates_longitude: longitude.toString(),
            store_coordinates_latitude: latitude.toString(),
          };
          console.log("Coordinates", position, "Set Coordinates", coords);

          setCoordinates(coords);
        }
      },
      (error) => {
        console.log("ERERERER", error);
      }
    );
  };

  const setTokoStore = (params) => {
    updateDukaanUserToCloud(params, BASE_URL)
      .then((upd_res) => {
        analytics.logEvent('business_details', { params });
        setLoading(false);
        updateUserInRedux(params);
      })
      .catch((err) => {
        setLoading(false);
        console.log("UserUpdate Error:", err);
      });
  };

  const updateUserInRedux = (params) => {
    dispatch(updateUser(params)).then((user) => {
      history.push({
        pathname: "/Onboarding",
        progress: 90,
      });
    });
  };

  return (
    <>
      <Header />
      <section className="body_Content_Section signupPage">
        <div className="container">
          <div className="row justify-content-md-center">

            <div className="col-sm-3">
              <div className="agentImage">
                <span className="avatar_img med"></span>
              </div>
            </div>

            <div className="col-sm-12">
              <div className="login_page_top_content">
                <h1>Setup your online business store</h1>
              </div>
            </div>

            <div className="col-sm-5">
              <div className="newCardBox">
                <div className="login_page_form_section addBusinessDetailForm">
                  <form
                    type="submit"
                    onSubmit={(e) => {
                      submitDetails(e);
                    }}
                  >
                    <div className="form-group">
                      <input
                        className="form-control"
                        placeholder="Enter store name"
                        type="text"
                        name="Name"
                        value={name}
                        onChange={(e) => {
                          setErrors({});
                          setName(e.target.value);
                        }}
                      />
                      <label className="control-label" htmlFor="name">
                        Enter your online store name
                      </label>
                      {errors.name ? (
                        <p className="error_paragraph">{errors.name}</p>
                      ) : (
                        <p className="error_paragraph" />
                      )}
                    </div>

                    <div className="form-group formLink_box accountBoxLink">
                      <input
                        className="form-control"
                        type="text"
                        name="URL"
                        value={url}
                        onChange={(e) => {
                          let params = {
                            vanity_url: e.target.value.replace(/[^\w]/g, ""),
                          }
                          setUrl(e.target.value.replace(/[^\w]/g, ""))
                          checkVanityAvailable(params, BASE_URL).then((res) => {
                            setAvailable(res.data.found);
                          })
                        }}
                        placeholder="Your store link"
                      />

                      <span className="linkTickMark">
                        <span> {"." + CUSTOMER_BASE_URL} </span>
                        <svg
                          fill={
                            name && available
                              ? themeStyleSheet.brightGreen
                              : themeStyleSheet.lightGray
                          }
                          height="26"
                          width="26"
                          viewBox="0 0 25 25"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill=""
                            d="M12.499,24.373c-6.546,0-11.871-5.324-11.871-11.873c0-6.546,5.325-11.873,11.871-11.873
                                                    S24.372,5.954,24.372,12.5C24.372,19.049,19.045,24.373,12.499,24.373z M12.499,1.894C6.652,1.894,1.894,6.652,1.894,12.5
                                                    s4.758,10.607,10.605,10.607c5.849,0,10.606-4.76,10.606-10.607S18.348,1.894,12.499,1.894z"
                          />
                          <path
                            fill=""
                            d="M17.835,9.333c-0.074-0.304-0.31-0.563-0.602-0.658c-0.341-0.113-0.651-0.025-0.945,0.272
                                                    c-0.935,0.936-1.868,1.871-2.804,2.806l-2.474,2.477l-1.045-1.047c-0.435-0.434-0.871-0.867-1.304-1.303
                                                    c-0.233-0.233-0.5-0.319-0.78-0.256c-0.354,0.082-0.598,0.308-0.702,0.653c-0.096,0.317-0.004,0.616,0.272,0.893l2.92,2.916
                                                    c0.188,0.188,0.415,0.287,0.652,0.287s0.467-0.101,0.658-0.291c0.254-0.254,0.507-0.508,0.759-0.76l1.569-1.578
                                                    c1.19-1.201,2.385-2.402,3.581-3.599C17.814,9.921,17.903,9.626,17.835,9.333z"
                          />
                        </svg>
                      </span>
                      <label className="control-label" htmlFor="url">
                        Create your own store link
                      </label>
                      {errors.url ? (
                        <p className="error_paragraph">{errors.url}</p>
                      ) : (
                        <p className="error_paragraph" />
                      )}
                    </div>
                    {category !== "Other" && (
                      <div className="form-group">
                        <div className="inputBoxRightSide businessCategoryLabel businessCategory">
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="success"
                              id="dropdown-basic"
                            >
                              {category ? category : "Business Category"}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              {BUTTONS.map((item, index) => {
                                return (
                                  <Dropdown.Item
                                    key={index}
                                    onSelect={() => setCategory(item.name)}
                                  >
                                    {item.name}
                                  </Dropdown.Item>
                                );
                              })}
                            </Dropdown.Menu>
                          </Dropdown>
                          {errors.category ? (
                            <p className="error_paragraph addbusinessCatError">
                              {errors.category}
                            </p>
                          ) : (
                            <p className="error_paragraph addbusinessCatError" />
                          )}
                          {/* <p className={"inputError"}>{errors.category && !category ? errors.category : false}</p> */}
                        </div>
                      </div>
                    )}

                    {category === "Other" ? (
                      <div className="form-group otherCategoryInputBox">
                        <>
                          <input
                            className="form-control"
                            placeholder={"Other Category"}
                            value={other_category}
                            autoFocus={true}
                            maxLength={34}
                            onChange={(e) => setOtherCategory(e.target.value)}
                          />

                          <label
                            className="control-label"
                            htmlFor="other_category"
                          >
                            Enter Other Category Name
                          </label>

                          <button
                            onClick={() => setCategory("")}
                            className="clearCategoryButton"
                          >
                            <span className="textStyling pointerCursor">
                              <svg
                                fill="var(--mediumGray)"
                                height="18"
                                width="18"
                                viewBox="0 0 35 35"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill=""
                                  d="M17.555,15.438l9.293-9.293c0.232-0.233,0.36-0.542,0.36-0.871c0-0.329-0.128-0.639-0.36-0.871
                                                                    c-0.466-0.465-1.277-0.465-1.742,0l-9.293,9.292L6.521,4.402c-0.465-0.464-1.277-0.465-1.743,0c-0.233,0.232-0.36,0.542-0.36,0.871
                                                                    c0,0.329,0.127,0.638,0.36,0.871l9.293,9.292L4.777,24.73c-0.48,0.479-0.48,1.262,0,1.742c0.464,0.466,1.276,0.466,1.743,0
                                                                    l9.292-9.293l9.294,9.293c0.465,0.466,1.275,0.465,1.741,0c0.479-0.48,0.479-1.263,0-1.742L17.555,15.438z"
                                />
                              </svg>
                            </span>
                          </button>
                          {errors.other_category ? (
                            <p className="error_paragraph otherbusinessCatError">
                              {errors.other_category}
                            </p>
                          ) : (
                            <p className="error_paragraph otherbusinessCatError" />
                          )}
                          {/* <p className={"inputError"}>{errors.other_category ? errors.other_category : ''}</p> */}
                        </>
                      </div>
                    ) : null}

                    <div className="form-group addbusinesscircle">
                      <button
                        type="submit"
                        value="Next"
                        className={
                          is_valid
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
                          <span
                            className={
                              is_valid ? "checkmarkWhite" : "checkmarkGray"
                            }
                          >
                            <svg
                              fill=""
                              xmlns="http://www.w3.org/2000/svg"
                              width="22"
                              height="22"
                              viewBox="0 0 25 25"
                            >
                              <path
                                fill=""
                                d="M12.499,24.373c-6.546,0-11.871-5.324-11.871-11.873c0-6.546,5.325-11.873,11.871-11.873
                                                            S24.372,5.954,24.372,12.5C24.372,19.049,19.045,24.373,12.499,24.373z M12.499,1.894C6.652,1.894,1.894,6.652,1.894,12.5
                                                            s4.758,10.607,10.605,10.607c5.849,0,10.606-4.76,10.606-10.607S18.348,1.894,12.499,1.894z"
                              />
                              <path
                                fill=""
                                d="M17.835,9.333c-0.074-0.304-0.31-0.563-0.602-0.658c-0.341-0.113-0.651-0.025-0.945,0.272
                                                            c-0.935,0.936-1.868,1.871-2.804,2.806l-2.474,2.477l-1.045-1.047c-0.435-0.434-0.871-0.867-1.304-1.303
                                                            c-0.233-0.233-0.5-0.319-0.78-0.256c-0.354,0.082-0.598,0.308-0.702,0.653c-0.096,0.317-0.004,0.616,0.272,0.893l2.92,2.916
                                                            c0.188,0.188,0.415,0.287,0.652,0.287s0.467-0.101,0.658-0.291c0.254-0.254,0.507-0.508,0.759-0.76l1.569-1.578
                                                            c1.19-1.201,2.385-2.402,3.581-3.599C17.814,9.921,17.903,9.626,17.835,9.333z"
                              />
                            </svg>
                          </span>
                        )}
                        <span>Next</span>
                      </button>
                    </div>
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
})(AddBusinessDetails);

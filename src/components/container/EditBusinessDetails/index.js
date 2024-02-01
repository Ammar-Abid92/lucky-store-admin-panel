import { formatInputNum } from "../../../oscar-pos-core/constants";
import React, { useCallback, useEffect, useState } from "react";
import DashboardAction from "../../common/DashboardAction";
import Autocomplete from "@mui/material/Autocomplete";
import loader from "../../../assets/03_Loader.gif";
import { analytics } from "../../../firebase";
import { Dropdown } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import Header from "../../common/Header";
import { connect } from "react-redux";
import axios from "axios";
import "./style.css";
import {
  updateDukaanUserToCloud,
  updateUser,
} from "../../../oscar-pos-core/actions";
import {
  BASE_URL,
  CUSTOMER_BASE_URL,
  themeStyleSheet,
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

const EditBusinessDetails = ({ history, user, dispatch, location }) => {
  const [freeDeliveryAbove, setFreeDeliveryAbove] = useState(
    user.free_delivery_above ? user.free_delivery_above : 0
  );
  const [deliveryPerOrder, setDeliveryPerOrder] = useState(
    user.charge_per_order ? user.charge_per_order : 0
  );
  const [selected, setSelected] = useState("EditBusinessDetails");
  const [address, setAddress] = useState(user && user.address);
  const [url, setUrl] = useState(user && user.vanity_url);
  const [name, setName] = useState(user && user.name);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [category, setCategory] = useState(user.business_category);
  const [other_category, setOtherCategory] = useState("");
  const [city, setCity] = useState({
    name: user.city || "",
    id: "",
  });
  const [area, setArea] = useState(user.landmark || "");
  const [areaList, setAreaList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const validateInput = () => {
    let isValid = true;
    let obj = {};
    var patt = new RegExp(/^[0-9]*$/);

    let perOrder = !deliveryPerOrder
      ? 0
      : deliveryPerOrder.toString().replace(" ", "");
    let freeOrder = !freeDeliveryAbove
      ? 0
      : freeDeliveryAbove.toString().replace(" ", "");

    if (!name) {
      isValid = false;
      obj = {
        name: "Business name is required",
      };
    }
    if (deliveryPerOrder) {
      if (deliveryPerOrder != 0) {
        if (patt.test(deliveryPerOrder) == false) {
          isValid = false;
          obj = {
            ...obj,
            deliveryPerOrder: "Delivery charges must be a number",
          };
        }
      }
    }
    if (freeDeliveryAbove) {
      if (freeDeliveryAbove != 0) {
        if (patt.test(freeDeliveryAbove) == false) {
          isValid = false;
          obj = {
            ...obj,
            freeDeliveryAbove: "Order amount must be a number",
          };
        }
      }
    }
    if (!category) {
      isValid = false;
      obj = {
        ...obj,
        category: "Please select your business category",
      };
    } else if (category == "Other" && !other_category) {
      isValid = false;
      obj = {
        ...obj,
        other_category: "Please select your business category",
      };
    }

    if ((!perOrder || parseFloat(perOrder) == 0) && freeOrder) {
      isValid = false;
      obj = {
        ...obj,
        deliveryPerOrder: "Delivery charges amount should be set",
      };
    }

    if (isValid == false) return obj;
    else return true;
  };

  const submitDetails = (e) => {
    e.preventDefault();
    if (validateInput() != true) setErrors(validateInput());
    else {
      let perOrder = !deliveryPerOrder
        ? 0
        : deliveryPerOrder.toString().replace(" ", "");
      let freeOrder = !freeDeliveryAbove
        ? 0
        : freeDeliveryAbove.toString().replace(" ", "");

      setLoading(true);
      setErrors({});
      let params = {
        name,
        address,
        landmark: area,
        phone_number: user.phone_number,
        charge_per_order: parseFloat(perOrder),
        free_delivery_above: parseFloat(freeOrder),
        business_category: category === "Other" ? other_category : category,
        city: city?.name,
      };
      editDetails(params);
    }
  };

  const editDetails = (params) => {
    updateDukaanUserToCloud(params, BASE_URL)
      .then((upd_res) => {
        dispatch(updateUser(params))
          .then((res) => {
            if (user.charge_per_order !== deliveryPerOrder || user.free_delivery_above !== freeDeliveryAbove) {
              analytics.logEvent('delivery_charges_changed');
            }
            analytics.logEvent('business_details_edited');

            setLoading(false);
            setSuccess("INFORMATION EDITED SUCCESSFULLY");
            setTimeout(() => {
              setSuccess(false);
            }, 2000);
          })
          .catch((err) => {
            console.log("err", err);
            setLoading(false);
          });
      })
      .catch((err) => {
        console.log("modifiedDukaanUserToCloud Error:", err);
        setLoading(false);
      });
  };

  const disabledCondiiton = () => {
    let disabled = true;

    if (name !== user?.name) {
      disabled = false;
    }
    if (address) {
      if (user?.address && address !== user?.address) {
        disabled = false;
      } else if (user?.address === null && address) {
        disabled = false;
      }
    } else {
      if (!address && user?.address) {
        disabled = false;
      }
    }
    if (area) {
      if (user?.landmark && area !== user?.landmark) {
        disabled = false;
      } else if (user?.landmark === null && area) {
        disabled = false;
      }
    } else {
      if (!area && user?.landmark) {
        disabled = false;
      }
    }
    if (city?.name) {
      if (user?.landmark && city?.name !== user?.landmark) {
        disabled = false;
      } else if (user?.city === null && city?.name) {
        disabled = false;
      }
    } else {
      if (!city?.name && user?.city) {
        disabled = false;
      }
    }
    if (category !== user?.business_category) {
      disabled = false;
    }
    if (deliveryPerOrder) {
      if (
        user?.charge_per_order &&
        deliveryPerOrder !== user?.charge_per_order
      ) {
        disabled = false;
      } else if (user?.charge_per_order === null && deliveryPerOrder) {
        disabled = false;
      }
    } else {
      if (!deliveryPerOrder && user?.charge_per_order) {
        disabled = false;
      }
    }
    if (freeDeliveryAbove) {
      if (
        user?.free_delivery_above &&
        freeDeliveryAbove !== user?.free_delivery_above
      ) {
        disabled = false;
      } else if (user?.free_delivery_above === null && freeDeliveryAbove) {
        disabled = false;
      }
    } else {
      if (!freeDeliveryAbove && user?.free_delivery_above) {
        disabled = false;
      }
    }

    return disabled;
  };

  const handleCharge = (type, value) => {
    if (type === "order") {
      setDeliveryPerOrder(formatInputNum(value));
    }
    if (type === "deliveryAbove") {
      setFreeDeliveryAbove(formatInputNum(value));
    }
  };

  const getCityList = useCallback((e) => {
    axios
      .get(`${BASE_URL}/api/toko/address`)
      .then((res) => {

        const sortedList = res.data.cities.sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          }
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
        setCityList(sortedList);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const getAreaList = useCallback(() => {
    const selectedCity = cityList.find((item) => item?.name === city?.name);
    axios
      .get(`${BASE_URL}/api/toko/address?city_id=${selectedCity?.id}`)
      .then((res) => {
        const validAreas = res.data.areas
          .map((area) => area.name)
          .sort((a, b) => {
            if (a.toLowerCase() < b.toLowerCase()) {
              return -1
            } else {
              return 1
            }
          });
        setAreaList(validAreas);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [city?.id, cityList, city?.name]);


  useEffect(() => {
    getCityList();
  }, [getCityList]);

  useEffect(() => {
    getAreaList();
  }, [getAreaList]);

  return success ? (
    <div className="successfulCont editBusniessSuccessCont">
      <img
        src={loader}
        alt="Check mark"
        title="check mark"
        style={{
          resizeMode: "cover",
          width: 150,
          height: 150,
        }}
      />
      <p>{success}</p>
    </div>
  ) : (
    <>
      <Header />
      <section
        className="body_Content_Section dashboardInnerSection"
        onClick={() => { }}
      >
        <div className="container-fluid">
          <div className="row">
            <DashboardAction
              type="EditBusinessDetails"
              history={history}
              location={location}
              toggleExpanded={setExpanded}
              currentSelection={selected}
            />
            <div className={"col-sm-10"}>
              <div className="RightSectionMain">
                <div className="viewFirstHeading">
                  <h1>Edit Business Details</h1>
                </div>

                <form action="" onSubmit={submitDetails}>
                  <div className="login_page_form_section editBusinessDetailForm ">
                    <div className="newCardBox">
                      <div className="addItemINputRowCont paddTop40">
                        <div className="form-group">
                          <input
                            className="form-control"
                            placeholder="Mobile Number"
                            value={user.phone_number}
                            disabled
                            style={{
                              color: themeStyleSheet.lightGray,
                            }}
                          />
                          <label className="control-label" htmlFor="name">
                            Mobile Number
                          </label>
                          <p className="error_paragraph" />
                        </div>

                        <div className="form-group">
                          <input
                            className="form-control"
                            placeholder="Business Name"
                            value={name}
                            onChange={(e) => {
                              if (e.target.value !== " ") {
                                setName(e.target.value);
                              }
                            }}
                          />
                          <label className="control-label" htmlFor="name">
                            Enter your Business Name
                          </label>
                          {errors.name ? (
                            <p className="error_paragraph">{errors.name}</p>
                          ) : (
                            <p className="error_paragraph" />
                          )}
                        </div>
                      </div>

                      <div className="addItemINputRowCont">
                        <div className="form-group formLink_box accountBoxLink">

                          <input
                            className="form-control"
                            placeholder="Your store link"
                            value={url + "." + CUSTOMER_BASE_URL}
                            disabled
                          />

                          <label className="control-label" htmlFor="url">
                            Business URL
                          </label>
                          <p className="error_paragraph" />
                        </div>
                        {category !== "Other" && (
                          <div className="form-group businessCategory">
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
                            <label className="control-label busniessCatLabel">
                              Select Business Category
                            </label>
                            {errors.category ? (
                              <p className="error_paragraph businessCatError">
                                {errors.category}
                              </p>
                            ) : (
                              <p className="error_paragraph" />
                            )}
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
                                onChange={(e) => {
                                  if (e.target.value !== " ")
                                    setOtherCategory(e.target.value);
                                }}
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
                                <p className="error_paragraph">
                                  {errors.other_category}
                                </p>
                              ) : (
                                <p className="error_paragraph" />
                              )}
                            </>
                          </div>
                        ) : null}
                      </div>

                      <div className="addItemINputRowCont">
                        <div className="form-group cityDropdown">
                          <Autocomplete
                            classes={{ listbox: "cityDropdownList" }}
                            onChange={(e, data) => {
                              setCity(data);
                              setArea('')
                            }}
                            freeSolo={true}
                            options={cityList || []}
                            getOptionLabel={(option) => {
                              return option.name;
                            }}
                            value={city}
                            placeholder="City"
                            renderInput={(params) => (
                              <div
                                className="cityDropdownListInput"
                                ref={params.InputProps.ref}
                              >
                                <input
                                  type="text"
                                  placeholder="City"
                                  className="form-control"
                                  {...params.inputProps}
                                />
                                <i className="citylistDropDownIcon"></i>
                              </div>
                            )}
                          />
                          <label className="control-label" htmlFor="city">
                            City
                          </label>
                          <p className="error_paragraph" />
                        </div>
                        <div className="form-group cityDropdown">
                          <Autocomplete

                            classes={{ listbox: "cityDropdownList" }}
                            onChange={(e, data) => {
                              setArea(data);
                            }}
                            freeSolo={true}
                            options={areaList ? areaList : []}
                            getOptionLabel={(option) => {
                              return option;
                            }}
                            value={area}
                            placeholder="Area"
                            renderInput={(params) => (
                              <div
                                className="cityDropdownListInput"
                                ref={params.InputProps.ref}
                              >
                                <input
                                  type="text"
                                  placeholder="Area"
                                  className="form-control"
                                  style={{
                                    width: "100%",
                                    padding: "5px",
                                  }}
                                  {...params.inputProps}
                                />
                                <i className="citylistDropDownIcon"></i>
                              </div>
                            )}
                          />
                          <label className="control-label" htmlFor="city">
                            Area
                          </label>
                          <p className="error_paragraph" />
                        </div>
                      </div>

                      <div className="addItemINputRowCont">
                        <div className="form-group">
                          <input
                            placeholder="Your store address"
                            className="form-control"
                            value={address}
                            onChange={(e) => {
                              if (e.target.value[0] !== " ")
                                setAddress(e.target.value);
                            }}
                          />
                          <label className="control-label" htmlFor="address">
                            Your store address
                          </label>
                          <p className="error_paragraph" />
                        </div>
                      </div>

                      <div className="addItemINputRowCont">
                        <div className="form-group">
                          <input
                            placeholder="Delivery charges per order"
                            className="form-control"
                            value={deliveryPerOrder}
                            onChange={(e) =>
                              handleCharge("order", e.target.value)
                            }
                          />
                          <label className="control-label" htmlFor="address">
                            Delivery charges per order
                          </label>
                          {errors.deliveryPerOrder ? (
                            <p className="error_paragraph">
                              {errors.deliveryPerOrder}
                            </p>
                          ) : (
                            <p className="error_paragraph" />
                          )}
                        </div>

                        <div className="form-group">
                          <input
                            className="form-control"
                            placeholder="Free delivery above"
                            value={freeDeliveryAbove}
                            onChange={(e) =>
                              handleCharge("deliveryAbove", e.target.value)
                            }
                          />
                          <label className="control-label" htmlFor="address">
                            Free delivery above
                          </label>
                          {errors.freeDeliveryAbove ? (
                            <p className="error_paragraph">
                              {errors.freeDeliveryAbove}
                            </p>
                          ) : (
                            <p className="error_paragraph" />
                          )}
                        </div>
                      </div>

                      <div className="buttonContEditDtl">
                        <button
                          type="submit"
                          value="Next"
                          style={{
                            backgroundColor: disabledCondiiton()
                              ? themeStyleSheet.lightGray
                              : themeStyleSheet.brightGreen,
                            border: `1px solid ${disabledCondiiton()
                              ? themeStyleSheet.lightGray
                              : themeStyleSheet.greenColor
                              }`,
                          }}
                          className="btn btn-primary login_btn_next"
                          disabled={disabledCondiiton() || loading}
                        >
                          <span>
                            {loading ? (
                              <Spinner
                                className="loaderCircle Products"
                                animation="border"
                                role="status"
                              ></Spinner>
                            ) : (
                              "Update"
                            )}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
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
})(EditBusinessDetails);

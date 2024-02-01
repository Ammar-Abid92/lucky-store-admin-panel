import { useState, useCallback, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import TopHeader from "../../common/TopHeader";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Spinner from "react-bootstrap/Spinner";
import loader from "../../../assets/03_Loader.gif";
import logo from "../../../assets/icons/logo_toko.svg";

import { List, ListItem, ListItemText, ListItemButton } from "@mui/material";

import axios from "axios";
import { BASE_URL, themeStyleSheet } from "../../../constants";

import "./style.css";
import {
  getOrdersByIdFromCloud,
  updateDukaanUserToCloud,
  updateUser,
} from "../../../oscar-pos-core/actions";
import { getCouriers, sendCourier } from "../../../SyncServices";

import { Autocomplete } from '@mui/material';
import { formatWeightNum } from '../../../oscar-pos-core/constants';

const { innerHeight } = window;
const steps = ["Address", "Weight", "Courier"];
const ShippingService = ({ setToggle, orderId }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [cityList, setCityList] = useState([]);
  const [areaList, setAreaList] = useState([]);
  const [couriersLoading, setCouriersLoading] = useState(false);
  const [courierList, setCourierList] = useState([]);
  const [success, setSuccess] = useState(false);

  const {
    handleSubmit,
    formState: { errors, isValid, isDirty },
    register,
    watch,
    setValue,
    reset,
    control,
  } = useForm({
    mode: "all",
    defaultValues: {
      city: user.city,
      area: user.landmark,
      address: user.address,
    },
  });

  const getCityList = useCallback((e) => {
    axios
      .get(`${BASE_URL}/api/toko/address`)
      .then((res) => {
        console.log(res.data);
        setCityList(
          res.data.cities.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (b.name < a.name) {
              return 1;
            }
            return 0;
          })
        );
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    reset({
      city: user.city,
      area: user.landmark,
      address: user.address,
    });
  }, [reset, user.address, user.city, user.landmark]);

  const getAreaList = useCallback(() => {
    const city = cityList.find(
      (city) => city.name === (watch("city") || user.city)
    );
    // fetch(`${BASE_URL}/api/toko/address?city_id=${cityId}`,).then((res) => res.json()).then((data) => setAreaList(data.areas.splice(0, 50)))
    axios
      .get(`${BASE_URL}/api/toko/address?city_id=${city?.id}`)
      .then((res) => {
        console.log(res.data);
        setAreaList(res.data.areas.splice(0, 90));
      })
      .catch((e) => {
        console.log(e);
      });
  }, [watch("city"), user.city, cityList]);

  useEffect(() => {
    getAreaList();
  }, [getAreaList]);

  const handleStepCompletion = () => {
    isValid && setActiveStep((prev) => prev + 1);
  };

  const onSubmit = (data) => {
    console.log(data, "Data");
    const params = {
      city: data.city.name,
      landmark: data.area.name,
      address: data.address,
    };
    if (activeStep > 2) return undefined;
    else if (activeStep === 2) {
      console.log(data);
      setLoading(true);
      sendCourier({
        order_id: orderId,
        courier_id: data.courier_id,
      })
        .then((res) => {
          console.log(res);
          setSuccess(true);
          //   getOrdersByIdFromCloud({ phone_number: user.activation_code, id: orderId, activation_code: user.activation_code });
        })
        .then(() =>
          setTimeout(() => {
            // setSuccess(false);
            setToggle(false);
            return clearTimeout();
          })
        )
        .catch((e) => console.log(e))
        .finally(() => setLoading(false));
    } else {
      if (activeStep === 0 && isDirty) {
        setLoading(true);
        updateDukaanUserToCloud(params, BASE_URL)
          .then((res) => {
            setLoading(false);
            dispatch(updateUser(params));
            handleStepCompletion();
          })
          .catch((e) => console.log(e));
      } else {
        handleStepCompletion();
      }
    }
  };

  console.log(errors);
  useEffect(() => {
    getCityList();
  }, [getCityList]);

  useEffect(() => {
    if (activeStep === 2) {
      setCouriersLoading(true);
      getCouriers({
        order_id: orderId,
        weight: parseFloat(watch("weight")),
      })
        .then((res) => {
          setCourierList(res.options);
          console.log(res);
        })
        .catch((e) => console.log(e))
        .finally(() => setCouriersLoading(false));
    }
  }, [activeStep, orderId, watch("weight")]);

  //   useEffect(() => {
  //     console.log(user);
  //     reset({ city: user.city, area: user.landmark, address: user.address });
  //   }, [reset, user]);

  return success ? (
    <div className="successfulCont">
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
    <div>
      <TopHeader
        onAction={() => {
          if (activeStep === 0) {
            reset();
            setActiveStep(0);
            setToggle(false);
          } else if (activeStep === 1) {
            setActiveStep(0);
          } else {
            setActiveStep(1);
          }
        }}
        title={
          (activeStep === 0 && "Sender Address") ||
          (activeStep === 1 && "Enter Package Weight") ||
          (activeStep === 2 && "Select Courier Service")
        }
      />
      <Stepper
        alternativeLabel
        color="primary"
        activeStep={activeStep}
        orientation="horizontal"
        className="shipContainerStepBox"
      >
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {couriersLoading ? (
        <div className="courierLoaderCont">
          <Spinner
            className="loaderCircle ProductsList"
            animation="border"
            role="status"
          ></Spinner>
        </div>
      ) : (
        <div className="addItemMainContainer">
          <form onSubmit={handleSubmit(onSubmit)} id="form">
            <div className="login_page_form_section shippingAddressForm">
              {activeStep === 0 && (
                <div
                  className="shippingAddressFormInner"
                  style={{ height: innerHeight * 0.57 }}
                >
                  <div className="addItemINputRowCont">
                    <div className="form-group cityDropdown">
                      <Controller
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }) => (
                          <Autocomplete
                            classes={{ listbox: "cityDropdownList" }}
                            freeSolo={true}
                            options={cityList.map((city) => city.name)}
                            getOptionLabel={(option) => option}
                            value={value}
                            onChange={(e, data) => onChange(data)}
                            renderInput={(params) => (
                              <div
                                ref={params.InputProps.ref}
                                className="cityDropdownListInput"
                              >
                                <input
                                  placeholder="Select a City"
                                  className="form-control"
                                  {...params.inputProps}
                                  type="search"
                                />
                                <i className="citylistDropDownIcon"></i>
                              </div>
                            )}
                          />
                        )}
                        name="city"
                        control={control}
                      />
                      <label className="control-label" htmlFor="city">
                        City
                      </label>
                    </div>

                    <div className="form-group cityDropdown">
                      <Controller
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }) => (
                          <Autocomplete
                            classes={{ listbox: "cityDropdownList" }}
                            freeSolo={true}
                            options={areaList?.map((area) => area.name) || []}
                            getOptionLabel={(option) => option}
                            // onInputChange={(e, data) =>
                            //   onChange(data)
                            // }
                            value={value}
                            onChange={(e, data) => {
                              onChange(data);
                            }}
                            renderInput={(params) => (
                              <div
                                className="cityDropdownListInput"
                                ref={params.InputProps.ref}
                              >
                                <input
                                  placeholder="Select an Area"
                                  className="form-control"
                                  {...params.inputProps}
                                  type="search"
                                />
                                <i className="citylistDropDownIcon"></i>
                              </div>
                            )}
                          />
                        )}
                        name="area"
                        control={control}
                      />

                      <label className="control-label" htmlFor="city">
                        Area
                      </label>
                    </div>
                  </div>

                  <div className="addItemINputRowCont">
                    <div className="form-group">
                      <input
                        className="form-control"
                        placeholder="Address"
                        {...register("address", {
                          required: "Address is Required",
                        })}
                        style={{
                          color: themeStyleSheet.darkGray,
                        }}
                      />
                      <label className="control-label" htmlFor="city">
                        Address
                      </label>
                      {errors.address ? (
                        <p className="error_paragraph">
                          {errors?.address?.message}
                        </p>
                      ) : (
                        <p className="error_paragraph" />
                      )}
                    </div>
                  </div>
                </div>
              )}
              {activeStep === 1 && (
                <div
                  className="shippingAddressFormInner"
                  style={{ height: innerHeight * 0.57 }}
                >
                  <div className="addItemINputRowCont">
                    <div className="form-group">
                      <input
                        className="form-control"
                        placeholder="Weight"
                        {...register("weight", {
                          required: "weight is Required",
                          pattern: {
                            value: /^\+?(\d*[1-9]\d*\.?|\d*\.\d*[1-9]\d*)$/,
                            message: "Weight must be greater than 0",
                          },
                        })}
                      />

                      <label className="control-label" htmlFor="city">
                        Enter package Weight
                      </label>
                      {errors.weight ? (
                        <p className="error_paragraph">
                          {errors?.weight?.message}
                        </p>
                      ) : (
                        <p className="error_paragraph" />
                      )}
                    </div>
                  </div>
                </div>
              )}
              {activeStep === 2 && (
                <div
                  className="selectCourierServiceCOnt"
                  style={{ height: innerHeight * 0.57 }}
                >
                  <h4>Select Courier Service</h4>
                  <List>
                    {courierList.length > 0 ? (
                      courierList.map((courier) => (
                        <ListItem key={courier.id} dense>
                          <ListItemButton
                            onClick={() =>
                              setValue("courier_id", courier.id, {
                                shouldValidate: true,
                              })
                            }
                          >
                            <input
                              value={courier.id}
                              type="radio"
                              name="courier_id"
                              style={{ height: innerHeight * 0.11 }}
                              {...register("courier_id", {
                                required: "Select a Courier Service",
                              })}
                            />
                            <span>Rs. {`${courier.charges}`}</span>
                            {` ${courier.estimated_time}`}
                            <img src={`${courier.image_url}`} alt="courier" />
                          </ListItemButton>
                        </ListItem>
                      ))
                    ) : (
                      <div className="courierEmptyCont">
                        <img src={logo} />
                        <p className="marTop20">
                          We have received our maximum order capacity for the
                          day
                        </p>
                        <p>Please try again</p>
                      </div>
                    )}
                  </List>
                  {errors.courier_id ? (
                    <p className="error_paragraph">
                      {errors?.courier_id?.message}
                    </p>
                  ) : (
                    <p className="error_paragraph" />
                  )}
                </div>
              )}
              <div
                className="buttonContEditDtl"
                style={{ height: innerHeight * 0.11 }}
              >
                <button
                  className={
                    isValid ? "login_btn_next" : "login_btn_next addItemDisable"
                  }
                  form="form"
                  type="submit"
                  disabled={isValid ? false : true}
                // style={{
                //   backgroundColor: !isValid
                //     ? themeStyleSheet.lightGray
                //     : themeStyleSheet.brightGreen,
                //   border: `1px solid ${
                //     !isValid
                //       ? themeStyleSheet.lightGray
                //       : themeStyleSheet.greenColor
                //   }`,
                // }}
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
          </form>
        </div>
      )}
    </div>
  );
};

export default ShippingService;

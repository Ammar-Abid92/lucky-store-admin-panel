import { getTokoAnalytics } from "../../../oscar-pos-core/actions/analyticsMerchant";
import { getDukaanOrdersFromCloud } from "../../../oscar-pos-core/actions";
import { BASE_URL, CUSTOMER_BASE_URL } from "../../../constants";
import React, { useCallback, useEffect, useState } from "react";
import { formatNum } from "../../../oscar-pos-core/constants";
import DashboardAction from "../../common/DashboardAction";
import { Dropdown, Spinner } from "react-bootstrap";
import Header from "../../common/Header";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import OrderItem from "./OrderItem";
import moment from "moment";
import "./style.css";
import firebase from "../../../firebase";
import useGetCollectionData from "../../../hooks/getData";

var BUTTONS = [
  {
    name: "Life time",
  },
  {
    name: "last 7 days",
  },
  {
    name: "last 30 days",
  },
  {
    name: "last month",
  },
];

const Home = ({ history, location, user, analytics }) => {
  const [orderModal, setOrderModal] = useState(false);
  const [selected, setSelected] = useState("home");
  const [custNumber, setCustNumber] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [filter, setFilter] = useState("All");
  const [orderId, setOrderId] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const orders = useGetCollectionData('orders');

  useEffect(() => {
    if (orders?.length > 0) setLoading(false);
    else if (orders?.length === 0) setLoading(true);
  }, [orders]);

  // const getOrder = useCallback(() => {
  //   let analyticParams = {
  //     phone_number: user.phone_number,
  //     start_date: "2020-10-26",
  //     end_date: moment().format("YYYY-MM-DD"),
  //   };

  //   Promise.all([
  //     getDukaanOrdersFromCloud(BASE_URL, {
  //       phone_number: user.phone_number,
  //       page_size: 4000
  //     }),
  //     getTokoAnalytics(BASE_URL, analyticParams),
  //   ])
  //     .then((res) => {
  //       SortDefaultOrders(res.results).then((res) => setOrders(res));
  //     })
  //     .catch((err) => {
  //       console.log("error at promise all", err);
  //     });
  // }, [user.phone_number]);

  const SortDefaultOrders = (data) => {
    let pendingOrders,
      acceptedOrders,
      outForDeliveryOrders,
      deliveredOrders,
      decline,
      cancelled,
      allOrders = "";
    data.sort((a, b) => {
      var dateA = new Date(a.created),
        dateB = new Date(b.created);
      return dateB - dateA;
    });

    return new Promise((res, rej) => {
      pendingOrders = data.filter((item) => item.status === "pending");
      acceptedOrders = data.filter((item) => item.status === "accepted");
      outForDeliveryOrders = data.filter((item) => item.status === "shipped");
      deliveredOrders = data.filter((item) => item.status === "delivered");
      decline = data.filter((item) => item.status === "declined");
      cancelled = data.filter((item) => item.status === "cancelled");
      allOrders = pendingOrders
        .concat(acceptedOrders)
        .concat(outForDeliveryOrders)
        .concat(deliveredOrders)
        .concat(decline)
        .concat(cancelled);
      res(allOrders);
    });
  };

  const handleFilter = (value) => {
    // analytics.logEvent('orders_filter');
    setFilter(value);
  }

  return (
    <>
      <Header />
      <section className="body_Content_Section dashboardInnerSection homeViewSectionMain">
        <div className="container-fluid">
          <div className="row">
            <DashboardAction
              history={history}
              currentSelection={selected}
              location={location}
              toggleExpanded={setExpanded}
            />
            <div className={"col-sm-10"}>
              <div className="RightSectionMain">
                <div className="homeViewSecondSection mb30">
                  <div className="homeViewSecondSectionTop mb20">
                    <div className="col-sm-10">
                      <h4>Overview</h4>
                    </div>
                  </div>

                  <div className="homeViewSecondSectionInner">
                    <div className="col-sm-6">
                      <div className="secondSectionboxes">
                        <h5>{orders?.length}</h5>
                        <p>Orders</p>
                      </div>
                    </div>
                    <div className="col-sm-6 doubleSideBorder">
                      <div className="secondSectionboxes">
                        <h5>
                          {analytics.revenue ? formatNum(analytics.revenue) : 0}
                        </h5>
                        <p>Revenue</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="homeViewSecondSection mb30">
                  <div className="homeViewSecondSectionTop">
                    <div className="col-sm-8">
                      <h4>Orders</h4>
                    </div>
                    <div className="col-sm-4">
                      <div className="filterSideMain">
                        <p onClick={() => history.push("/ViewOrders")}>
                          <span>View all</span>
                          <span>
                            <i className="viewAllIcon"></i>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="homeViewSecondSection mb30">
                  <div className="newCardBox">
                    <div className="homeViewThirdSectionBottom">
                      <div className="thirdSectionActionbox">
                        <ul>
                          <li className={filter == "All" ? "active" : null}>
                            <a onClick={() => handleFilter("All")}>All</a>
                          </li>
                          <li className={filter == "Pending" ? "active" : null}>
                            <a onClick={() => handleFilter("Pending")}>Pending</a>
                          </li>
                          <li
                            className={filter == "Accepted" ? "active" : null}
                          >
                            <a onClick={() => handleFilter("Accepted")}>
                              Accepted
                            </a>
                          </li>
                          <li className={filter == "Shipped" ? "active" : null}>
                            <a onClick={() => handleFilter("Shipped")}>Shipped</a>
                          </li>
                        </ul>
                      </div>
                      {loading === true ? (
                        <div className="spinnerContainer" style={{ height: '230px' }}>
                          <Spinner
                            className="loaderCircle ProductsList"
                            animation="border"
                            role="status"
                          ></Spinner>
                        </div>
                      ) : orders.length > 0 ? (
                        <div className="orderListingViewMain">
                          {orders.map((eachOrder, index) => {
                            return (
                              <div key={index}>
                                <OrderItem
                                  eachOrder={eachOrder}
                                  history={history}
                                />
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="placeHolderContMain noOrderFound">
                          <p>
                            <i className="orderPlaceholderIcon"></i>
                          </p>
                          <p>
                            {filter === "Pending"
                              ? "No pending orders found"
                              : filter === "Accepted"
                                ? "No accepted orders found"
                                : filter === "Shipped"
                                  ? "No shipped orders found"
                                  : "No orders found"}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal
        className="modalMainConts"
        show={orderModal}
        onHide={() => setOrderModal(false)}
        keyboard={false}
        centered
        dialogClassName={"animate-bottom selectNetworModal"}
      >
        <div className="modalInnerCont">
          <div className="modalHeader">
            <p className="headerleftSide">New Order</p>
            <p className="headerRightSide" onClick={() => setOrderModal(false)}>
              <span className="textStyling pointerCursor">
                <svg
                  fill="var(--mediumGray)"
                  height="18"
                  width="18"
                  viewBox="0 0 30 30"
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
            </p>
          </div>

          <div className="container-fluid">
            <div className="modalBodyContent">
              <div className="row justify-content-md-center">
                <div className="modalorderVIew">
                  <p>You have received a new order from</p>
                  <p className="modalCustomerNumber">
                    Waleed{name + " | " + custNumber}0343304040
                  </p>
                </div>

                <div className="modalSaveButton">
                  <button
                    className="login_btn_next"
                    onClick={() => history.push("/OrderDetails/" + orderId)}
                  >
                    View Order
                  </button>
                </div>
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
    orders: state.orders,
    analytics: state.analyticsHome,
  };
})(Home);

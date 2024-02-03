import { getTokoAnalytics } from "../../../oscar-pos-core/actions/analyticsMerchant";
import { getDukaanOrdersFromCloud } from "../../../oscar-pos-core/actions";
import { BASE_URL, CUSTOMER_BASE_URL } from "../../../constants";
import React, { useCallback, useEffect, useState } from "react";
import { formatNum } from "../../../oscar-pos-core/constants";
import DashboardAction from "../../common/DashboardAction";
import { Dropdown } from "react-bootstrap";
import Header from "../../common/Header";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import OrderItem from "./OrderItem";
import moment from "moment";
import "./style.css";
import firebase from "../../../firebase";

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
  const [analyticsViewText, setAnalyticsViewText] = useState("Life time");
  const [orders, setOrders] = useState([]);
  const [analyticsDate, setAnalyticsDate] = useState("");
  const [analyticsData, setAnalyticsData] = useState({});
  const [orderModal, setOrderModal] = useState(false);
  const [selected, setSelected] = useState("home");
  const [custNumber, setCustNumber] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [filter, setFilter] = useState("All");
  const [orderId, setOrderId] = useState("");
  const [name, setName] = useState("");

  const db = firebase.firestore();

  const getFilteredOrders = useCallback((date) => {
    let startTime = new Date(date.start_date).getTime();
    let endTime = new Date(date.end_date).getTime();

    let filtOrders = orders.filter((x) => {
      let time = new Date(x.created).getTime();
      return time >= startTime && time <= endTime;
    });

    if (filter == "All") {
      SortDefaultOrders(filtOrders).then((res) => setOrders(res));
    } else {
      setOrders([
        ...filtOrders.filter(
          (x) => x.status.toLowerCase() == filter.toLowerCase()
        ),
      ]);
    }
  }, [filter, orders]);

  // useEffect(() => {
  //   if (analyticsViewText === "Life time") {
  //     if (filter == "All") {
  //       SortDefaultOrders(orders).then((res) => setOrders(res));
  //     } else {
  //       setOrders([
  //         ...orders.filter(
  //           (x) => x.status.toLowerCase() == filter.toLowerCase()
  //         ),
  //       ]);
  //     }
  //   } else {
  //     getFilteredOrders(analyticsDate);
  //   }
  // }, [analyticsDate, analyticsViewText, filter, getFilteredOrders, orders]);

  useEffect(() => {
    // Function to fetch orders from Firestore
    const fetchOrders = async () => {
      try {
        const ordersCollection = await db.collection('orders').get();
        const ordersArray = ordersCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        console.log('orders', ordersArray)
        setOrders(ordersArray);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    // Call the function to fetch orders
    fetchOrders();
  }, []);

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

  const getTokoAnalyticsPress = (date) => {
    let analyticParams = {
      phone_number: user.phone_number,
      activation_code: user.activation_code,
      start_date: date.start_date,
      end_date: date.end_date,
    };

    getTokoAnalytics(BASE_URL, analyticParams)
      .then((res) => {
        setAnalyticsData(res);
        console.log("response getting analytics from cloud", res);
      })
      .catch((err) => {
        console.log("err getting analytics from cloud", err);
      });
  };

  const changeAnalyticsFilter = (filterType) => {
    let date = {};
    analytics.logEvent('analytics_filter');
    switch (filterType) {
      case "Life time":
        date = {
          end_date: moment().format("YYYY-MM-DD"),
          start_date: "2020-11-17",
        };
        setAnalyticsViewText("Life time");
        setAnalyticsDate(date);
        getFilteredOrders(date);
        break;
      case "last 7 days":
        date = {
          end_date: moment().format("YYYY-MM-DD"),
          start_date: moment().subtract(7, "days").format("YYYY-MM-DD"),
        };
        setAnalyticsViewText("Last 7 days");
        setAnalyticsDate(date);
        getFilteredOrders(date);
        break;
      case "last 30 days":
        date = {
          end_date: moment().format("YYYY-MM-DD"),
          start_date: moment().subtract(30, "days").format("YYYY-MM-DD"),
        };
        setAnalyticsViewText("Last 30 days");
        setAnalyticsDate(date);
        getFilteredOrders(date);
        break;
      case "last month":
        date = {
          end_date: moment()
            .subtract(1, "months")
            .endOf("month")
            .format("YYYY-MM-DD"),
          start_date: moment()
            .subtract(1, "months")
            .startOf("month")
            .format("YYYY-MM-DD"),
        };
        console.log("LAST MONTH", date);
        setAnalyticsViewText("Last month");
        setAnalyticsDate(date);
        getFilteredOrders(date);
        break;
      default:
        date = {
          end_date: moment().format("YYYY-MM-DD"),
          start_date: "2020-11-17",
        };
        setAnalyticsViewText("Life time");
        break;
    }
    getTokoAnalyticsPress(date);
  };

  const handleFilter = (value) => {
    analytics.logEvent('orders_filter');
    setFilter(value);
  }

  const shareStore = () => {
    let number = "";
    const MSG = `Hello! You can now order online from ${user.name} by using this link: \n\n${user.vanity_url}.${CUSTOMER_BASE_URL}\n\n Contact us at ${user.phone_number} if you need any help.\n\nThank you.`;
    if (user.phone_number.includes("+92")) {
      number = user.phone_number;
    } else {
      number = `+92${user.phone_number.substr(1)}`;
    }
    window.open(`https://wa.me/?text=${MSG}`);
    analytics.logEvent('whatsapp_share');
  };

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

                    <div className="selctCategoryMain homeFilter">
                      <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                          {analyticsViewText}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          {BUTTONS.map((categ, index) => {
                            return (
                              <Dropdown.Item
                                onSelect={() =>
                                  changeAnalyticsFilter(categ.name)
                                }
                                key={index}
                              >
                                {categ.name}
                              </Dropdown.Item>
                            );
                          })}
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>

                  <div className="homeViewSecondSectionInner">
                    <div className="col-sm-4">
                      <div className="secondSectionboxes">
                        <h5>{analytics.orders}</h5>
                        <p>Orders</p>
                      </div>
                    </div>
                    <div className="col-sm-4 doubleSideBorder">
                      <div className="secondSectionboxes">
                        <h5>
                          {analytics.revenue ? formatNum(analytics.revenue) : 0}
                        </h5>
                        <p>Revenue</p>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="secondSectionboxes">
                        <h5>{analytics.views}</h5>
                        <p>Store Views</p>
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
                      {orders.length == 0 ? (
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
                      ) : (
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

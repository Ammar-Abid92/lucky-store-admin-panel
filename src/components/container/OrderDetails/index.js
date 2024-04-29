import { updateOrderStatusOnCloud } from "../../../oscar-pos-core/actions";
import ShippingOptionDialog from "../../common/ShippingOptionDialog";
import { BASE_URL, formatCreationDate } from "../../../constants";
import placeholder from "../../../assets/icons/placeholder.png";
import { formatNum } from "../../../oscar-pos-core/constants";
import DashboardAction from "../../common/DashboardAction";
import React, { useEffect, useState } from "react";
import AppDialog from "../../common/AppDialog";
import { analytics } from "../../../firebase";
import Header from "../../common/Header";
import Slider from "../../common/Slider";
import { connect } from "react-redux";
import "./style.css";

const OrderDetails = ({ user, history, location, orders }) => {

  const [shippingService, setShippingService] = useState(false);
  const [shippingOpen, setShippingOpen] = useState(false);
  const [selected, setSelected] = useState("ViewOrders");
  const [expanded, setExpanded] = useState(false);
  const [currentOrder, setOrder] = useState({});
  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");


  useEffect(() => {

    window.scrollTo(0, 0);
    let order_id = location.pathname.split("/")[2];
    setOrder(
      history.location.state
        ? history.location.state.orders.find((x) => x._id == order_id)
        : orders.find((x) => x._id == order_id)
    );
  }, [history.location.state, location.pathname, orders]);


  const changeStatus = () => {
    setOpen(false);
    let newStatus = "";
    let { status } = currentOrder;

    switch (status) {
      case "pending":
        newStatus = "accepted";
        break;
      case "accepted":
        newStatus = "shipped";
        break;
      case "shipped":
        newStatus = "delivered";
        break;
      default:
        break;
    }

    console.log('currentOrder', currentOrder);
    let { customer, order, _id } = currentOrder;
    let params = {
      phone_number: customer.phone_number,
      _id: _id,
      status: newStatus,
      operation: newStatus,
      order: {
        ...order,
      },
      customer,
    };

    updateOrderStatusOnCloud(BASE_URL, _id, params, newStatus)
      .then((res) => {
        analytics.logEvent('order_status_changed');
        setType("");
        history.push("/ViewOrders");
      })
      .catch((err) => {
        console.log("could not update the status", err);
      });
  };

  const getAdvanceButtonColor = (status) => {
    switch (status) {
      case "accepted":
        return "#3b0c36";
      case "pending":
        return "#4ac600";
      case "declined":
        return "#e51a32";
      case "shipped":
        return "#27aae1";
      case "canceled":
        return "#cecece";
      case "cancelled":
        return "#cecece";
      case "delivered":
        return "#27aae1";
      default:
        return "red";
    }
  };

  const getCancelOrDeclineColor = (status) => {
    switch (status) {
      case "accepted":
        return "#3b0c36";
      case "pending":
        return "#e51a32";
      case "declined":
        return "#e51a32";
      case "shipped":
        return "#3b0c36";
      case "canceled":
        return "#cecece";
      case "cancelled":
        return "#cecece";
      case "delivered":
        return "#27aae1";
      default:
        return "red";
    }
  };

  const cancelOrDeclineOrder = () => {
    setOpen(false);
    let newStatus = "";
    let { status } = currentOrder;

    switch (status) {
      case "pending":
        newStatus = "declined";
        break;
      default:
        newStatus = "cancelled";
        break;
    }
    let { customer, order, _id } = currentOrder;
    let params = {
      phone_number: customer.phone_number,
      _id: _id,
      status: newStatus,
      operation: newStatus,
      order: {
        ...order,
      },
      customer,
    };
    updateOrderStatusOnCloud(BASE_URL, _id, params, newStatus).then((res) => {
      analytics.logEvent('order_status_changed');
      setType("");
      history.push("/ViewOrders");
    });
  };

  const calculateTotalBill = (total) => {
    if (currentOrder?.order) {
      if (total) {
        if (currentOrder?.order?.total_bill) {
          return currentOrder?.order?.total_bill;
        } else {
          let price = 0;
          let productsPrice = currentOrder?.order?.products.forEach(
            (product) => {
              price +=
                (product?.discount_per_item
                  ? product.price - product.discount_per_item
                  : product.price) * product.quantity;
            }
          );
          return price.toString();
        }
      } else {
        let total_bill = 0;
        // for (let prod of currentOrder?.order?.products) {
        //   total_bill += (prod.price || prod?.discountPrice) * prod?.quantity;
        // }
        return formatNum(total_bill);
      }
    }
  };
  const getColor = (status) => {
    switch (status) {
      case "accepted":
        return "#4ac600";
      case "pending":
        return "#f96a32";
      case "declined":
        return "#e51a32";
      case "shipped":
        return "#3b0c36";
      case "canceled":
        return "#cecece";
      case "cancelled":
        return "#cecece";
      case "delivered":
        return "#27aae1";
      default:
        return "red";
    }
  };

  const verifyAction = (action) => {
    setType(action);
    setOpen(true);
    // setShippingOpen(false);
  };

  return (
    <>
      <Header />
      <section className="body_Content_Section dashboardInnerSection">
        <div className="container-fluid">
          <div className="row">
            <DashboardAction
              type="OrderDetails"
              history={history}
              location={location}
              toggleExpanded={setExpanded}
              currentSelection={selected}
            />
            <div
              className={
                expanded ? "col-sm-9 marginLeftClosed" : "col-sm-10 marginLeft"
              }
            >
              <div className="RightSectionMain">
                <div
                  className="viewFirstHeading orderDetialsBack mb35"
                  onClick={(e) => {
                    e.preventDefault();
                    history.goBack();
                  }}
                >
                  <span className="innerHeaderAction">
                    <svg
                      fill="var(--mediumGray)"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
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
                  <h1>Order Detail</h1>
                </div>

                <div className="newCardBox mb30">
                  <div className="orderDetailTop">
                    <div className="orderDetailInner">
                      <div className="col-sm-3">
                        <div className="orderDetailBox">
                          <p>Order #:</p>
                          <p>{currentOrder?.name?.split?.("# ")[1]}</p>
                        </div>
                      </div>
                      <div className="col-sm-3 orderDetailBoxBorder">
                        <div className="orderDetailBox">
                          <p>Order Time:</p>
                          <p>{formatCreationDate(currentOrder?.created)}</p>
                        </div>
                      </div>

                      <div className="col-sm-3 orderDetailBoxBorderAfter">
                        <div className="orderDetailBox">
                          <p>Order Status:</p>
                          <p
                            style={{
                              color: getColor(currentOrder?.status),
                            }}
                          >
                            {currentOrder?.status}
                          </p>
                        </div>
                      </div>

                      <div className="col-sm-3">
                        <div className="orderDetailBox">
                          <p>Total Items:</p>
                          <p>
                            {currentOrder?.order &&
                              currentOrder?.order?.products?.length}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="viewFirstHeading mb20">
                  <h1 className="">Items</h1>
                </div>

                <div className="newCardBox mb35">
                  <div className="orderProductDetailMain">
                    <table className="table table-hover table-bordered viewOrderTable orderDtlTbl">
                      <thead>
                        <tr>
                          <th>Sr #</th>
                          <th></th>
                          <th>Item Name</th>
                          <th>Variants</th>
                          <th>Quantity</th>
                          <th>Unit</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentOrder?.order &&
                          currentOrder?.order?.products?.map(
                            (product, index) => {
                              return (
                                <tr key={product._id}>
                                  <td>{index + 1}</td>
                                  <td>
                                    <img
                                      src={
                                        product?.photo?.length
                                          ? product?.photo[0]
                                          : placeholder
                                      }
                                      width="50"
                                      height="50"
                                      alt="product"
                                    />
                                  </td>
                                  <td>
                                    <p className="tblproductName">
                                      {product?.name}
                                    </p>
                                    <p className="tblproductDescription">
                                      {product?.description}
                                    </p>
                                  </td>
                                  <td className="tblproductVariants">
                                    <p className="variantsColor">
                                      {product?.selected_variant_info?.color ? (
                                        <span>Color :</span>
                                      ) : null}
                                      <span
                                        style={{
                                          background:
                                            product.selected_variant_info
                                              ?.color,
                                          width: 16,
                                          height: 16,
                                          borderRadius: 4,
                                          display: "inline-block",
                                          position: "relative",
                                          top: 4,
                                        }}
                                      ></span>
                                    </p>

                                    <p className="variantsSize">
                                      {product?.selected_variant_info?.size ? (
                                        <span>Size :</span>
                                      ) : null}
                                      <span>
                                        {product?.selected_variant_info?.size}
                                      </span>
                                    </p>
                                  </td>
                                  <td>{product?.quantity}</td>
                                  <td>{product?.perUnit}</td>
                                  <td>
                                    {user?.currency ? user.currency : "Rs. "}{" "}
                                    {formatNum(
                                      Number(
                                        product?.price
                                          ? product?.price
                                          : product?.actual_price
                                      )
                                    )}
                                  </td>
                                </tr>
                              );
                            }
                          )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="viewFirstHeading mb20">
                  <h1>Customer Details</h1>
                </div>

                <div className="newCardBox">
                  <div className="orderDetailBottom">
                    <div className="orderDetailBottomCustomer">
                      <p>
                        <span>Name:</span>
                        <span>
                          {currentOrder?.customer &&
                            currentOrder?.customer.name}
                        </span>
                      </p>
                      <p>
                        <span>Number:</span>
                        <span>
                          {currentOrder?.customer &&
                            currentOrder?.customer?.phone_number}
                        </span>
                      </p>
                      <p>
                        <span>Address:</span>
                        <span>
                          {currentOrder?.customer &&
                            currentOrder?.customer?.address}
                        </span>
                      </p>
                      <p>
                        <span>City:</span>
                        <span>
                          {currentOrder?.customer &&
                            currentOrder?.customer?.city}
                        </span>
                      </p>
                      <p>
                        <span>Note:</span>
                        <span>
                          {currentOrder?.notes ? currentOrder.notes : "-"}
                        </span>
                      </p>
                      <p>
                        <span>Payment Type:</span>
                        <span className="textCapitalize">
                          {currentOrder?.payment_process == "online_payment"
                            ? " Online"
                            : currentOrder?.payment_process || "-"}
                        </span>
                      </p>
                    </div>

                    <div className="orderDetailBottomPrice">
                      <div className="viewFirstHeading">
                        <h1>&nbsp;</h1>
                      </div>
                      <p>
                        <span>Order amount:</span>
                        <span
                          style={{ fontWeight: "var(--medium-font-weight)" }}
                        >
                          {user
                            ? user?.currency
                              ? user.currency
                              : "Rs. "
                            : "Rs. "}{" "}
                          {calculateTotalBill()}
                        </span>
                      </p>

                      <p>
                        <span>Delivery charges:</span>
                        <span
                          style={{ fontWeight: "var(--medium-font-weight)" }}
                        >
                          {currentOrder?.order
                            ? currentOrder?.order?.delivery_charges === "Free"
                              ? currentOrder?.order?.delivery_charges
                              : (user
                                ? user?.currency
                                  ? user.currency
                                  : "Rs. "
                                : "Rs. ") +
                              currentOrder?.order.delivery_charges
                            : 0}
                        </span>
                      </p>
                      <p>
                        <span
                          style={{ fontWeight: "var(--medium-font-weight)" }}
                        >
                          Total Bill amount:
                        </span>
                        <span
                          style={{ fontWeight: "var(--medium-font-weight)" }}
                        >
                          {user
                            ? user?.currency
                              ? user.currency
                              : "Rs. "
                            : "Rs. "}{" "}
                          {formatNum(calculateTotalBill(true))}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {currentOrder?.status == "accepted" ||
                  currentOrder?.status == "pending" ||
                  currentOrder?.status == "shipped" ? (
                  <div className="bottomBtnCntMain">
                    <button
                      className="bottomBtnCnt"
                      style={{
                        background: "transparent",
                        borderColor: getCancelOrDeclineColor(
                          currentOrder?.status
                        ),
                        color: getCancelOrDeclineColor(currentOrder?.status),
                      }}
                      onClick={() =>
                        verifyAction(
                          currentOrder?.status === "pending"
                            ? "decline"
                            : "cancel"
                        )
                      }
                    >
                      {currentOrder?.status == "pending"
                        ? "Decline Order"
                        : "Cancel Order"}
                    </button>
                    <button
                      className="bottomBtnCnt"
                      style={{
                        color: "#fff",
                        background: getAdvanceButtonColor(currentOrder?.status),
                        borderColor: getAdvanceButtonColor(
                          currentOrder?.status
                        ),
                      }}
                      onClick={() => {
                        verifyAction(
                          currentOrder.status === "pending"
                            ? "accepted"
                            : currentOrder.status === "shipped"
                              ? "delivered"
                              : "shipped"
                        );
                        // if (currentOrder?.status === "accepted") {
                        //   setShippingOpen(true);
                        // } else {
                        //   verifyAction(
                        //     currentOrder?.status === "pending"
                        //       ? "accepted"
                        //       : currentOrder?.status === "shipped"
                        //       ? "delivered"
                        //       : "shipped"
                        //   );
                        // }
                      }}
                    >
                      {currentOrder?.status == "pending"
                        ? "Accept Order"
                        : currentOrder?.status == "accepted"
                          ? "Ship Order"
                          : currentOrder?.status == "shipped"
                            ? "Deliver Order"
                            : ""}
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <AppDialog
          handleClose={() => {
            setOpen(false);
            // setType("");
          }}
          handleAction={() => {
            if (type === "decline" || type === "cancel") cancelOrDeclineOrder();
            else changeStatus();
          }}
          setOpen={setOpen}
          type={type}
          open={open}
        />
        <ShippingOptionDialog
          open={shippingOpen && currentOrder?.status == "accepted"}
          onClose={setShippingOpen.bind(this, false)}
          handleClose={verifyAction.bind(this, "shipped")}
          handleAction={() => {
            setShippingService(true);
            setShippingOpen(false);
            setToggle(true);
          }}
          toggle={toggle}
          setToggle={setToggle}
        />
        <Slider
          shippingService={shippingService}
          setShippingService={setShippingService}
          toggle={toggle}
          setToggle={setToggle}
          orderId={currentOrder?.id}
        />
      </section>
    </>
  );
};

export default connect((state) => {
  return {
    user: state.user,
    orders: state.orders,
  };
})(OrderDetails);

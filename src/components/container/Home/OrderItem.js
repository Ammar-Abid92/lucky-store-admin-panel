import { formatCreationDate, themeStyleSheet } from "../../../constants";
import { formatNum } from "../../../oscar-pos-core/constants";
import React from "react";
import "./style.css";

const OrderItem = ({ eachOrder, history }) => {
  const navigateToDetails = (e) => {
    e.stopPropagation();
    history.push("/OrderDetails/" + eachOrder?.id);
  };

  return (
    <div className="thirdSectionBodybox" onClick={(e) => navigateToDetails(e)}>
      <div className="col-md-3 col-lg-3 col-xl-4">
        <div className="orderLeftSide">
          <p>{eachOrder.name}</p>
          <p>
            {eachOrder?.order_items + " items"}
          </p>
        </div>
      </div>
      <div className="col-md-3 col-lg-3 col-xl-4">
        <div className="orderMiddleSide">
          <p>
            Rs{" "}
            {eachOrder?.order_total}
          </p>
          {/* <p>Order Date: {formatCreationDate(eachOrder.created)}</p> */}
        </div>
      </div>
      {eachOrder.order_status === "declined" ||
        eachOrder.order_status === "delivered" ||
        eachOrder.order_status === "cancelled" ? (
        <div className="col-md-6 col-lg-6 col-xl-4">
          <div className="orderRightActionSide">
            <div className="OrderListStatusMain">
              <span
                style={{
                  backgroundColor:
                    eachOrder.order_status === "declined"
                      ? themeStyleSheet.red
                      : eachOrder.order_status === "delivered"
                        ? themeStyleSheet.brightGreen
                        : eachOrder.order_status === "cancelled"
                          ? themeStyleSheet.mainColor
                          : themeStyleSheet.mainColor,
                }}
              ></span>
              <span
                className="OrderListStatus"
                style={{
                  color:
                    eachOrder.order_status === "declined"
                      ? themeStyleSheet.red
                      : eachOrder.order_status === "delivered"
                        ? themeStyleSheet.brightGreen
                        : eachOrder.order_status === "cancelled"
                          ? themeStyleSheet.mainColor
                          : themeStyleSheet.mainColor,
                }}
              >
                {eachOrder.order_status}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="col-md-6 col-lg-6 col-xl-4">
          <div className="orderRightActionSide">
            <button
              className="orderRightActionSidebutton cancelOrder"
              style={{
                backgroundColor: themeStyleSheet.white,
                border: `1px solid ${eachOrder.order_status === "pending"
                  ? themeStyleSheet.red
                  : themeStyleSheet.mainColor
                  }`,
                color:
                  eachOrder.order_status === "pending"
                    ? themeStyleSheet.red
                    : themeStyleSheet.mainColor,
              }}
              onClick={(e) => navigateToDetails(e)}
            >
              {eachOrder.order_status === "pending" ? "Decline" : "Cancel"}
            </button>

            <button
              className="orderRightActionSidebutton deliverOrder"
              style={{
                backgroundColor:
                  eachOrder.order_status === "pending"
                    ? themeStyleSheet.brightGreen
                    : eachOrder.order_status === "shipped"
                      ? themeStyleSheet.skyBlue
                      : eachOrder.order_status === "delivered"
                        ? themeStyleSheet.mainColor
                        : themeStyleSheet.mainColor,
                border: `1px solid ${eachOrder.order_status === "pending"
                  ? themeStyleSheet.brightGreen
                  : eachOrder.order_status === "shipped"
                    ? themeStyleSheet.skyBlue
                    : eachOrder.order_status === "delivered"
                      ? themeStyleSheet.mainColor
                      : themeStyleSheet.mainColor
                  }`,
                color: themeStyleSheet.white,
              }}
              onClick={(e) => navigateToDetails(e)}
            >
              {eachOrder.order_status === "pending"
                ? "Accept"
                : eachOrder.order_status === "shipped"
                  ? "Deliver"
                  : "Ship Order"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderItem;

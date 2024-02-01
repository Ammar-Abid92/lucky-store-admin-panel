import { formatCreationDate, themeStyleSheet } from "../../../constants";
import { formatNum } from "../../../oscar-pos-core/constants";
import React from "react";
import "./style.css";

const OrderItem = ({ item, history, user }) => {
  const navigateToDetails = (e) => {
    e.stopPropagation();
    history.push("/OrderDetails/" + item._id);
  };

  return (
    <div className="thirdSectionBodybox" onClick={(e) => navigateToDetails(e)}>
      <div className="col-md-3 col-lg-3 col-xl-4">
        <div className="orderLeftSide">
          <p>{item.name}</p>
          <p>
            {item.order.products.length +
              (item.order.products.length > 1 ? " items" : " item")}
          </p>
        </div>
      </div>
      <div className="col-md-3 col-lg-3 col-xl-4">
        <div className="orderMiddleSide">
          <p>
            {user ? (user.currency ? user.currency : "Rs. ") : "Rs. "}{" "}
            {formatNum(item.order.total_bill)}
          </p>
          <p>Order Date: {formatCreationDate(item.created)}</p>
        </div>
      </div>
      {item.status === "declined" ||
        item.status === "delivered" ||
        item.status === "cancelled" ? (
        <div className="col-md-6 col-lg-6 col-xl-4">
          <div className="orderRightActionSide">
            <div className="OrderListStatusMain">
              <span
                style={{
                  backgroundColor:
                    item.status === "declined"
                      ? themeStyleSheet.red
                      : item.status === "delivered"
                        ? themeStyleSheet.brightGreen
                        : item.status === "cancelled"
                          ? themeStyleSheet.mainColor
                          : themeStyleSheet.mainColor,
                }}
              ></span>
              <span
                className="OrderListStatus"
                style={{
                  color:
                    item.status === "declined"
                      ? themeStyleSheet.red
                      : item.status === "delivered"
                        ? themeStyleSheet.brightGreen
                        : item.status === "cancelled"
                          ? themeStyleSheet.mainColor
                          : themeStyleSheet.mainColor,
                }}
              >
                {item.status}
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
                border: `1px solid ${item.status === "pending"
                    ? themeStyleSheet.red
                    : themeStyleSheet.mainColor
                  }`,
                color:
                  item.status === "pending"
                    ? themeStyleSheet.red
                    : themeStyleSheet.mainColor,
              }}
              onClick={(e) => navigateToDetails(e)}
            >
              {item.status === "pending" ? "Decline" : "Cancel"}
            </button>

            <button
              className="orderRightActionSidebutton deliverOrder"
              style={{
                backgroundColor:
                  item.status === "pending"
                    ? themeStyleSheet.brightGreen
                    : item.status === "shipped"
                      ? themeStyleSheet.skyBlue
                      : item.status === "delivered"
                        ? themeStyleSheet.mainColor
                        : themeStyleSheet.mainColor,
                border: `1px solid ${item.status === "pending"
                    ? themeStyleSheet.brightGreen
                    : item.status === "shipped"
                      ? themeStyleSheet.skyBlue
                      : item.status === "delivered"
                        ? themeStyleSheet.mainColor
                        : themeStyleSheet.mainColor
                  }`,
                color: themeStyleSheet.white,
              }}
              onClick={(e) => navigateToDetails(e)}
            >
              {item.status === "pending"
                ? "Accept"
                : item.status === "shipped"
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

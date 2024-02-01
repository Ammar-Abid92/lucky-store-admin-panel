import React from "react";
import { formatNum } from "../../../oscar-pos-core/constants";

const ListItem = ({ order, history, index, user, activePage, allOrders }) => {
  const calculateTotalBill = () => {
    if (order.order.total_bill) {
      return order.order.total_bill;
    } else {
      let total_bill = 0;
      for (let prod of order.order.products) {
        total_bill += prod.price;
      }
      return total_bill;
    }
  };

  const getColor = () => {
    let { status } = order;
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

  return (
    <tr
      className="text-center align-middle"
      onClick={() =>
        history.push({
          pathname: "/OrderDetails/" + order._id,
          state: {
            orders: allOrders
          }
        })
      }
    >
      <td scope="row">{(activePage - 1) * 10 + (index + 1)}</td>
      <td>{order.name.slice(8)}</td>
      <td>
        {order.customer && (
          <p className="productScreenproductName marBot0">
            {order.customer.name}
          </p>
        )}
      </td>
      <td>{order.customer && order.customer.address}</td>
      <td>
        {user ? (user.currency ? user.currency : "Rs. ") : "Rs. "}{" "}
        {formatNum(calculateTotalBill())}
      </td>
      <td>
        <span
          style={{
            color: getColor(),
          }}
        >
          {order.status}
        </span>
      </td>
      <td className="tblAction">
        <button
          className="btn btn-primary appBorderBtn"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            history.push({
              pathname: "/OrderDetails/" + order._id,
              state: {
                orders: allOrders
              }
            });
          }}
        >
          {"View Details"}
        </button>
      </td>
    </tr>
  );
};

export default ListItem;

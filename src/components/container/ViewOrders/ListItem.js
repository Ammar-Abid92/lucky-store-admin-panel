import React, { useEffect, useState } from "react";
import { formatNum } from "../../../oscar-pos-core/constants";
import useGetCollectionData from "../../../hooks/getData";

const ListItem = ({ order, history, index, activePage, allOrders }) => {
  const [customerName, setCustomerName] = useState("");

  const customers = useGetCollectionData('customers');

  const calculateTotalBill = () => {
    if (order.order_total) {
      return order.order_total;
    } else {
      let total_bill = 0;
      for (let i = 0; i < order?.products?.length; i++) {
        total_bill += order?.products[i]?.price
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

  useEffect(() => {
    if (customers?.length > 0) {
      customers?.forEach((cust) => {
        if (cust?.id === order?.ordered_by) setCustomerName(cust?.name);
      })
    }
  }, [customers]);

  return (
    <tr
      className="text-center align-middle"
      onClick={() =>
        history.push({
          pathname: "/OrderDetails/" + order.id,
          state: {
            orders: allOrders
          }
        })
      }
    >
      <td scope="row">{(activePage - 1) * 10 + (index + 1)}</td>
      <td>{order.name}</td>
      <td>
        {order.ordered_by && (
          <p className="productScreenproductName marBot0">
            {customerName}
          </p>
        )}
      </td>
      <td>{order?.delivery_address}</td>
      <td>
        Rs{" "}{formatNum(calculateTotalBill())}
      </td>
      <td>
        <span
          style={{
            color: getColor(),
          }}
        >
          {order.order_status}
        </span>
      </td>
      <td className="tblAction">
        <button
          className="btn btn-primary appBorderBtn"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            history.push({
              pathname: "/OrderDetails/" + order.id,
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

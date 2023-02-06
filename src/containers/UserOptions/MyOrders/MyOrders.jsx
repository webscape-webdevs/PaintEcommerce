import React, { useEffect } from "react";
import "./myOrders.css";
import Navbar from "../../../components/Navbar/Navbar";
import { getUserData } from "../../../slices/userSlice";
import { useSelector } from "react-redux";

function MyOrders() {
  const { orders } = useSelector((state) => state.userSlice);

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="myOrders">
      <Navbar />
      <table>
        <thead>
          <tr>
            <th>Order Id</th>
            <th style={{ width: "25%" }}>Item Names</th>
            <th style={{ width: "10%" }}>Date</th>
            <th style={{ width: "10%" }}>Quantity</th>
            <th style={{ width: "10%" }}>Total Price</th>
            <th style={{ width: "10%" }}>Status</th>
            <th style={{ width: "5%" }}>Details</th>
          </tr>
        </thead>

        <tbody>
          {orders &&
            orders.map((e) => {
              return (
                <tr>
                  <td>e._id</td>
                  <td>e.itemNames</td>
                  <td>e.createdAt</td>
                  <td>e.quantity</td>
                  <td>e.totalPrice</td>
                  <td>e.orderStatus</td>
                  <td>
                    <button>Details</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default MyOrders;

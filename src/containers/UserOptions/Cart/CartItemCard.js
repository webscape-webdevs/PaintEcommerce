import React from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="CartItemCard">
      <img src={item.image} alt="ssa" />
      <div>
        <Link to={`/productDetails/${item.productId}`}>{item.productName}</Link>
        <span>{`Shade Color Code: ${item.shadeColorCode}`}</span>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span>Shade Color:</span>
          <div style={{ marginLeft: "10px", width: "20px", height: "20px", backgroundColor: `${item.shadeColor}` }}></div>
        </div>

        <span>{`Size: ${item.size}`}</span>
        <span>{`Price: ₹${item.finalPrice}`}</span>
        <p onClick={() => deleteCartItems(item._id)}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCard;

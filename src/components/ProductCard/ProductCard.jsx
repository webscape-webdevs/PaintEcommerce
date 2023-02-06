import React from "react";
import { Link } from "react-router-dom";
import "./productCard.css";
// import { Rating } from "@material-ui/lab";

const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Link className="productCard" to={`/productDetails/${product._id}`}>
      <img src={product.images[0].url} alt={product.productName} />
      <p>{product.productName}</p>
      {/* <div>
        <Rating {...options} /> <span className="productCardSpan"> ({product.numOfReviews} Reviews)</span>
      </div> */}

      {/* {product.discount !== 0 ? (
        <>
          <div className="productCard-discountprice">
            <span>{`₹${product.finalPrice}`}</span>
            <span style={{ textDecoration: "line-through", textDecorationThickness: "2px", color: " #808090" }}>{`₹${product.price}`}</span>
            <span>{`${product.discount}% OFF`}</span>
          </div>
        </>
      ) : (
        <>
          <span style={{ fontSize: "20px" }}>{`₹${product.price}`}</span>
        </>
      )} */}
    </Link>
  );
};

export default ProductCard;

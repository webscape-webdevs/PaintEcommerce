import React, { Fragment, useEffect, useState } from "react";

import "./productDetails.css";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/Loader/Loader";

import Carousel from "react-material-ui-carousel";

import Navbar from "../../components/Navbar/Navbar";

import ProductCalculator from "../../components/ProductCalculator/ProductCalculator";
import { Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useParams } from "react-router-dom";

import DummyProductDetailsImage from "../../sampleImages/dummyProductImages/image1.jpg";
import { addToCart } from "../../slices/cartSlice";
import axios from "axios";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import CalculateIcon from "@mui/icons-material/Calculate";

const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();

  const [product, setProduct] = useState([]);

  const [selectedShadeColorCode, setSelectedShadeColorCode] = useState("");
  const [selectedShadeColor, setSelectedShadeColor] = useState("");
  const [selectedShadeImages, setSelectedShadeImagees] = useState([]);
  const [selectedProductSize, setSelectedProductSize] = useState(0);
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [showColorCatlog, setShowColorCatlog] = useState(false);
  const [primaryColor, setPrimaryColor] = useState({});
  const [loading, setLoading] = useState(true);

  const { productId } = useParams();

  useEffect(() => {
    axios
      .get(`/api/product/get-product-details?productId=${productId}`)
      .then(({ data }) => {
        setProduct(data.productDetails[0]);
        setSelectedShadeColorCode(data.productDetails[0].availableColors[0].shades[0].shadeColorCode);
        setSelectedShadeColor(data.productDetails[0].availableColors[0].shades[0].shadeColor);
        setSelectedShadeImagees(data.productDetails[0].availableColors[0].shades[0].shadeImages);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [productId]);

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    let myForm = new FormData();

    myForm.set("productId", productId);
    myForm.set("productName", product.productName);
    myForm.set("vendorId", product.vendorId);
    myForm.set("quantity", quantity);
    myForm.set("shadeColorCode", selectedShadeColorCode);
    myForm.set("shadeColor", selectedShadeColor);
    myForm.set("size", product.sizes[selectedProductSize].size);
    myForm.set("finalPrice", product.sizes[selectedProductSize].finalPrice);
    myForm.set("image", product.images[0].url);

    dispatch(addToCart(myForm));
  };

  const handleChangeSelectedColor = (color) => {
    setSelectedShadeColorCode(color.shadeColorCode);
    setSelectedShadeColor(color.shadeColor);
    setSelectedShadeImagees(color.shadeImages);
    setShowColorCatlog(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "white",
    borderRadius: "10px",
    border: "0",
    boxShadow: 24,
    p: 4,
    outline: "none",
  };

  const ColorCatalog = () => {
    return (
      <div className="availableColors">
        <div className="availableColors-grid">
          {primaryColor &&
            primaryColor.shades &&
            primaryColor.shades.map((shade, index) => {
              return (
                <div className="availableColors-grid-item" key={index + 1} onClick={() => handleChangeSelectedColor(shade)}>
                  <span style={{ fontSize: "15px", marginBottom: "10px" }}>{shade.shadeColorCode}</span>
                  <div className="colorCard" style={{ backgroundColor: `${shade.shadeColor}` }}></div>
                </div>
              );
            })}
        </div>
      </div>
    );
  };

  const openColorCatalog = (color) => {
    setPrimaryColor(color);
    setShowColorCatlog(true);
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        product &&
        product._id && (
          <div className="ProductDetails">
            <Navbar />
            <div className="ProductDetails-Container">
              <div className="ProductDetails-AfterNavbar">
                <div className="leftBlock" style={{ flexDirection: "row", alignItems: "flex-start", flex: "130%" }}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {product && product._id && product.category === "paint"
                      ? selectedShadeImages.map((item, i) => (
                          <img
                            className="CarouselImage-side"
                            style={{ width: "100px", height: "100px", marginBottom: "20px", marginRight: "20px" }}
                            key={i}
                            src={item.url}
                            alt={`${i} Slide`}
                          />
                        ))
                      : product.images.map((item, i) => (
                          <img
                            className="CarouselImage-side"
                            style={{ width: "100px", height: "100px", marginBottom: "20px", marginRight: "20px" }}
                            key={i}
                            src={item.url}
                            alt={`${i} Slide`}
                          />
                        ))}
                  </div>

                  <div className="productImages">
                    <Carousel>
                      {product && product._id && product.category === "paint"
                        ? selectedShadeImages.map((item, i) => <img className="CarouselImage" key={i} src={item.url} alt={`${i} Slide`} />)
                        : product.images.map((item, i) => <img className="CarouselImage" key={i} src={item.url} alt={`${i} Slide`} />)}
                    </Carousel>
                  </div>
                </div>

                <div>
                  <div className="detailsBlock-1">
                    <h2 style={{ marginTop: "0" }}>{product.productName}</h2>
                    <p>Product # {product._id}</p>
                  </div>
                  {product && product.availableColors && product.availableColors.length !== 0 && (
                    <div className="detailsBlock-2">
                      <span style={{ fontSize: "20px", fontWeight: "500", marginBottom: "20px" }}>Selected Color: </span>
                      <div className="selectedColor-div">
                        <div className="selectedColor">
                          <span style={{ fontSize: "20px", fontWeight: "500", marginBottom: "10px", color: "#666666" }}>
                            {selectedShadeColorCode}
                          </span>
                          <div className="selecteColorCard" style={{ backgroundColor: `${selectedShadeColor}` }}></div>
                        </div>
                      </div>
                      <span style={{ fontSize: "20px", fontWeight: "500", marginBottom: "20px", marginTop: "20px" }}>Available Colors: </span>
                      <div className="availableColors">
                        <div className="availableColors-grid">
                          {product &&
                            product.availableColors &&
                            product.availableColors.map((color, index) => {
                              return (
                                <div className="availableColors-grid-item" key={index + 1} onClick={() => openColorCatalog(color)}>
                                  <span style={{ fontSize: "15px", marginBottom: "10px" }}>{color.primaryColorCode}</span>
                                  <div className="colorCard" style={{ backgroundColor: `${color.primaryColor}` }}></div>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="detailsBlock-3">
                    <div className="sizes">
                      <div className="sizes-grid">
                        {product &&
                          product.sizes &&
                          product.sizes.map((size, index) => {
                            return (
                              <div
                                className="sizes-grid-item"
                                key={index + 1}
                                style={
                                  selectedProductSize === index
                                    ? { backgroundColor: "#0597f9", color: "white" }
                                    : { backgroundColor: "white", color: "black" }
                                }
                                onClick={() => setSelectedProductSize(index)}
                              >
                                <span style={{ marginRight: "5px" }}>{size.size}</span>
                                <span>{product.unit}</span>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                    {product.sizes && product.sizes[selectedProductSize].discount !== 0 ? (
                      <>
                        <span
                          style={{
                            textDecoration: "line-through",
                            textDecorationThickness: "3px",
                            textDecorationColor: "#0597f9",
                            paddingRight: "10px",
                            font: "400 1.5vmax Franklin Gothic Medium",
                            color: "rgba(17, 17, 17, 0.795)",
                          }}
                        >{`M.R.P.:  ₹${product.sizes[selectedProductSize].price}`}</span>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "baseLine",
                            color: "rgba(17, 17, 17, 0.795)",
                            font: '400 0.9vmax "Franklin Gothic Medium" ',
                            marginTop: "20px",
                            marginBottom: "10px",
                          }}
                        >
                          <span style={{ paddingRight: "10px", fontSize: "1.5vmax" }}>Discount.:</span>
                          <span style={{ color: "#0597f9", paddingRight: "12px", fontSize: "1.7vmax" }}>
                            {` ₹${product.sizes[selectedProductSize].finalPrice} `}
                          </span>
                          <span>{` ${product.sizes[selectedProductSize].discount}% OFF`} </span>
                        </div>
                      </>
                    ) : (
                      <span
                        style={{
                          paddingRight: "10px",
                          font: "400 1.5vmax Franklin Gothic Medium",
                          color: "rgba(17, 17, 17, 0.795)",
                        }}
                      >{`M.R.P.:  ₹${product.sizes && product.sizes[selectedProductSize].price}`}</span>
                    )}

                    <h1>{}</h1>
                    <div className="detailsBlock-3-1">
                      <div className="detailsBlock-3-1-1">
                        <button onClick={decreaseQuantity}>-</button>
                        <input readOnly type="number" value={quantity} />
                        <button onClick={increaseQuantity}>+</button>
                        <span className="openCalculatorButton" onClick={() => setCalculatorOpen(true)}>
                          <CalculateIcon style={{ marginRight: "6px", height: "30px", width: "25px" }} />
                          Calculate
                        </span>
                      </div>
                      <button
                        disabled={product.Stock < 1 ? true : false}
                        onClick={addToCartHandler}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <ShoppingBasketIcon style={{ marginRight: "10px", height: "40px", width: "30px" }} />
                        Add to Cart
                      </button>
                    </div>

                    <p>
                      Status:
                      <b style={product.Stock < 1 ? { color: "red", marginLeft: "10px" } : { color: "green", marginLeft: "10px" }}>
                        {product.Stock < 1 ? "OutOfStock" : "InStock"}
                      </b>
                    </p>
                  </div>

                  {/* <div className="detailsBlock-4">
                  Description : <p>{product.description}</p>
                </div> */}

                  {/* <button onClick={submitReviewToggle} className="submitReview">
              Submit Review
             </button> */}
                </div>
              </div>
              <div className="ProductDetails-AfterNavbar2">
                <div className="keyFeatures-div">
                  <h2>Key Features</h2>
                </div>
                <div className="description-div">
                  <h1>Description</h1>
                  <div className="descriptionText">{product.description}</div>
                </div>
              </div>
            </div>

            {/* <h3 className="reviewsHeading">REVIEWS</h3>

        <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={submitReviewToggle}>
          <DialogTitle>Submit Review</DialogTitle>
          <DialogContent className="submitDialog">
            <Rating onChange={(e) => setRating(e.target.value)} value={rating} size="large" />

            <textarea className="submitDialogTextArea" cols="30" rows="5" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
          </DialogContent>
          <DialogActions>
            <Button onClick={submitReviewToggle} color="secondary">
              Cancel
            </Button>
            <Button onClick={reviewSubmitHandler} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>

        {product.reviews && product.reviews[0] ? (
          <div className="reviews">{product.reviews && product.reviews.map((review) => <ReviewCard key={review._id} review={review} />)}</div>
        ) : (
          <p className="noReviews">No Reviews Yet</p>
        )} */}
            <Modal
              open={calculatorOpen}
              onClose={() => setCalculatorOpen(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" style={{ textAlign: "center" }}>
                  Calculate Product Required
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                    <ProductCalculator productCalculationMultiplier={product.productCalculationMultiplier} unit={product.unit} />
                  </div>
                </Typography>
              </Box>
            </Modal>

            <Modal
              open={showColorCatlog}
              onClose={() => setShowColorCatlog(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" style={{ textAlign: "center" }}>
                  Select Shade
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                    <ColorCatalog />
                  </div>
                </Typography>
              </Box>
            </Modal>
          </div>
        )
      )}
    </Fragment>
  );
};

export default ProductDetails;

import React, { Fragment, useEffect, useState } from "react";
import "./productsPage.css";
import { useSelector, useDispatch } from "react-redux";

import Loader from "../../components/Loader/Loader";
import ProductCard from "../../components/ProductCard/ProductCard";
import Pagination from "react-js-pagination";

// import { useAlert } from "react-alert";

import Navbar from "../../components/Navbar/Navbar";
import { Slider, Typography } from "@mui/material";

const categories = ["Paints", "Cement", "Bricks", "Other Materials"];
const brands = ["Asian Paints", "Dulux Paints", "Shalimar Paints", "Nerolac Paints"];

const Products = ({ match }) => {
  const dispatch = useDispatch();

  // const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const { products, loading, error } = useSelector((state) => state.productSlice);

  const productsCount = 2;
  const resultPerPage = 10;
  const filteredProductsCount = 2;

  // const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  let count = filteredProductsCount;

  // useEffect(() => {
  //   if (error) {
  //     alert.error(error);
  //     dispatch(clearErrors());
  //   }

  //   dispatch(getProduct(keyword, currentPage, price, category, ratings));
  // }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);

  return (
    <div className="productsPage">
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className="productsPage-AfterNavbar">
          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider value={price} onChange={priceHandler} valueLabelDisplay="auto" aria-labelledby="range-slider" min={0} max={25000} />

            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li className="category-link" key={category} onClick={() => setCategory(category)}>
                  {category}
                </li>
              ))}
            </ul>

            <Typography>Brands</Typography>
            <ul className="categoryBox">
              {brands.map((brand) => (
                <li className="category-link" key={brand} onClick={() => setCategory(brand)}>
                  {brand}
                </li>
              ))}
            </ul>
            {/* <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset> */}
          </div>
          <div className="productPage-main">
            <div className="productsPageHeading">
              <span className="productsPageHeading-text">Products</span>
            </div>

            <div className="products">{products && products.map((product) => <ProductCard key={product._id} product={product} />)}</div>

            {resultPerPage < count && (
              <div className="paginationBox">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resultPerPage}
                  totalItemsCount={productsCount}
                  onChange={setCurrentPageNo}
                  nextPageText="Next"
                  prevPageText="Prev"
                  firstPageText="1st"
                  lastPageText="Last"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;

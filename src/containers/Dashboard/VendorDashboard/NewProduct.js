import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";

import Navbar from "../../../components/Navbar/Navbar";

import SideBar from "./Sidebar";

import { Button } from "@mui/material";
import AddColors from "./AddColors";
import { createProduct } from "../../../slices/vendorSlice";

const NewProduct = ({ history }) => {
  const dispatch = useDispatch();

  const loading = false;

  const [productName, setProductName] = useState("");
  const [brand, setBrand] = useState("");
  const [availableColors, setAvailableColors] = useState([]);

  const [sizes, setSizes] = useState([
    {
      size: "",
      price: "",
      discount: "",
      finalPrice: "",
    },
  ]);

  const [productCalculationMultiplier, setProductCalculationMultiplier] = useState(0);
  const [unit, setUnit] = useState("");

  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([{ url: "" }]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [firstContainer, setFirstContainer] = useState(true);

  const categories = ["paint", "cement", "bricks", "otherMaterials"];

  // useEffect(() => {
  //   if (error) {
  //     alert.error(error);
  //     dispatch(clearErrors());
  //   }

  //   if (success) {
  //     alert.success("Product Created Successfully");
  //     history.push("/admin/dashboard");
  //     dispatch({ type: NEW_PRODUCT_RESET });
  //   }
  // }, [dispatch, alert, error, history, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    if (category === "paint") {
      dispatch(
        createProduct({ productName, description, category, brand, availableColors, sizes, productCalculationMultiplier, unit, stock, images })
      );
    } else {
      dispatch(createProduct({ productName, description, category, brand, sizes, productCalculationMultiplier, unit, stock, images }));
    }
  };

  const addSizeField = (e) => {
    e.preventDefault();
    setSizes([
      ...sizes,
      {
        size: "",
        price: "",
        discount: "",
        finalPrice: "",
      },
    ]);
  };

  const removeSizeField = (sizeIndex) => {
    let newFormValues = [...sizes];
    newFormValues.splice(sizeIndex, 1);
    setSizes(newFormValues);
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([{ url: "" }]);
    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview(reader.result);
          let newImage = [...images];
          newImage[0].url = reader.result;
          setImages(newImage);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const onChangeSize = (e, sizeIndex) => {
    if (e.target.name === "size") {
      let newValues = [...sizes];
      newValues[sizeIndex].size = e.target.value;
      setSizes(newValues);
    } else if (e.target.name === "price") {
      let newValues = [...sizes];
      newValues[sizeIndex].price = e.target.value;
      setSizes(newValues);
    } else if (e.target.name === "discount") {
      let newValues = [...sizes];
      newValues[sizeIndex].discount = e.target.value;
      setSizes(newValues);
    } else if (e.target.name === "finalPrice") {
      let newValues = [...sizes];
      newValues[sizeIndex].finalPrice = e.target.value;
      setSizes(newValues);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#eaeff9" }}>
      <Navbar />
      <div className="dashboard">
        <SideBar />
        {firstContainer ? (
          <div className="newProductContainer">
            <h1 style={{ color: "#0597f9", textAlign: "center", fontSize: "40px" }}>Create Product</h1>
            <form className="createProductForm" encType="multipart/form-data">
              <div style={{ display: "flex", width: "100%" }}>
                <div className="inputField">
                  <label>Product Name</label>
                  <input type="text" placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} />
                </div>

                <div className="textareaField">
                  <label>Description</label>
                  <textarea
                    placeholder="Product Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    cols="30"
                    rows="1"
                  ></textarea>
                </div>

                <div className="inputField">
                  <label>Brand</label>
                  <input placeholder="Product Brand" value={brand} onChange={(e) => setBrand(e.target.value)} cols="30" rows="1"></input>
                </div>

                <div className="inputField">
                  <label>Category</label>
                  <select onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Choose Category</option>
                    {categories.map((cate) => (
                      <option key={cate} value={cate}>
                        {cate}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <button onClick={addSizeField} className="buttons">
                  Add Size
                </button>
              </div>
              <div className="sizeDiv">
                {sizes &&
                  sizes.map((size, sizeIndex) => {
                    return (
                      <div className="sizeDiv-item" key={sizeIndex + 1}>
                        <span style={{ marginRight: "20px", fontWeight: "500", fontSize: "20px", marginTop: "40px", color: "#0597f9" }}>
                          Size: {sizeIndex + 1}{" "}
                        </span>
                        <div className="inputField">
                          <label>Size</label>
                          <input type="number" name="size" placeholder="Size" value={size.size} onChange={(e) => onChangeSize(e, sizeIndex)} />
                        </div>
                        <div className="inputField">
                          <label>Price</label>
                          <input type="number" name="price" placeholder="Price" value={size.price} onChange={(e) => onChangeSize(e, sizeIndex)} />
                        </div>
                        <div className="inputField">
                          <label>Discount</label>
                          <input
                            type="number"
                            name="discount"
                            placeholder="Discount"
                            value={size.discount}
                            onChange={(e) => onChangeSize(e, sizeIndex)}
                          />
                        </div>
                        <div className="inputField">
                          <label>Final Price</label>
                          <input
                            type="number"
                            name="finalPrice"
                            placeholder="Final Price"
                            value={size.finalPrice}
                            onChange={(e) => onChangeSize(e, sizeIndex)}
                          />
                        </div>
                        <div>
                          <button
                            onClick={() => removeSizeField(sizeIndex)}
                            className="buttons"
                            style={{ width: "100px", margin: "0", marginTop: "30px" }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div style={{ display: "flex", marginTop: "20px" }}>
                <div className="inputField">
                  <label>Product Required per sq.m</label>
                  <input
                    type="number"
                    placeholder="Product Calculation Multiplier"
                    value={productCalculationMultiplier}
                    onChange={(e) => setProductCalculationMultiplier(e.target.value)}
                  />
                </div>

                <div className="inputField">
                  <label>Unit of Product</label>
                  <input type="text" placeholder="Unit (e.g. liter, kg, etc...)" value={unit} onChange={(e) => setUnit(e.target.value)} />
                </div>

                <div className="inputField">
                  <label>Stock</label>
                  <input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} />
                </div>
              </div>

              <div id="createProductFormFile" className="selectImage" style={{ marginTop: "10px" }}>
                <label>Product Image</label>
                <input type="file" name="avatar" accept="image/*" onChange={createProductImagesChange} />
              </div>

              <div id="createProductFormImage" className="imagePreview">
                <img src={images[0].url} alt="Product Preview" />
              </div>

              {category && category === "paint" ? (
                <button onClick={() => setFirstContainer(false)} className="createButton">
                  Next
                </button>
              ) : (
                <button id="createProductBtn" onClick={createProductSubmitHandler} disabled={loading ? true : false} className="createButton">
                  Create
                </button>
              )}
            </form>
          </div>
        ) : (
          <AddColors
            availableColors={availableColors}
            setAvailableColors={setAvailableColors}
            firstContainer={firstContainer}
            setFirstContainer={setFirstContainer}
            createProductSubmitHandler={createProductSubmitHandler}
          />
        )}
      </div>
    </div>
  );
};

export default NewProduct;

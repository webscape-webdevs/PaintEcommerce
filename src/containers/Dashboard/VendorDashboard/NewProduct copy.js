import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";

import Navbar from "../../../components/Navbar/Navbar";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import SideBar from "./Sidebar";

import { Button } from "@mui/material";

const NewProduct = ({ history }) => {
  const dispatch = useDispatch();

  const loading = false;

  const [productName, setProductName] = useState("");
  const [brand, setBrand] = useState("");
  const [availableColors, setAvailableColors] = useState([
    {
      primaryColor: "",
      primaryColorCode: "",
      shades: [
        {
          shadeColorCode: "",
          shadeColor: "",
          shadeImages: [
            {
              publicId: "",
              url: "",
            },
          ],
        },
      ],
    },
  ]);

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

  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

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

    let discountConvert = discount / 100;
    let finalPrice = price - price * discountConvert;

    const myForm = new FormData();

    myForm.set("productName", productName);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("brand", brand);
    myForm.set("availableColors", availableColors);
    myForm.set("sizes", sizes);
    myForm.set("productCalculationMultiplier", productCalculationMultiplier);
    myForm.set("unit", unit);
    myForm.set("stock", stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    // dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Navbar />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form className="createProductForm" encType="multipart/form-data" onSubmit={createProductSubmitHandler}>
            <h1>Create Product</h1>

            <div>
              <SpellcheckIcon />
              <input type="text" placeholder="Product Name" required value={productName} onChange={(e) => setProductName(e.target.value)} />
            </div>
            <div>
              <AttachMoneyIcon />
              <input type="number" placeholder="Price" required onChange={(e) => setPrice(e.target.value)} />
            </div>

            <div>
              <AttachMoneyIcon />
              <input type="number" placeholder="Discount" required onChange={(e) => setDiscount(e.target.value)} />
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <StorageIcon />
              <input type="number" placeholder="Stock" required onChange={(e) => setStock(e.target.value)} />
            </div>

            <div id="createProductFormFile">
              <input type="file" name="avatar" accept="image/*" onChange={createProductImagesChange} multiple />
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button id="createProductBtn" type="submit" disabled={loading ? true : false}>
              Create
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;

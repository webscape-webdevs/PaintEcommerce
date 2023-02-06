import React, { useEffect, useState } from "react";
import "./landingPage.css";
import Navbar from "../../components/Navbar/Navbar";
import ProductCard from "../../components/ProductCard/ProductCard";
import PumaShoes from "../../sampleImages/pumaShoes.png";
import Hero from "../../sampleImages/hero7.jpg";

function LandingPage() {
  const dummyAd = {
    productImage: PumaShoes,
    productTitle: "Test",
    productDescription: "TestDescription",
    productPrice: "90",
    productDiscount: "20",
    productRating: 3,
  };

  return (
    <div className="landingPage">
      <Navbar />
      <div className="landingPage-hero" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="heroQuotes" style={{ position: "absolute", height: "100%", width: "100%", top: "200px" }}>
          <h1 style={{ position: "absolute", fontSize: "70px", color: "white", left: "300px" }}>Design Your Home </h1>
          <h1 style={{ position: "absolute", fontSize: "70px", color: "white", left: "760px", top: "90px" }}>With Passion </h1>
        </div>

        <img src={Hero} alt="" />
      </div>
      <div className="landingPage-afterHero">
        {/* <div style={{ display: "flex" }}>
          <ProductCard ad={dummyAd} />
          <ProductCard ad={dummyAd} />
          <ProductCard ad={dummyAd} />
          <ProductCard ad={dummyAd} />
        </div>
        <div style={{ display: "flex" }}>
          <ProductCard ad={dummyAd} />
          <ProductCard ad={dummyAd} />
          <ProductCard ad={dummyAd} />
          <ProductCard ad={dummyAd} />
        </div> */}
      </div>
    </div>
  );
}

export default LandingPage;

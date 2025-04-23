import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./ShopBanner.css"; 

const ShopBanner = () => {
  return (
    <section className="shop-banner">
      {/* 🔥 Overlay */}
      <div className="overlay"></div>

      {/* Content on top of overlay */}
      <div className="content">
        <p className="subheading">Buy Health Foods At Our Store</p>
        <h1 className="title ">SHOP CROPS</h1>
        <div className="underline"></div>
        <nav className="breadcrumb-container">
          <Link to="/" className="breadcrumb-link">Home</Link> ➝  
          <Link to="/crops" className="breadcrumb-link">Shop Crops</Link>
        </nav>
      </div>
    </section>
  );
};

export default ShopBanner;

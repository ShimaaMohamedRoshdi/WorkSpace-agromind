import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./Bannerorganic.css"; 

const Bannerorganic = () => {
  return (
    <section className="shop-banner2">
      {/* 🔥 Overlay */}
      <div className="overlayy"></div>

      {/* Content on top of overlay */}
      <div className="contentt">
        <p className="subheadingg">Buy Health Foods At Our Store</p>
        <h1 className="titlee ">SHOP OrganicPesticides</h1>
        <div className="underline"></div>
        <nav className="breadcrumb-container">
          <Link to="/" className="breadcrumb-link">Home</Link> ➝  
          <Link className="breadcrumb-link">Shop OrganicPesticides</Link>
        </nav>
      </div>
    </section>
  );
};

export default Bannerorganic;

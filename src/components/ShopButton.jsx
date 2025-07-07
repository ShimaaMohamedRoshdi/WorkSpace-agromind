// src/components/ShopButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaSeedling, FaTractor, FaFlask, FaShoppingCart } from "react-icons/fa";
import "./ShopButton.css";

const ShopButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/crops");
  };

  return (
    <div className="shop-wrapper position-relative">
      {/* Ripple background layers */}
      <div className="pulse-circle"></div>
      <div className="pulse-circle"></div>
      <div className="pulse-circle"></div>
      <div className="pulse-circle"></div>


      {/* Your existing cart and icons */}
      <div className="orbit-icon seed">
        <FaSeedling />
      </div>
      <div className="orbit-icon chem">
        <FaFlask />
      </div>
      <div className="orbit-icon equip">
        <FaTractor />
      </div>
      <div className="cart-button" onClick={handleClick}>
        <FaShoppingCart className="cart-icon" />
        <div className="cart-text">Explore Shop</div>
      </div>
    </div>
  );
};

export default ShopButton;

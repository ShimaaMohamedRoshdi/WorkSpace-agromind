import React, { useState } from "react";
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import { addToCart } from "../redux/cartSlice";
import { addToWishlist, removeFromWishlist } from "../redux/WishlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
import "../App.css";
//import { motion } from "framer-motion";

//This is a functional component that takes a product object as a prop.
const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  //Defines a state variable alert for handling Snackbar notifications.
  //open: Controls whether the alert is shown.
  //message: Stores the alert text.
  //severity: Defines the type of alert (success, warning, etc.).
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
    setAlert({
      open: true,
      message: "Product added to cart successfully!",
      severity: "success",
    });
  };

  //Checks if the product already exists in the wishlist using .some().
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist) {
      dispatch(removeFromWishlist(product));
      setAlert({
        open: true,
        message: "Removed from wishlist.",
        severity: "warning",
      });
    } else {
      dispatch(addToWishlist(product));
      setAlert({
        open: true,
        message: "Added to wishlist.",
        severity: "success",
      });
    }
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") return;
    setAlert({ ...alert, open: false });
  };

  return (
    <>
      <div
        className="card h-100 border-0 shadow-sm position-relative product-card-animated"
        style={{
          borderRadius: "16px",
          background: "#f5f7fa",
          transition: "box-shadow 0.2s, transform 0.2s",
          width: "100%", // Ensure card takes full width of its container
        }}
      >
        {/* Discount Label */}
        {product.discount && (
          <div
            className="position-absolute top-0 start-0 badge bg-danger text-white p-2"
            style={{ borderRadius: "5px", fontSize: 13 }}
          >
            -{product.discount}%
          </div>
        )}

        {/* Wishlist Toggle */}
        <div
          className="position-absolute top-0 end-0 p-2"
          onClick={handleWishlistToggle}
          style={{ cursor: "pointer", zIndex: 2 }}
        >
          {isInWishlist ? (
            <FaHeart className="text-danger fs-4" />
          ) : (
            <FaRegHeart className="text-secondary fs-4" />
          )}
        </div>

        <Link to={`/product/${product.id}`} className="text-decoration-none">
          {/* Product Image */}
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              minHeight: 160,
              background: "#fff",
              borderRadius: 12,
              margin: 12,
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            <img
              src={product.image && product.image.trim() !== '' ? product.image : 'https://via.placeholder.com/150?text=No+Image'}
              alt={product.name}
              className="img-fluid"
              style={{ maxHeight: 120, objectFit: "contain", borderRadius: 8 }}
            />
          </div>
          <div className="card-body text-center p-2">
            {/* Product Name */}
            <h5
              className="card-title text-dark fw-bold mb-2"
              style={{ fontSize: "1.08rem", minHeight: 40 }}
            >
              {product.name}
            </h5>

            {/* Product Pricing */}
            <div className="d-flex justify-content-center align-items-center mb-2">
              <span className="text-success fw-bold fs-5">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span
                  className="text-muted text-decoration-line-through ms-2"
                  style={{ fontSize: 14 }}
                >
                  ${product.originalPrice}
                </span>
              )}
            </div>
            
            {/* Removed the Start Date, Date Duration and End Date section */}

            {/* Product Rating */}
            <div className="d-flex justify-content-center mb-2">
              {[...Array(product.rating || 4)].map((_, index) => (
                <FaStar
                  key={index}
                  className="text-warning mx-1"
                  style={{ fontSize: 15 }}
                />
              ))}
            </div>
          </div>
        </Link>

        {/* Add to Cart Button */}
        <button
          className="btn w-100 fw-bold mt-auto mb-2"
          onClick={handleAddToCart}
          style={{
            borderRadius: "8px",
            fontSize: 15,
            letterSpacing: 0.5,
            background: "#388e3c",
            color: "#fff",
            border: "none",
          }}
        >
          <span role="img" aria-label="cart">
            🛒
          </span>{" "}
          Add to Cart
        </button>
      </div>

      {/* MUI Snackbar for Alerts */}
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductCard;




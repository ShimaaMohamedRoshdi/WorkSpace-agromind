
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { addToWishlist, removeFromWishlist } from "../redux/WishlistSlice";
import { Snackbar, Alert } from "@mui/material";

const ItemCard = ({ product }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") return;
    setAlert({ ...alert, open: false });
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart(product));
    setAlert({ open: true, message: "Product added to cart!", severity: "success" });
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    if (isInWishlist) {
      dispatch(removeFromWishlist(product));
      setAlert({ open: true, message: "Removed from wishlist!", severity: "warning" });
    } else {
      dispatch(addToWishlist(product));
      setAlert({ open: true, message: "Added to wishlist!", severity: "success" });
    }
  };

  return (
    <div
      className="card p-3 border-0 shadow-sm text-center"
      style={{ cursor: "pointer" }}
    >
      <img src={product.image} className="card-img-top img-fluid" alt={product.name} />
      <h6 className="mt-2 fw-bold">{product.name}</h6>
      <p className="text-success fw-bold">${product.price}</p>
      <div className="d-flex justify-content-center gap-2">
        <button className="btn btn-outline-success btn-sm" onClick={handleAddToCart}>
          🛒
        </button>
        <button
          className={`btn btn-sm ${isInWishlist ? "btn-danger" : "btn-outline-danger"}`}
          onClick={handleToggleWishlist}
        >
          ❤️
        </button>
        <button className="btn btn-outline-dark btn-sm" onClick={(e) => e.stopPropagation()}>
          👁️
        </button>
      </div>

      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: "100%" }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ItemCard;

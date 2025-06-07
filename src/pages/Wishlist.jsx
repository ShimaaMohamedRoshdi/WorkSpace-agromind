
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaStar, FaHeart, FaShoppingCart } from 'react-icons/fa';
import { addToCart } from '../redux/cartSlice';
import { removeFromWishlist } from '../redux/WishlistSlice';
import { Snackbar, Alert } from '@mui/material';

const Wishlist = () => {
  const dispatch = useDispatch();
  //wishlist is fetched from the Redux state using useSelector:
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  // State for Snackbar
  //The alert state is managed by useState to control the visibility and content of the Snackbar:
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  const handleAddToCart = (e, product) => {
    e.stopPropagation();// Prevents event bubbling.
    e.preventDefault();
    dispatch(addToCart(product));
    setAlert({ open: true, message: 'Product added to cart successfully!', severity: 'success' });
  };

  const handleWishlistToggle = (e, product) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(removeFromWishlist(product));
    setAlert({ open: true, message: 'Removed from wishlist.', severity: 'warning' });
  };

  // Handle Snackbar close
  const handleClose = (event, reason) => {
    // Prevent closing if the user clicked away.
    if (reason === 'clickaway') return;
    setAlert({ ...alert, open: false });
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5">My Wishlist</h2>
      {wishlist.length > 0 ? (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {wishlist.map((product) => (
            <div key={product.id} className="col">
              <div className="card border-0 shadow-sm h-100">
                {/* Wishlist Icon */}
                <button
                  className="btn btn-link position-absolute top-0 end-0 text-danger"
                  onClick={(e) => handleWishlistToggle(e, product)}
                >
                  <FaHeart size={20} />
                </button>

                {/* Product Image */}
                <Link to={`/product/${product.id}`} className="text-decoration-none">
                  <div
                    className="bg-light d-flex align-items-center justify-content-center"
                    style={{ height: '200px' }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="img-fluid"
                      style={{ maxHeight: '100%', objectFit: 'contain' }}
                    />
                  </div>
                </Link>

                {/* Product Details */}
                <div className="card-body text-center">
                  <Link to={`/product/${product.id}`} className="text-dark text-decoration-none">
                    <h5 className="card-title">{product.name}</h5>
                  </Link>
                  <p className="card-text text-success fw-bold">${product.price}</p>

                  {/* Star Rating */}
                  <div className="mb-3">
                    {[...Array(4)].map((_, index) => (
                      <FaStar key={index} className="text-warning" />
                    ))}
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    className="btn btn-success rounded-circle"
                    onClick={(e) => handleAddToCart(e, product)}
                    style={{ width: '50px', height: '50px' }}
                  >
                    <FaShoppingCart />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p className="text-muted">Your wishlist is empty.</p>
          <Link to="/products" className="btn btn-success">
            Browse Products
          </Link>
        </div>
      )}

      {/* Snackbar for Alerts */}
      <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Wishlist;

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
// import EmptyCart from '../assets/images/emptycart';
import Modal from '../components/Modal';
import ChangeAddress from '../components/ChangeAddress';
import { decreaseQuantity, increaseQuantity, removeFromCart } from '../redux/cartSlice';

//useSelector: Accesses the cart state from the Redux store.
//useDispatch: Dispatches actions to modify the Redux state (e.g., decreaseQuantity, increaseQuantity, removeFromCart).
//React Router (useNavigate): Allows navigation to other routes programmatically (e.g., navigating to the /checkout page).
const Cart = () => {
  //cart: Accesses the cart's products, total quantity, and total price from the Redux store.
  const cart = useSelector((state) => state.cart);
  //local state to store in it shippimg address , main.......
  const [address, setAddress] = useState('Main Street, 0012');
  const [isModelOpen, setIsModelOpen] = useState(false);
  //dispatch: Used to dispatch Redux actions.
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="container my-5">
      {cart.products.length > 0 ? (
        <div>
          <h3 className="text-center mb-5">SHOPPING CART</h3>

          <div className="row">
            {/* Cart Items Section */}
            <div className="col-md-8">
              <div className="d-none d-md-flex justify-content-between border-bottom mb-3 text-uppercase font-weight-bold">
                <p>PRODUCT</p>
                <div className="d-flex justify-content-between" style={{ width: '65%' }}>
                  <p>PRICE</p>
                  <p>QUANTITY</p>
                  <p>SUBTOTAL</p>
                  <p>REMOVE</p>
                </div>
              </div>

              <div>
                {cart.products.map((product) => (
                  <div key={product.id} className="d-flex flex-column flex-md-row justify-content-between p-3 border-bottom">
                    {/* Product Details */}
                    <div className="d-flex align-items-center mb-3 mb-md-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="img-fluid rounded"
                        style={{ width: '80px', height: '80px', objectFit: 'contain' }}
                      />
                      <div className="ms-3">
                        <h5 className="mb-0">{product.name}</h5>
                      </div>
                    </div>

                    {/* Price, Quantity, Subtotal, Remove */}
                    <div className="d-flex flex-column flex-md-row align-items-center justify-content-between ms-md-3 w-100">
                      <p className='ms-5' >${product.price}</p>
                      <div className="d-flex align-items-center border px-2">
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => dispatch(decreaseQuantity(product.id))}
                        >
                          -
                        </button>
                        <p className="px-3 mb-0">{product.quantity}</p>
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => dispatch(increaseQuantity(product.id))}
                        >
                          +
                        </button>
                      </div>
                      <p>${(product.quantity * product.price).toFixed(2)}</p>
                      <button
                        className="text-danger"
                        onClick={() => dispatch(removeFromCart(product.id))}
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

    {/* Cart Summary Section */}
<div className="col-md-4 ms-auto">
  <div className="bg-white p-4 rounded shadow border">
    <h5 className="mb-3 text-end">CART TOTALS</h5>
    <div className="d-flex justify-content-between mb-3">
      <span>Total Items:</span>
      <span>{cart.totalQuantity}</span>
    </div>
    <div className="d-flex justify-content-between mb-3">
      <span>Shipping to:</span>
      <span>{address}</span>
    </div>
    <div className="mb-3">
      <button
        className="btn btn-link p-0"
        onClick={() => setIsModelOpen(true)}
      >
        Change address
      </button>
    </div>
    <div className="d-flex justify-content-between mb-3">
      <span>Total Price:</span>
      <span>${cart.totalPrice.toFixed(2)}</span>
    </div>
    <button
      className="btn btn-success w-100"
      onClick={() => navigate('/checkout')}
    >
      Proceed to Checkout
    </button>
  </div>
</div>

          </div>

          {/* Address Modal */}
          <Modal isModelOpen={isModelOpen} setIsModelOpen={setIsModelOpen}>
            <ChangeAddress setAddress={setAddress} setIsModelOpen={setIsModelOpen} />
          </Modal>
        </div>
      ) : (
        <div className="text-center">
          {/* <img src={EmptyCart} alt="Empty Cart" className="img-fluid" style={{ maxWidth: '300px' }} /> */}
          <p>Your cart is empty</p>
        </div>
      )}
        
    </div>

  
  );
};

export default Cart;

import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './CheckOut.css'
const CheckOut = ({ setOrder }) => {
  const [billingToggle, setBillingToggle] = useState(true);
  const [shippingToggle, setShippingToggle] = useState(false);
  const [paymentToggle, setPaymentToggle] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    zip: "",
  });

  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const handleOrder = () => {
    const newOrder = {
      products: cart.products,
      orderNumber: "1234",
      shippingInformation: shippingInfo,
      totalPrice: cart.totalPrice,
    };
    setOrder(newOrder);
    console.log("Navigating to /order")
    navigate("/order");
  };

  return (
    <div className="container py-4 ">
      <h3 className="text-center text-success mb-4">CHECKOUT</h3>
      <div className="row">
        {/* Left Section: Billing, Shipping, Payment Information */}
        <div className=" col-md-6 ">
          {/* Billing Information */}
          <div className="cardd mb-4">
            <div
              className="card-header d-flex justify-content-between align-items-center"
              onClick={() => setBillingToggle(!billingToggle)}
            >
              <h5 className="mb-0">Billing Information</h5>
              {billingToggle ? <FaAngleDown /> : <FaAngleUp />}
            </div>
            <div className={`card-body ${billingToggle ? "" : "d-none"}`}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Name"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Phone"
                />
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="cardd mb-4">
            <div
              className="card-header d-flex justify-content-between align-items-center"
              onClick={() => setShippingToggle(!shippingToggle)}
            >
              <h5 className="mb-0">Shipping Information</h5>
              {shippingToggle ? <FaAngleDown /> : <FaAngleUp />}
            </div>
            <div className={`card-body ${shippingToggle ? "" : "d-none"}`}>
              <div className="mb-3">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Address"
                  onChange={(e) =>
                    setShippingInfo({
                      ...shippingInfo,
                      address: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">City</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter City"
                  onChange={(e) =>
                    setShippingInfo({ ...shippingInfo, city: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Zip Code</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Zip Code"
                  onChange={(e) =>
                    setShippingInfo({ ...shippingInfo, zip: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="cardd mb-4">
            <div
              className="card-header d-flex justify-content-between align-items-center"
              onClick={() => setPaymentToggle(!paymentToggle)}
            >
              <h5 className="mb-0">Payment Information</h5>
              {paymentToggle ? <FaAngleDown /> : <FaAngleUp />}
            </div>
            <div className={`card-body ${paymentToggle ? "" : "d-none"}`}>
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment"
                  id="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                <label className="form-check-label" htmlFor="cod">
                  Cash on Delivery
                </label>
              </div>
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment"
                  id="dc"
                  checked={paymentMethod === "dc"}
                  onChange={() => setPaymentMethod("dc")}
                />
                <label className="form-check-label" htmlFor="dc">
                  Debit Card
                </label>
              </div>
              {paymentMethod === "dc" && (
                <div>
                  <div className="mb-3">
                    <label className="form-label">Card Number</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Card Number"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Card Holder Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Card Holder Name"
                    />
                  </div>
                  <div className="row">
                    <div className="col">
                      <label className="form-label">Expiry Date</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div className="col">
                      <label className="form-label">CVV</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="CVV"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Section: Order Summary */}
        <div className="col-md-4">
          <div className="cardd">
            <div className="card-body">
              <h5 className="card-title">Order Summary</h5>
              <ul className="list-group mb-3">
                {cart.products.map((product) => (
                  <li
                    key={product.id}
                    className="list-group-item d-flex justify-content-between"
                  >
                    <div>
                      <h6>{product.name}</h6>
                      <small>
                        {product.price} x {product.quantity}
                      </small>
                    </div>
                    <span>
                      ${(product.price * product.quantity).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="d-flex justify-content-between">
                <strong>Total Price:</strong>
                <strong>${cart.totalPrice.toFixed(2)}</strong>
              </div>
              <button
                className="btn btn-success w-100 mt-3"
                onClick={handleOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;

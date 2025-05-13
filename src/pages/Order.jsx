
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Order = ({ order }) => {
  const navigate = useNavigate();

  return (
    <div className="container py-4">
      <h2 className="text-center text-success mb-4">Thank You for Your Order</h2>
      <p className="text-center">
        Your order has been placed successfully. You will receive an email confirmation shortly.
      </p>
      <div className="cardd mt-4">
        <div className="card-body">
          <h3 className="card-title mb-3">Order Summary</h3>
          <p>
            <strong>Order Number:</strong> {order?.orderNumber || 'N/A'}
          </p>

          {/* Shipping Information */}
          <div className="mt-4">
            <h4 className="mb-2">Shipping Information</h4>
            <p>
              <strong>Address:</strong> {order?.shippingInformation?.address || 'N/A'}
            </p>
            <p>
              <strong>City:</strong> {order?.shippingInformation?.city || 'N/A'}
            </p>
            <p>
              <strong>Zip Code:</strong> {order?.shippingInformation?.zip || 'N/A'}
            </p>
          </div>

          {/* Items Ordered */}
          <div className="mt-4">
            <h4 className="mb-2">Items Ordered</h4>
            {order?.products?.length > 0 ? (
              order.products.map((product) => (
                <div key={product.id} className="d-flex justify-content-between align-items-center">
                  <p className="mb-0">
                    {product.name} x {product.quantity}
                  </p>
                  <p className="mb-0">${(product.price * product.quantity).toFixed(2)}</p>
                </div>
              ))
            ) : (
              <p>No products found in your order.</p>
            )}
          </div>

          {/* Total Price */}
          <div className="mt-4 d-flex justify-content-between">
            <span>
              <strong>Total Price:</strong>
            </span>
            <span className="fw-bold">
              ${order?.totalPrice ? order.totalPrice.toFixed(2) : '0.00'}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="mt-4">
            <button
              className="btn btn-success me-2"
              onClick={() => navigate('/track-order')}
            >
              Track Order
            </button>
            <button className="btn btn-danger" onClick={() => navigate('/')}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;

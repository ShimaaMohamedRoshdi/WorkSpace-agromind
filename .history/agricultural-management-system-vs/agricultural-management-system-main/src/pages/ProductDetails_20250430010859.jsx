import React, { useEffect, useState } from "react";
import { FaQuestion, FaTruck } from "react-icons/fa";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart } from "../redux/cartSlice";
import { Snackbar, Alert } from "@mui/material";
import "./ProductDetails.css";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Combine all product arrays for lookup
  const { products, products2, products3, products4, products5 } = useSelector(
    (state) => state.product
  );

  // New code: search in all arrays
  const allProducts = [
    ...(products || []),
    ...(products2 || []),
    ...(products3 || []),
    ...(products4 || []),
    ...(products5 || []),
  ];
  const product = allProducts.find((p) => String(p.id) === String(id));

  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showDelivery, setShowDelivery] = useState(false);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [question, setQuestion] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);

  if (!product) return <div>Product not found.</div>;

  const handleQuantityChange = (type) => {
    if (type === "increase") setQuantity(quantity + 1);
    if (type === "decrease" && quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    const itemToAdd = { ...product, quantity };
    dispatch(addToCart(itemToAdd));
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleContinueShopping = () => {
    navigate("/crops");
    closeModal();
  };

  const handleGoToCart = () => {
    navigate("/cart");
    closeModal();
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") return;
    setAlertOpen(false);
  };

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    setAlertOpen(true);
    setQuestion("");
    setShowQuestionForm(false);
  };

  return (
    <div className="container py-4">
      {isModalVisible && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Product added to cart</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-footer">
                <button
                  onClick={handleContinueShopping}
                  className="btn btn-primary"
                >
                  Continue Shopping
                </button>
                <button onClick={handleGoToCart} className="btn btn-success">
                  Go to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleAlertClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Thank you for your question! We will get back to you soon.
        </Alert>
      </Snackbar>

      <div className="row">
        <div className="col-md-6 product-image-container">
          {product.image ? (
            <img src={product.image} alt={product.name} className="img-fluid" />
          ) : (
            <div className="text-muted">No Image Available</div>
          )}
        </div>

        <div className="col-md-4 product-info">
          <h2>{product.name}</h2>
          <p className="price">${product.price}</p>

          <div className="quantity-controls">
            <button onClick={() => handleQuantityChange("decrease")}>
              <AiOutlineMinus />
            </button>
            <input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              readOnly
            />
            <button onClick={() => handleQuantityChange("increase")}>
              <AiOutlinePlus />
            </button>
          </div>

          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>

          <div
            className="delivery-return"
            onClick={() => setShowDelivery(!showDelivery)}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <FaTruck />
            <span>Delivery & Return</span>
          </div>
          {showDelivery && (
            <div
              className="delivery-info"
              style={{ marginTop: "8px", fontSize: "0.9rem", color: "#555" }}
            >
              <p>
                We offer fast and reliable delivery within 3-5 business days.
              </p>
              <p>Returns accepted within 30 days of purchase with receipt.</p>
            </div>
          )}
          <div
            className="ask-question"
            onClick={() => setShowQuestionForm(!showQuestionForm)}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "16px",
            }}
          >
            <FaQuestion />
            <span>Ask a Question</span>
          </div>
          {showQuestionForm && (
            <form
              className="question-form"
              onSubmit={handleQuestionSubmit}
              style={{ marginTop: "8px" }}
            >
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Type your question here..."
                required
                style={{
                  width: "100%",
                  minHeight: "80px",
                  padding: "8px",
                  fontSize: "0.9rem",
                }}
              />
              <button type="submit" className="btn btn-success mt-2">
                Submit Question
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="product-description">
        <h3>Product Description</h3>
        <p>{product.description || "Product description will go here"}</p>
      </div>

      <div className="related-products-section">
        <h4>Related Products</h4>
        <div className="related-products-row">
          {allProducts
            .filter(
              (p) => p.id !== product.id && p.category === product.category
            )
            .slice(0, 4)
            .map((related) => (
              <div
                className="related-product-card"
                key={related.id}
                onClick={() => navigate(`/product/${related.id}`)}
              >
                {related.image && (
                  <img
                    src={related.image}
                    alt={related.name}
                    className="related-product-image"
                  />
                )}
                <div className="related-product-name">{related.name}</div>
                <div className="related-product-price">${related.price}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;

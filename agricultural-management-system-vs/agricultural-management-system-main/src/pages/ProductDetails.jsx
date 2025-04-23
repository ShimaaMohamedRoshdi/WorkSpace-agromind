import React, { useEffect, useState } from 'react';
import { FaQuestion, FaTruck } from 'react-icons/fa';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addToCart } from '../redux/cartSlice'; // Fixed typo in addToCart

const ProductDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const products = useSelector(state => state.product.products || []);
    const dispatch = useDispatch();
    const [product, setProduct] = useState();
    const [quantity, setQuantity] = useState(1);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        const newProduct = products.find(product => product.id.toString() === id);
        setProduct(newProduct);
    }, [id, products]);

    if (!product) return <div>Loading ....</div>;

    const handleQuantityChange = (type) => {
        if (type === 'increase') setQuantity(quantity + 1);
        if (type === 'decrease' && quantity > 1) setQuantity(quantity - 1);
    };

    const handleAddToCart = () => {
        const itemToAdd = { ...product, quantity };
        dispatch(addToCart(itemToAdd)); // Add product to the Redux store (cart)
        setIsModalVisible(true); // Show the modal
    };

    const closeModal = () => {
        setIsModalVisible(false); // Close the modal
    };

    const handleContinueShopping = () => {
        navigate('/crops');
        closeModal(); // Close the modal and let the user continue shopping
    };

    const handleGoToCart = () => {
        navigate('/cart');
        closeModal(); // Close the modal
    };

    return (
        <div className="container py-4">
            {/* Modal */}
            {isModalVisible && (
                <div className="modal fade show d-block" tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Product added to cart</h5>
                                <button type="button" className="btn-close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-footer">
                                <button 
                                    onClick={handleContinueShopping} 
                                    className="btn btn-primary"
                                >
                                    Continue Shopping
                                </button>
                                <button 
                                    onClick={handleGoToCart} 
                                    className="btn btn-success"
                                >
                                    Go to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="row">
                {/* Product Image */}
                <div className="col-md-6 d-flex align-items-center justify-content-center border p-3">
                    {product.image ? (
                        <img src={product.image} alt={product.name} className="img-fluid w-50" />
                    ) : (
                        <div className="text-muted">No Image Available</div>
                    )}
                </div>

                {/* Product Information */}
                <div className="col-md-4 border p-4">
                    <h2 className="mb-3">{product.name}</h2>
                    <p className="text-success fs-4">${product.price}</p>

                    <div className="d-flex align-items-center mb-3">
                        <button onClick={() => handleQuantityChange('decrease')} className="btn btn-outline-secondary">
                            <AiOutlineMinus />
                        </button>
                        <input
                            type="number"
                            id="quantity"
                            min="1"
                            className="form-control text-center mx-2"
                            value={quantity}
                            readOnly
                            style={{ width: '60px' }}
                        />
                        <button onClick={() => handleQuantityChange('increase')} className="btn btn-outline-secondary">
                            <AiOutlinePlus />
                        </button>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="btn btn-danger w-100"
                    >
                        Add to Cart
                    </button>

                    <div className="mt-4">
                        <p className="d-flex align-items-center">
                            <FaTruck className="me-2" />
                            Delivery & Return
                        </p>
                        <p className="d-flex align-items-center">
                            <FaQuestion className="me-2" />
                            Ask a Question
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <h3 className="fw-bold">Product Description</h3>
                <p>{product.description || 'Product description will go here'}</p>
            </div>
        </div>
    );
};

export default ProductDetails;

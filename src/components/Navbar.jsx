import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaTwitter,
  FaFacebookF,
  FaPinterest,
  FaInstagram,
  FaShoppingCart,
  FaRegHeart,
  FaUser,
  FaSignOutAlt, // Icon for Logout
} from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import { useSelector } from "react-redux";
import logo from "../assets/images/logo-no-background.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";

export default function Navbar() {
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const wishlistQuantity = useSelector((state) => state.wishlist.totalItems);
  const navigate = useNavigate();

  // State to track login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Check for token on component load and on navigation changes
  // Using location.pathname ensures it re-checks if the URL changes,
  // which is a good way to keep it in sync after login/logout.
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [window.location.pathname]); // Dependency on path change

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    setIsLoggedIn(false);
    navigate("/signin"); // Redirect to sign-in page after logout
  };

  const handleToggle = () => setIsOpen(!isOpen);
  const closeNavbar = () => setIsOpen(false);

  // Search Logic (no changes here)
  const { products = [], products2 = [], products3 = [], products4 = [] } = useSelector((state) => state.product || {});
  const allProducts = [...products, ...products2, ...products3, ...products4];
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim().length === 0) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }
    const results = allProducts.filter((p) => p.name && p.name.toLowerCase().includes(value.toLowerCase()));
    setSearchResults(results.slice(0, 8));
    setShowDropdown(true);
  };

  const handleResultClick = (id) => {
    setSearchTerm("");
    setShowDropdown(false);
    navigate(`/product/${id}`);
  };

  return (
    <nav className="bg-white border-bottom">
      {/* Top Bar - No changes */}
      <div className="container-fluid bg-light py-2 d-none d-lg-block">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex gap-3 text-secondary small">
            <span><FiPhoneCall className="text-success me-1" /> +20 01066585154</span>
            <span><MdEmail className="text-danger me-1" /> GraduationProject2025@gmail.com</span>
            <span><MdLocationOn className="text-warning me-1" /> Cairo, NasrCity</span>
          </div>
          <div className="d-flex gap-5">
            <FaTwitter className="text-primary" />
            <FaFacebookF className="text-primary" />
            <FaPinterest className="text-danger" />
            <FaInstagram className="text-danger" />
          </div>
        </div>
      </div>

      {/* Middle Bar - Logo, Search, User Icons */}
      <div className="container py-2 d-flex flex-column flex-md-row justify-content-between align-items-center">
        <div className="d-flex justify-content-between align-items-center w-100">
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="Agrios Logo" width="200" />
          </Link>
          <button className="navbar-toggler d-lg-none" type="button" onClick={handleToggle} style={{ color: "green", border: "1px solid green" }}>
            <span className="navbar-toggler-icon" style={{ backgroundImage: "none" }}>☰</span>
          </button>
        </div>

        {/* Search Bar */}
         <div className="search-container mt-1 mt-md-0 w-100 position-relative">
           <input
             type="text"
             className="form-control"
             placeholder="Search products..."
             value={searchTerm}
             onChange={handleSearchChange}
             onFocus={() => setShowDropdown(searchResults.length > 0)}
             onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
             style={{ zIndex: 1050 }}
           />
           <button className="btn ms-1" tabIndex={-1}>
             🔍
           </button>
           {/* Dropdown results */}
           {showDropdown && (
             <ul
               className="list-group position-absolute w-100 shadow"
               style={{
                 zIndex: 2000,
                 maxHeight: 320,
                 overflowY: "auto",
                 background: "#fff",
                 border: "1px solid #e0e0e0",
                 borderRadius: 8,
                 boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                 padding: 0,
                 margin: 0,
                 top: "100%",
                 left: 0,
                 scrollbarWidth: "thin",
                 scrollbarColor: "#b5e7b5 #f8f8f8",
               }}
             >
               {searchTerm && searchResults.length === 0 && (
                 <li
                   className="list-group-item text-center text-muted"
                   style={{
                     border: "none",
                     background: "#fff",
                     fontStyle: "italic",
                   }}
                 >
                   No products found 😕!
                 </li>
               )}
               {searchResults.map((product) => (
                 <li
                   key={product.id}
                   className="list-group-item list-group-item-action d-flex align-items-center"
                   style={{
                     cursor: "pointer",
                     border: "none",
                     padding: "10px 12px",
                     transition: "background 0.2s",
                   }}
                   onMouseDown={() => handleResultClick(product.id)}
                   onMouseOver={(e) =>
                     (e.currentTarget.style.background = "#eafbe7")
                   }
                   onMouseOut={(e) =>
                     (e.currentTarget.style.background = "#fff")
                   }
                 >
                   {product.image && (
                     <img
                       src={product.image}
                       alt={product.name}
                       style={{
                         width: 32,
                         height: 32,
                         objectFit: "contain",
                         marginRight: 12,
                         borderRadius: 4,
                         border: "1px solid #eee",
                       }}
                     />
                   )}
                   <span style={{ fontWeight: 500 }}>{product.name}</span>
                 </li>
               ))}
             </ul>
           )}
         </div>

        {/* ✅ CORRECTED: User Icons section with conditional logic */}
        <div className="d-flex align-items-center gap-4 ms-md-5 mt-3 mt-md-0">
          {isLoggedIn ? (
            // --- SHOW THESE ICONS IF LOGGED IN ---
            <>
              <Link to="/wishlist" className="position-relative text-dark" title="Wishlist">
                <FaRegHeart size={24} />
                {wishlistQuantity > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge bg-danger">
                    {wishlistQuantity}
                  </span>
                )}
              </Link>
              <Link to="/cart" className="position-relative text-dark" title="Cart">
                <FaShoppingCart size={24} />
                {cartQuantity > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge bg-danger">
                    {cartQuantity}
                  </span>
                )}
              </Link>
              <button onClick={handleLogout} className="btn btn-link text-danger p-0" title="Logout">
                <FaSignOutAlt size={24} />
              </button>
            </>
          ) : (
            // --- SHOW THIS ICON IF LOGGED OUT ---
            <Link to="/signin" className="text-dark" title="Sign In / Register">
              <FaUser size={24} />
            </Link>
          )}
        </div>
      </div>

      {/* Bottom Navigation - Menu Links */}
      <nav className="navbar nv navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <div className={`collapse navbar-collapse justify-content-lg-center ${isOpen ? "show" : ""}`} id="navbarNav">
            <ul className="navbar-nav text-center">
              <li className="nav-item">
                <Link className="nav-link fw-bold text-dark" to="/home" onClick={closeNavbar}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-bold text-dark" to="/about" onClick={closeNavbar}>About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-bold text-dark" to="/services" onClick={closeNavbar}>Services</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-bold text-dark" to="/projects" onClick={closeNavbar}>Projects</Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link fw-bold text-dark" to="/news" onClick={closeNavbar}>News</Link>
              </li> */}
              
              {/* ✅ CORRECTED: Conditionally render the Shop dropdown */}
              {isLoggedIn && (
                <li className="nav-item dropdown">
                  <Link className="nav-link fw-bold text-dark dropdown-toggle" to="#" id="shopDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Shop
                  </Link>
                  <ul className="dropdown-menu" aria-labelledby="shopDropdown">
                    <li><Link className="dropdown-item" to="/crops">All Crops</Link></li>
                    <li><Link className="dropdown-item" to="/shopproducts">Shop Products</Link></li>
                    <li><Link className="dropdown-item" to="/shopChemicals">Shop Chemicals</Link></li>
                    <li><Link className="dropdown-item" to="/shop-by-category">Shop By Category</Link></li>
                  </ul>
                </li>
              )}
              
              <li className="nav-item">
                <Link className="nav-link fw-bold text-dark" to="/contact" onClick={closeNavbar}>Contact</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </nav>
  );
}

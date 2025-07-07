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
  FaChevronDown, // Icon for dropdown
} from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import { useSelector } from "react-redux";
import logo from "../assets/images/logo-no-background.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import "./Navbar.css"; // Make sure CSS is imported

const navbarStyles = `
  /* Navbar transitions */
  .nav-link {
    transition: color 0.3s ease, transform 0.2s ease;
  }
  .nav-link:hover {
    color: #5b9e42 !important;
    transform: translateY(-2px);
  }
  
  /* Icon transitions */
  .icon-hover {
    transition: transform 0.3s ease, color 0.3s ease;
  }
  .icon-hover:hover {
    transform: scale(1.2);
    color: #5b9e42;
  }
  
  /* Dropdown animation */
  .dropdown-menu {
    animation: dropdownFade 0.2s ease;
  }
  
  @keyframes dropdownFade {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  /* Mobile menu toggle */
  .navbar-toggler {
    transition: all 0.3s ease;
  }
  .navbar-toggler:hover {
    border-color: #5b9e42 !important;
  }
  
  /* Small screen enhancements */
  @media (max-width: 991px) {
    .navbar-collapse {
      background-color: #f8f9fa;
      border-radius: 0 0 15px 15px;
      box-shadow: 0 8px 20px rgba(0,0,0,0.1);
      padding: 15px;
      animation: slideIn 0.3s ease-out;
    }
    
    @keyframes slideIn {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .navbar-nav .nav-item {
      margin: 5px 0;
      border-radius: 8px;
      transition: background-color 0.2s ease;
    }
    
    .navbar-nav .nav-item:hover {
      background-color: rgba(91, 158, 66, 0.1);
    }
    
    .navbar-nav .nav-link {
      padding: 10px 15px;
    }
    
    .dropdown-menu {
      border: none;
      background-color: rgba(248, 249, 250, 0.9);
      box-shadow: none;
    }
    
    .dropdown-item {
      padding: 8px 25px;
      transition: all 0.2s ease;
    }
    
    .dropdown-item:hover {
      background-color: rgba(91, 158, 66, 0.1);
      transform: translateX(5px);
    }
  }
  /* Mobile sidebar menu styling */
  @media (max-width: 991px) {
    .navbar-collapse {
      position: fixed;
      top: 0;
      left: -280px;
      width: 280px;
      height: 100vh;
      background: #fff;
      z-index: 1050;
      transition: left 0.3s ease;
      box-shadow: 0 0 15px rgba(0,0,0,0.2);
      overflow-y: auto;
      padding: 20px 0;
    }
    
    .navbar-collapse.show {
      left: 0;
    }
    
    /* Dark overlay when menu is open */
    .menu-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      z-index: 1040;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease;
    }
    
    .menu-overlay.show {
      opacity: 1;
      visibility: visible;
    }
    
    /* Close button styling */
    .close-btn {
      position: absolute;
      top: 15px;
      right: 15px;
      background: none;
      border: none;
      font-size: 24px;
      color: #5b9e42;
      cursor: pointer;
      z-index: 1060;
    }
    
    /* Menu items styling */
    .navbar-nav {
      margin-top: 60px;
    }
    
    .navbar-nav .nav-item {
      margin: 8px 15px;
    }
    
    .navbar-nav .nav-link {
      padding: 12px 15px;
      border-radius: 8px;
      transition: all 0.3s ease;
      font-weight: 500;
    }
    
    .navbar-nav .nav-link:hover {
      background-color: rgba(91, 158, 66, 0.1);
      color: #5b9e42 !important;
      transform: none;
    }
    
    /* Dropdown styling */
    .dropdown-menu {
      position: static !important;
      float: none;
      width: 100%;
      background: transparent;
      border: none;
      box-shadow: none;
      padding: 0 0 0 15px;
      margin: 0;
      transform: none !important;
    }
    
    .dropdown-item {
      padding: 10px 15px;
      color: #666;
      border-radius: 8px;
    }
    
    .dropdown-item:hover {
      background-color: rgba(91, 158, 66, 0.1);
      color: #5b9e42;
    }
    
    /* Logo area in mobile menu */
    .mobile-menu-header {
      padding: 15px;
      border-bottom: 1px solid #eee;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
    }
    
    .mobile-menu-header img {
      height: 40px;
    }
  }
  /* Dropdown styling improvements */
  .dropdown-menu {
    border-radius: 12px;
    border: none;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    padding: 12px 0;
    margin-top: 10px;
    transition: all 0.3s ease;
    opacity: 0;
    visibility: hidden;
    transform: translateY(10px);
    display: block;
  }
  
  .dropdown-menu.show {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  
  .dropdown-item {
    padding: 10px 20px;
    color: #333;
    font-weight: 500;
    transition: all 0.2s ease;
    position: relative;
  }
  
  .dropdown-item:hover {
    background-color: rgba(91, 158, 66, 0.08);
    color: #5b9e42;
    padding-left: 25px;
  }
  
  .dropdown-item::before {
    content: '';
    position: absolute;
    left: 10px;
    top: 50%;
    width: 0;
    height: 2px;
    background-color: #5b9e42;
    transition: width 0.2s ease;
    transform: translateY(-50%);
  }
  
  .dropdown-item:hover::before {
    width: 8px;
  }
  
  /* Mobile dropdown styling */
  @media (max-width: 991px) {
    .dropdown-menu {
      position: static !important;
      float: none;
      width: 100%;
      background: #f0f8f0 !important; /* Light green background */
      border: none;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      padding: 8px;
      margin: 5px 0;
      opacity: 1;
      visibility: visible;
      transform: none;
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease;
      border-radius: 8px;
    }
    
    .dropdown-menu.show {
      max-height: 500px;
      border-left: 3px solid #5b9e42;
    }
    
    .dropdown-item {
      padding: 12px 15px;
      border-radius: 6px;
      margin: 5px 0;
      background-color: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    
    .dropdown-item:hover {
      background-color: #e8f5e8;
      padding-left: 20px;
    }
    
    .dropdown-toggle::after {
      transition: transform 0.3s ease;
    }
    
    .dropdown-toggle[aria-expanded="true"]::after {
      transform: rotate(180deg);
    }
    
    /* Highlight active dropdown toggle */
    .nav-link.dropdown-toggle[aria-expanded="true"] {
      background-color: rgba(91, 158, 66, 0.1);
      color: #5b9e42 !important;
      border-radius: 8px;
    }
  }
  /* Improved dropdown icon styling */
  .dropdown-toggle::after {
    display: inline-block;
    margin-left: 8px;
    vertical-align: middle;
    content: "";
    border-top: 0.3em solid #5b9e42;
    border-right: 0.3em solid transparent;
    border-bottom: 0;
    border-left: 0.3em solid transparent;
    transition: transform 0.3s ease;
  }
  
  .dropdown-toggle:hover::after {
    transform: translateY(2px);
  }
  
  .dropdown-toggle[aria-expanded="true"]::after {
    transform: rotate(180deg);
  }
  
  /* Custom dropdown icon option */
  .custom-dropdown-icon {
    margin-left: 5px;
    font-size: 12px;
    color: #5b9e42;
    transition: transform 0.3s ease;
  }
  
  .dropdown-toggle[aria-expanded="true"] .custom-dropdown-icon {
    transform: rotate(180deg);
  }
  
  /* Dropdown toggle active state */
  .nav-link.dropdown-toggle.active,
  .nav-link.dropdown-toggle:focus {
    color: #5b9e42 !important;
  }
  
  /* Dropdown menu positioning */
  .dropdown {
    position: relative;
  }
  
  @media (min-width: 992px) {
    .dropdown-menu {
      left: 50%;
      transform: translateX(-50%) translateY(10px);
    }
    
    .dropdown-menu.show {
      transform: translateX(-50%) translateY(0);
    }
  }
`;

export default function Navbar() {
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const wishlistQuantity = useSelector((state) => state.wishlist.totalItems);
  const navigate = useNavigate();

  // State to track login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
const [activeDropdown, setActiveDropdown] = useState(null);

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
    // Filter products by name (case-insensitive)
    const results = allProducts.filter(
      (p) => p.name && p.name.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(results.slice(0, 8)); // Limit to 8 results
    setShowDropdown(true); // Always show dropdown if input is not empty
  };

  // Handle click on a product
  const handleResultClick = (id) => {
    setSearchTerm("");
    setShowDropdown(false);
    navigate(`/product/${id}`);
  };

  const handleDropdownToggle = (e, id) => {
    // For mobile only
    if (window.innerWidth < 992) {
      e.preventDefault();
      setActiveDropdown(activeDropdown === id ? null : id);
    }
  };

  // Add this useEffect to handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        // Reset mobile-specific states on desktop
        setActiveDropdown(null);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="bg-white border-bottom">
      <style>{navbarStyles}</style>
      {/* Top Bar - Social Media & Contact Info */}
      <div className="container-fluid bg-light py-2 d-none d-lg-block">
        <div className="d-flex justify-content-between align-items-center">
          {/* Contact Info */}
          <div className="d-flex gap-3 text-secondary small">
            <span>
              <FiPhoneCall className="text-success me-1" /> +20 01066585154
            </span>
            <span>
              <MdEmail className="text-danger me-1" />{" "}
              GraduationProject2025@gmail.com
            </span>
            <span>
              <MdLocationOn className="text-warning me-1" /> Cairo ,NasrCity
            </span>
          </div>

          {/* Social Icons */}
          <div className="d-flex gap-5">
            <FaTwitter className="text-primary" />
            <FaFacebookF className="text-primary" />
            <FaPinterest className="text-danger" />
            <FaInstagram className="text-danger" />
          </div>
        </div>
      </div>

      {/* Middle Bar - Logo, Toggle Button, Search, Icons */}
      <div className="container py-2 d-flex flex-column flex-md-row justify-content-between align-items-center">
        <div className="d-flex justify-content-between align-items-center w-100">
          {/* Logo */}
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="Agrios Logo" width="200" />
          </Link>

          {/* Toggle Button - Enhanced for mobile */}
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            onClick={handleToggle}
            style={{
              color: "#5b9e42",
              border: "1px solid #5b9e42",
              borderRadius: "8px",
              padding: "8px 12px",
              transition: "all 0.3s ease",
              boxShadow: isOpen ? "0 0 8px rgba(91, 158, 66, 0.5)" : "none"
            }}
          >
            <span
              className="navbar-toggler-icon"
              style={{ 
                backgroundImage: "none",
                transition: "transform 0.3s ease",
                transform: isOpen ? "rotate(90deg)" : "rotate(0deg)"
              }}
            >
              {isOpen ? "✕" : "☰"}
            </span>
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

        {/* Wishlist, Cart, and Register Icon */}
        <div className="d-flex align-items-center gap-4 ms-5 mt-3 mt-md-0">
        {isLoggedIn ? (
            // --- SHOW THESE ICONS IF LOGGED IN ---
            <>
              <Link to="/wishlist" className="position-relative text-dark" title="Wishlist">
                <FaRegHeart size={24} className="icon-hover" />
                {wishlistQuantity > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge bg-danger">
                    {wishlistQuantity}
                  </span>
                )}
              </Link>
              <Link to="/cart" className="position-relative text-dark" title="Cart">
                <FaShoppingCart size={24} className="icon-hover" />
                {cartQuantity > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge bg-danger">
                    {cartQuantity}
                  </span>
                )}
              </Link>
              <button onClick={handleLogout} className="btn btn-link text-danger p-0" title="Logout">
                <FaSignOutAlt size={24} className="icon-hover" />
              </button>
            </>
          ) : (
            // --- SHOW THIS ICON IF LOGGED OUT ---
            <Link to="/signin" className="text-dark" title="Sign In / Register">
              <FaUser size={24} />
            </Link>
          )
}
        </div>
      </div>

      {/* Bottom Navigation - Menu Links */}
      <div>
        <nav className="navbar nv navbar-expand-lg navbar-light">
          <div className="container-fluid">
            {/* Centered Navigation Links on Large Screens */}
            <div
              className={`collapse navbar-collapse justify-content-lg-center ${
                isOpen ? "show" : ""
              }`}
              id="navbarNav"
              style={{
                transition: "all 0.3s ease-in-out"
              }}
            >
              {/* Add a close button for mobile menu */}
              {isOpen && (
                <button
                  className="close-btn d-lg-none"
                  onClick={closeNavbar}
                >
                  ✕
                </button>
              )}
              
              <ul className="navbar-nav text-center">
                <li className="nav-item">
                  <Link
                    className="nav-link fw-bold text-dark"
                    to="/home"
                    onClick={closeNavbar}
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link fw-bold text-dark"
                    to="/about"
                    onClick={closeNavbar}
                  >
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link fw-bold text-dark"
                    to="/services"
                    onClick={closeNavbar}
                  >
                    Services
                  </Link>
                </li>
               
          
                {/* <li className="nav-item"><Link className="nav-link fw-bold text-dark" to="/crops" onClick={closeNavbar}>Shop</Link></li> */}
                {isLoggedIn && <li className="nav-item dropdown">
                  <Link
                    className="nav-link fw-bold text-dark dropdown-toggle d-flex align-items-center"
                    to="#"
                    id="shopDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded={activeDropdown === 'shop'}
                    onClick={(e) => handleDropdownToggle(e, 'shop')}
                    style={{ gap: '4px' }}
                  >
                    Shop
                    <FaChevronDown 
                      className="custom-dropdown-icon" 
                      style={{ 
                        fontSize: '10px',
                        marginLeft: '4px',
                        marginTop: '2px',
                        transform: activeDropdown === 'shop' ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease'
                      }}
                    />
                  </Link>
                  <ul 
                    className={`dropdown-menu ${activeDropdown === 'shop' ? 'show' : ''}`} 
                    aria-labelledby="shopDropdown"
                  >
                    <li>
                      <Link 
                        className="dropdown-item d-flex align-items-center" 
                        to="/crops" 
                        onClick={closeNavbar}
                      >
                        <span className="me-2">🌱</span> All Crops
                      </Link>
                    </li>
                    <li>
                      <Link 
                        className="dropdown-item d-flex align-items-center" 
                        to="/shopproducts" 
                        onClick={closeNavbar}
                      >
                        <span className="me-2">🛒</span> Shop Products
                      </Link>
                    </li>
                    <li>
                      <Link 
                        className="dropdown-item d-flex align-items-center" 
                        to="/shopChemicals" 
                        onClick={closeNavbar}
                      >
                        <span className="me-2">🧪</span> Shop Chemicals
                      </Link>
                    </li>
                    <li>
                      <Link 
                        className="dropdown-item d-flex align-items-center" 
                        to="/shop-by-category" 
                        onClick={closeNavbar}
                      >
                        <span className="me-2">📋</span> Shop By Category
                      </Link>
                    </li>
                  </ul>
                </li>}

                <li className="nav-item">
                  <Link
                    className="nav-link fw-bold text-dark"
                    to="/contact"
                    onClick={closeNavbar}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </nav>
  );
}











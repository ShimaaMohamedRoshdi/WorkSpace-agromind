// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import {
//   FaHome,
//   FaLeaf,
//   FaShoppingCart,
//   FaInfoCircle,
//   FaHeart,
//   FaBars,
//   FaTimes,
// } from "react-icons/fa";
// import { MdLogout } from "react-icons/md";
// import { Link } from "react-router-dom";
// import logo from "../assets/images/logo-no-background.png";

// import './Navbar.css'

// export default function Navbar() {
//   const cartQuantity = useSelector((state) => state.cart.totalQuantity);
//   const wishlistCount = useSelector((state) => state.wishlist.totalItems || 0);
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <nav className="navbar">
//       <div className="navbar-container">
//         <div className="navbar-logo">
//           <img src={logo} alt="Logo" />
//         </div>

//         {/* Toggle button with dynamic icon */}
//         <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
//           {menuOpen ? <FaTimes /> : <FaBars />}
//         </button>

//         <ul
//           className={`navbar-links ${menuOpen ? "active" : ""}`}
//           onClick={() => setMenuOpen(false)}
//         >
//           <li>
//             <Link to="/home" className="navbar-item">
//               <FaHome /> Home
//             </Link>
//           </li>
//           <li>
//             <Link to="/crops" className="navbar-item">
//               <FaLeaf /> Crops
//             </Link>
//           </li>
//           <li>
//             <Link to="/cart" className="navbar-item  icon-container">
//               <FaShoppingCart /> {" "}
//               {cartQuantity > 0 && (
//                 <span className="counter">{cartQuantity}</span>
//               )}
//             </Link>
//           </li>
//           <li>
//             <Link to="/about" className="navbar-item">
//               <FaInfoCircle /> About Us
//             </Link>
//           </li>
//           <li>
//             <Link to="/wishlist" className="navbar-item icon-container ">
//               <FaHeart /> {" "}
//               {wishlistCount > 0 && (
//                 <span className="counter">{wishlistCount}</span>
//               )}
//             </Link>
//           </li>
//           <li>
//             <Link to="/logout" className="navbar-item">
//               <MdLogout /> Logout
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// }



////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////












import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaTwitter,
  FaFacebookF,
  FaPinterest,
  FaInstagram,
  FaShoppingCart,
  FaRegHeart,
  FaUser,
} from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import { useSelector } from "react-redux";
import logo from "../assets/images/logo-no-background.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css"; // Import your custom CSS file

export default function Navbar() {
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const wishlistQuantity = useSelector((state) => state.wishlist.totalItems);
  
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const closeNavbar = () => {
    setIsOpen(false);
  };
 

  return (
    <nav className="bg-white border-bottom">
      {/* Top Bar - Social Media & Contact Info */}
      <div className="container-fluid bg-light py-2 d-none d-lg-block">
        <div className="d-flex justify-content-between align-items-center">
          {/* Contact Info */}
          <div className="d-flex gap-3 text-secondary small">
            <span><FiPhoneCall className="text-success me-1" /> +20 01066585154</span>
            <span><MdEmail className="text-danger me-1" /> GraduationProject2025@gmail.com</span>
            <span><MdLocationOn className="text-warning me-1" /> Cairo ,NasrCity</span>
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

          {/* Toggle Button (☰) - Fixed Color */}
          <button
  className="navbar-toggler d-lg-none"
  type="button"
  onClick={handleToggle}
  style={{ color: "green", border: "1px solid green", padding: "5px 10px" }} // Ensure visibility
>
  <span className="navbar-toggler-icon" style={{ backgroundImage: "none" }}>
    ☰ {/* Custom hamburger icon */}
  </span>
</button>

        </div>

        {/* Search Bar */}
        <div className="search-container mt-1 mt-md-0 w-100 ">
          <input type="text" className="form-control" placeholder="Search products..." />
          <button className="btn  ms-1">🔍</button>
        </div>

        {/* Wishlist, Cart, and Register Icon */}
        <div className="d-flex align-items-center gap-4 ms-5 mt-3 mt-md-0">
          <Link to="/wishlist" className="position-relative text-dark">
            <FaRegHeart size={24} />
            {wishlistQuantity > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge bg-danger">
                {wishlistQuantity}
              </span>
            )}
          </Link>

          <Link to="/cart" className="position-relative text-dark">
            <FaShoppingCart size={24} />
            {cartQuantity > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge bg-danger">
                {cartQuantity}
              </span>
            )}
          </Link>

          <Link to="/signup" className="text-dark">
            <FaUser size={24} />
          </Link>
        </div>
      </div>

      {/* Bottom Navigation - Menu Links */}
      <div >
        <nav className="navbar nv navbar-expand-lg navbar-light">
          <div className="container-fluid">
            {/* Centered Navigation Links on Large Screens */}
            <div className={`collapse navbar-collapse justify-content-lg-center ${isOpen ? "show" : ""}`} id="navbarNav">
              <ul className="navbar-nav text-center">
                <li className="nav-item"><Link className="nav-link fw-bold text-dark" to="/home" onClick={closeNavbar}>Home</Link></li>
                <li className="nav-item"><Link className="nav-link fw-bold text-dark" to="/about" onClick={closeNavbar}>About</Link></li>
                <li className="nav-item"><Link className="nav-link fw-bold text-dark" to="/services" onClick={closeNavbar}>Services</Link></li>
                <li className="nav-item"><Link className="nav-link fw-bold text-dark" to="/projects" onClick={closeNavbar}>Projects</Link></li>
                <li className="nav-item"><Link className="nav-link fw-bold text-dark" to="/news" onClick={closeNavbar}>News</Link></li>
                {/* <li className="nav-item"><Link className="nav-link fw-bold text-dark" to="/crops" onClick={closeNavbar}>Shop</Link></li> */}
                <li className="nav-item dropdown">
  <Link
    className="nav-link fw-bold text-dark dropdown-toggle"
    to="#"
    id="shopDropdown"
    role="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    Shop
  </Link>
  <ul className="dropdown-menu" aria-labelledby="shopDropdown">
    <li><Link className="dropdown-item" to="/crops">All Crops</Link></li>
    <li><Link className="dropdown-item" to="/shopproducts">Shop Products</Link></li>
    {/* <li><Link className="dropdown-item" to="/fruits">Fruits</Link></li>
    <li><Link className="dropdown-item" to="/seeds">Seeds</Link></li> */}
  </ul>
</li>

                <li className="nav-item"><Link className="nav-link fw-bold text-dark" to="/signup" onClick={closeNavbar}>Contact</Link></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </nav>
  );
}

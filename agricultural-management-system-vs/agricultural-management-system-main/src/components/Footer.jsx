import React, { useState } from "react";
import {
  FaArrowRight,
  FaFacebook,

  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState("");

  // Handle email subscription
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email address");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    console.log("Subscribed Email:", email);
    setEmail("");
  };

  return (
    <footer className="bg-dark text-white py-5">
      <div className="container">
        <div className="row text-center text-md-start">
          {/* Subscribe Section */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold">AgroMind</h5>
            <p>Subscribe to get 10% off your first order.</p>
            <form onSubmit={handleSubscribe} className="d-flex">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control rounded-start"
              />
              <button
                type="submit"
                className="btn btn-primary rounded-end"
                aria-label="Subscribe"
              >
                <FaArrowRight />
              </button>
            </form>
          </div>

          {/* Support Section */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold">Support</h5>
            <address className="mt-3">
              <p>Egypt, Cairo, Nasr City</p>
              <p>
                <a
                  href="mailto:shimaamohamed873@gmail.com"
                  className="text-white text-decoration-none"
                >
                    TeamGraduationProject873@gmail.com
                </a>
              </p>
              <p>
                <a href="tel:+201066585154" className="text-white text-decoration-none">
                  +20 10665800
                </a>
              </p>
            </address>
          </div>

          {/* Account Section */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold">Account</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-white text-decoration-none">
                  My Account
                </a>
              </li>
              <li>
                <Link to="/register" className="text-white text-decoration-none">
                  Login / Register
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-white text-decoration-none">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-white text-decoration-none">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-white text-decoration-none">
                  Shop
                </Link>
              </li>
            </ul>
          </div>

     
        </div>

        {/* Social Links */}
        <div className="text-center mt-4">
          <h5 className="fw-bold">Follow Us</h5>
          <div className="d-flex justify-content-center gap-4 mt-3">
            <a
              href="https://www.facebook.com/profile.php?id=100071288824312"
              className="text-white fs-4"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href="https://github.com/ShimaaMohamedRoshdi"
              className="text-white fs-4"
              aria-label="Github"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.instagram.com/shimaa__mohamed2003/profilecard/?igsh=MTBwc3gzeG40dnRybA=="
              className="text-white fs-4"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/in/shimaa-mohamed-502aab27b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              className="text-white fs-4"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center mt-4 pt-3 border-top border-secondary">
          <p className="mb-0 text-secondary">
            © {new Date().getFullYear()} teamGP. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

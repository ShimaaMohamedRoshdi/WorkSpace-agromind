import React from "react";
import { Link } from "react-router-dom";
import "./HeroSectionAbout.css";
import tractorImg from "../assets/images/contactus/15.jpg";

const HeroSectionAbout = () => {
  return (
    <div
      className="hero-about-section d-flex flex-column justify-content-center align-items-center text-white text-center"
      style={{
        background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${tractorImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "50vh",
        position: "relative",
        padding: "0 20px",
      }}
    >
      <h1 className="hero-about-title">About Us</h1>
      <nav className="breadcrumb-nav" aria-label="breadcrumb">
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <Link to="/" className="breadcrumb-link">
              <i className="fas fa-home"></i> Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            About
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default HeroSectionAbout;

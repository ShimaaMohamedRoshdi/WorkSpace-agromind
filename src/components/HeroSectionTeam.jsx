import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import teamHeroImg from "../assets/images/contactus/15.jpg"; // You can replace with a more appropriate image

const HeroSectionTeam = () => {
  return (
    <div
      className="hero-team-section d-flex flex-column justify-content-center align-items-center text-white text-center"
      style={{
        background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${teamHeroImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "50vh",
        position: "relative",
        padding: "0 20px",
      }}
    >
      <h1 className="display-4 fw-bold mb-3" data-aos="fade-up">Our Farming Experts</h1>
      <p className="lead mb-4" data-aos="fade-up" data-aos-delay="100">
        Meet the dedicated team behind our agricultural success
      </p>
      <nav className="breadcrumb-nav" aria-label="breadcrumb" data-aos="fade-up" data-aos-delay="200">
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <Link to="/" className="text-white text-decoration-none">
              <i className="fas fa-home"></i> Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/" className="text-white text-decoration-none">
              About
            </Link>
          </li>
          <li className="breadcrumb-item active text-white" aria-current="page">
            Our Team
          </li>
        </ol>
      </nav>
      
      {/* Decorative wave/zigzag at bottom */}
      <div 
        className="position-absolute bottom-0 left-0 w-100"
        style={{
          height: "25px",
          background: "#ffffff",
          clipPath: "polygon(0% 0%, 5% 100%, 10% 0%, 15% 100%, 20% 0%, 25% 100%, 30% 0%, 35% 100%, 40% 0%, 45% 100%, 50% 0%, 55% 100%, 60% 0%, 65% 100%, 70% 0%, 75% 100%, 80% 0%, 85% 100%, 90% 0%, 95% 100%, 100% 0%, 100% 100%, 0% 100%)"
        }}
      ></div>
    </div>
  );
};

export default HeroSectionTeam;
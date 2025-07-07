import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HealthyFoods from "../components/HealthyFoods";
import "./Home.css";
import AgricultureSkill from "../components/AgricultureSkill";
import HeroSection from "../components/HeroSection";
import FarmerSection from "../components/FarmerSection";
import HealthyLifeSection from "../components/HealthyLifeSection";
import OrganicSection from "../components/OrganicSection";
import Categories from "../components/Categories";
import Brands from "../components/Brands";

function Home() {
  const navigate = useNavigate();

  // State to track if the user is logged in. This is still needed
  // for the buttons that are part of the Home page itself.
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // This hook runs once when the component loads to check the login status.
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Navigation handlers for the buttons
  const handleMyLandsClick = () => {
    navigate("/add-land");
  };

  const handleViewMyPlansClick = () => {
    navigate("/ViewMyPlans");
  };

  return (
    <div>
      {/* Hero Section */}
      <div
        className="hero-section position-relative vh-100 w-100"
        style={{
          backgroundImage: "url('/src/assets/images/index-2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "100% center",
          position: "relative",
          overflow: "hidden" // Add this to ensure the zigzag is visible
        }}
      >
        {/* Dark Overlay */}
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>

        {/* Content */}
        <div className="position-relative d-flex flex-column justify-content-center align-items-center h-100 text-white text-center px-3">
          <p className="tagline">Better Agriculture for Better Future</p>
          <h1 className="hero-title">
            EVERY CROP COUNTS, <br /> EVERY FARMER MATTERS.
          </h1>
          <div className="underline"></div>
          <p className="hero-text">
            The paramount doctrine of the economic and technological euphoria of
            recent decades has been that everything depends on innovation.
          </p>

          {/* Buttons conditionally rendered based on login status */}
          {isLoggedIn && (
            <div
              className="d-flex flex-column flex-sm-row gap-3 mt-4 w-100"
              style={{ maxWidth: "500px" }}
            >
              <button
                className="btn btn-light btn-lg w-100 d-flex justify-content-center align-items-center"
                onClick={handleMyLandsClick}
              >
                View My Lands <span className="ms-2">➝</span>
              </button>
              <button
                className="btn btn-warning btn-lg w-100 d-flex justify-content-center align-items-center"
                onClick={handleViewMyPlansClick}
              >
                View My Plans <span className="ms-2">➝</span>
              </button>
            </div>
          )}
        </div>

        {/* Yellow Grass Bottom Wave */}
        <div className="grass-wave"></div>
      </div>

      {/* All other sections of your Home page */}
      <AgricultureSkill />
      <HeroSection />
      <Categories />
      <hr/>
      <FarmerSection />
      <HealthyFoods />
      <HealthyLifeSection />
      <OrganicSection />
      <Brands/>
      
      {/* <Products /> */}
    </div>
  );
}

export default Home;



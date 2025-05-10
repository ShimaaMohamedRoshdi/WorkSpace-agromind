import React from "react";
import HealthyFoods from "../components/HealthyFoods";
import Products from "../components/Products";
import "./Home.css";
import AgricultureSkill from "../components/AgricultureSkill";
import HeroSection from "../components/HeroSection";
import FarmerSection from "../components/FarmerSection";
import HealthyLifeSection from "../components/HealthyLifeSection";
import OrganicSection from "../components/OrganicSection";
import Categories from "../components/Categories";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/add-land");
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

          <button className="hero-button" onClick={handleClick}>
            Start Planting Now <span className="arrow">➝</span>
          </button>

          <button className="hero-button " onClick={handleClick}>
            Recommend Crop <span className="arrow">➝</span>
          </button>
        </div>

        {/* Yellow Grass Bottom Wave */}
        <div className="grass-wave"></div>
      </div>

      {/* Other Sections */}
      <AgricultureSkill />
      <HeroSection />
      <hr />
      <Categories />
      <hr />
      <FarmerSection />
      <HealthyFoods />
      <HealthyLifeSection />
      <OrganicSection />

      {/* <Products /> */}
    </div>
  );
}

export default Home;

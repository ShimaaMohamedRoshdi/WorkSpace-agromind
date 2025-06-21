import React from "react";
import "./AboutInfoSection.css";
import farmerImg from "../assets/images/Aboutus/3 (5).jpg";

const AboutInfoSection = () => {
  return (
    <div className="about-info-section container d-flex align-items-center justify-content-between my-5">
      <div className="about-info-image-wrapper position-relative">
        <img src={farmerImg} alt="Farmer" className="about-info-image rounded-circle" />
        <div className="decorative-icon icon-strawberry">🍓</div>
        <div className="decorative-icon icon-cabbage">🥬</div>
        <div className="decorative-icon icon-tomato">🍅</div>
      </div>
      <div className="about-info-content">
        <p className="section-subtitle">Why Chose Us</p>
        <h2 className="section-title">Bringing natures bounty to your plate</h2>
        <p className="section-description">
          Agriculture and farming are essential industries that involve the cultivation of crops, raising of livestock, and production
        </p>
        <div className="progress-group">
          <div className="progress-label">
            <span>Pure And Organic</span>
            <span>70%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "70%" }}></div>
          </div>
        </div>
        <div className="progress-group">
          <div className="progress-label">
            <span>Healthy Food</span>
            <span>80%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "80%" }}></div>
          </div>
        </div>
      
      </div>
    </div>
  );
};

export default AboutInfoSection;

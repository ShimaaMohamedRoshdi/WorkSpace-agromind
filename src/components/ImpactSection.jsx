import React from 'react';
import './ImpactSection.css';
import farmImage from '../assets/images/Aboutus/3 (5).jpg'; // Reusing an existing image, replace as needed

const ImpactSection = () => {
  return (
    <div className="impact-section">
      <div className="container">
        <div className="impact-header" data-aos="fade-up">
          <h6 className="impact-subtitle">OUR MISSION & IMPACT</h6>
          <h2 className="impact-title">Growing a Sustainable Future</h2>
          <div className="impact-divider"></div>
        </div>

        <div className="row align-items-center">
          <div className="col-lg-5" data-aos="fade-right">
            <div className="impact-image-container">
              <img src={farmImage} alt="Sustainable Farming" className="impact-image" />
              <div className="impact-stats">
                <div className="stat-item">
                  <span className="stat-number">85%</span>
                  <span className="stat-text">Reduced Water Usage</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">60%</span>
                  <span className="stat-text">Higher Crop Yield</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-lg-6" data-aos="fade-left">
            <div className="impact-content">
              <p className="impact-lead">
                At Agromind, we're committed to revolutionizing agriculture through sustainable practices and innovative technology.
              </p>
              
              <div className="impact-goals">
                <div className="impact-goal" data-aos="zoom-in" data-aos-delay="100">
                  <div className="goal-icon">🌱</div>
                  <div className="goal-content">
                    <h4>Sustainable Farming</h4>
                    <p>We promote farming methods that preserve soil health, conserve water, and reduce chemical usage.</p>
                  </div>
                </div>
                
                <div className="impact-goal" data-aos="zoom-in" data-aos-delay="200">
                  <div className="goal-icon">🧪</div>
                  <div className="goal-content">
                    <h4>Research & Innovation</h4>
                    <p>Our team continuously researches and develops new agricultural technologies and practices.</p>
                  </div>
                </div>
                
                <div className="impact-goal" data-aos="zoom-in" data-aos-delay="300">
                  <div className="goal-icon">👨‍🌾</div>
                  <div className="goal-content">
                    <h4>Farmer Education</h4>
                    <p>We provide training and resources to help farmers adopt sustainable and profitable practices.</p>
                  </div>
                </div>
              </div>
              
            
            </div>
          </div>
        </div>
      
      </div>
    </div>
  );
};

export default ImpactSection;
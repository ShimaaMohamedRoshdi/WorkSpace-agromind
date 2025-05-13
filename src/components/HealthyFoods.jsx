import React from "react";
import { FaSeedling, FaAppleAlt, FaFish, FaCarrot, FaGlobe } from "react-icons/fa"; 
import "animate.css";
import "./HealthyFoods.css";

const HealthyFoods = () => {
  return (
    <div className="healthy-foods-section text-center bg-dark mb-3">
      <div className="section-title py-5">
        <h5 className="text-success fw-bold">
          <span className="icon-decoration">🌾</span> Healthy Foods{" "}
          <span className="icon-decoration">🌾</span>
        </h5>
        <h1 className="text-white fw-bold mt-3">
          What We Provide For Your Better Health
        </h1>
      </div>
      
      <div className="container py-4 m-auto">
        <div className="row">
          {/* Food Cards */}
          {[
            { icon: <FaSeedling size={40} />, text: "Fresh Wheat Sack Food" },
            { icon: <FaAppleAlt size={40} />, text: "Organic Fresh Fruits" },
            { icon: <FaFish size={40} />, text: "Fresh Pond & Sea Fish" },
            { icon: <FaCarrot size={40} />, text: "Fresh Organic Vegetable" },
            { icon: <FaGlobe size={40} />, text: "Planet Earth Safety" },
          ].map((item, index) => (
            <div key={index} className="col-md-4 col-lg-2 mb-3 m-auto">
              <div
                className="card m-auto food-card text-center bg-dark text-success py-4 d-flex flex-column align-items-center justify-content-center animate__animated animate__fadeInUp"
                style={{ animationDelay: `${index * 0.2}s` }} // Delay each card animation
              >
                {item.icon}
                <p className="mt-0 fw-bold">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthyFoods;

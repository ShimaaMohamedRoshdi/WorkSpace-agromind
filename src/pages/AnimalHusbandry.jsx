import React from "react";
import { GiShoppingBag } from "react-icons/gi";
import { GiCow, GiMedicalPack, GiCheeseWedge } from "react-icons/gi";
import "./AnimalHusbandry.css";

const animalCategories = [
  { name: "Animals", count: 426, icon: <GiCow /> },
  { name: "Animal Feeds", count: 54, icon: <GiShoppingBag /> },
  { name: "Veterinary & Pet Supplies", count: 38, icon: <GiMedicalPack /> },
  { name: "Animal Products", count: 6, icon: <GiCheeseWedge /> },
];

const AnimalHusbandry = () => {
  return (
    <div className="animal-container">
      <h5 className="section-title">Animal Husbandry</h5>
      <div className="category-grid">
        {animalCategories.map((item, index) => (
          <div key={index} className="category-card">
            <div className="category-icon">{item.icon}</div>
            <p className="category-name">{item.name}</p>
            <p className="category-count">{item.count.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimalHusbandry;

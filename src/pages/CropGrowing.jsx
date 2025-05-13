import React from "react";
import { GiPlantRoots, GiMushroom } from "react-icons/gi";
import { GiChemicalTank } from "react-icons/gi"; // Import new icon
import "./CropGrowing.css";

const cropGrowingList = [
  { name: "Seeds", count: 905, icon: <GiPlantRoots /> },
  { name: "Mycelium", count: 16, icon: <GiMushroom /> },
  { name: "Agrochemistry", count: 50, icon: <GiChemicalTank /> }, // Added new item
];

const CropGrowing = () => {
  return (
    <div className="container">
      <h2>Crop Growing</h2>
      <div className="grid">
        {cropGrowingList.map((item, index) => (
          <div key={index} className="card">
            <div className="icon">{item.icon}</div>
            <p>{item.name}</p>
            <span>{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CropGrowing;

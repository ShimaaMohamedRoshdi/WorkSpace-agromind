import React from "react";
import "./FarmEquipment.css";
import { MdAgriculture } from "react-icons/md";
import { GiGrain, GiFruitTree, GiFertilizerBag } from "react-icons/gi";
import { FaSeedling, FaTruck, FaTools, FaWarehouse, FaTree, FaTractor } from "react-icons/fa";

const equipmentList = [
  { name: "Tractors", count: 15094, icon: <FaTractor /> },
   { name: "Planting equipment", count: 3209, icon: <FaSeedling /> },
  { name: "Transportation machinery", count: 820, icon: <FaTruck /> },
  { name: "Potato equipment", count: 813, icon: <FaSeedling /> },
    { name: "Equipment", count: 2519, icon: <FaWarehouse /> },
  { name: "Tires and wheels", count: 3387, icon: <FaTruck /> },
];

const FarmEquipment = () => {
  return (
    <div className="farm-container">
      <h5 className="farm-equipment-title">Farm Equipment</h5>

      {/* Equipment Grid */}
      <div className="equipment-grid">
        {equipmentList.map((item, index) => (
          <div key={index} className="equipment-card">
            <div className="equipment-icon">{item.icon}</div>
            <p className="equipment-name">{item.name}</p>
            <p className="equipment-count">{item.count.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FarmEquipment;

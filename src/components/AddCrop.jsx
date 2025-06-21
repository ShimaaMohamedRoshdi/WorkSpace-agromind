import React, { useState } from "react";
import CropStages from "./CropStages";

const AddCrop = () => {
  const [cropName, setCropName] = useState("");
  const [description, setDescription] = useState("");
  const [stages, setStages] = useState([]);

  const handleAddStage = (stage) => {
    setStages([...stages, stage]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ cropName, description, stages });
    alert("Crop saved successfully!");
  };

  return (
    <div className="card p-4 shadow-sm">
      <h4>Add New Crop</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Crop Name</label>
          <input
            type="text"
            className="form-control"
            value={cropName}
            onChange={(e) => setCropName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <CropStages onAddStage={handleAddStage} />

        <button type="submit" className="btn btn-success mt-3">
          Save Crop
        </button>
      </form>
    </div>
  );
};

export default AddCrop;

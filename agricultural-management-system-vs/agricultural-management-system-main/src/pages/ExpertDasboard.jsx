import React, { useState, useEffect } from "react";
import api from "../../services/api"; // Use shared API instance
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

const cropList = [
  "Wheat",
  "Barley",
  "Maize (Corn)",
  "Rice",
  "Soybeans",
  "Potatoes",
  "Tomatoes",
  "Carrots",
  "Onions",
  "Strawberries",
  "Other",
];
const cropStagesList = [
  "Soil Preparation",
  "Seed Selection",
  "Germination",
  "Seedling Stage",
  "Vegetative Growth",
  "Bud Formation",
  "Flowering",
  "Pollination",
  "Fruit Development",
  "Maturity & Ripening",
  "Harvesting",
  "Post-Harvest Handling",
];

const toolsList = [
  "Tractor",
  "Plow",
  "Irrigation System",
  "Hoe",
  "Seeder",
  "Other",
];
const fertilizersList = ["Compost", "Urea", "Phosphate", "Potassium", "Other"];

const ExpertDashboard = () => {
  const [cropName, setCropName] = useState("");
  const [customCrop, setCustomCrop] = useState("");
  const [stages, setStages] = useState([]);
  const [crops, setCrops] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [editingCropId, setEditingCropId] = useState(null);
  const [cropImage, setCropImage] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [selectedCropId, setSelectedCropId] = useState(null);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Fetch crops from backend on mount
  useEffect(() => {
    api
      .get("/api/Crop/GetAllCrops") // Updated to use shared api instance and correct baseURL
      .then((res) => {
        setCrops(res.data);
        console.log("Fetched crops:", res.data); // Log crops for debugging
      })
      .catch((err) => console.error("Error fetching crops:", err));
  }, []);

  const handleOpenDeleteDialog = (cropId) => {
    setSelectedCropId(cropId);
    console.log("Selected crop ID for deletion:", selectedCropId, cropId); // Log selected crop ID
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedCropId) {
      alert("No crop selected for deletion.");
      setOpenDeleteDialog(false);
      return;
    }
    api
      .delete(`/api/Crop/DeleteCrop/${selectedCropId}`) // Updated to use shared api instance and correct baseURL
      .then(() => {
        // Always refresh crops from backend after delete
        api
          .get("/api/Crop/GetAllCrops") // Updated to use shared api instance and correct baseURL
          .then((res) => setCrops(res.data));
        setOpenDeleteDialog(false);
        setSelectedCropId(null);
      })
      .catch((err) => {
        alert("Failed to delete crop from backend.");
        setOpenDeleteDialog(false);
        setSelectedCropId(null);
      });
  };

  const handleOpenUpdateDialog = (cropId) => {
    const crop = crops.find((c) => c.id === cropId);
    setEditingCropId(crop.id);
    setCropName(crop.cropName);
    setStages(crop.stages);
    setCropImage(crop.cropImage);
    setOpenUpdateDialog(true);
  };

  const handleConfirmUpdate = () => {
    if (editingCropId === null) {
      alert("No crop selected for update.");
      setOpenUpdateDialog(false);
      return;
    }

    // Prepare payload for update
    const totalCost = stages.reduce(
      (sum, stage) => sum + Number(stage.cost || 0),
      0
    );

    const mappedStages = stages.map((stage) => ({
      stageName: stage.stage || "",
      duration: Number(stage.duration) || 0,
      description: stage.description || "",
      pictureUrl: stage.pictureUrl || "",
      totalCost: Number(stage.cost) || 0,
      optionalLink: stage.link || "",
      steps: (stage.steps || []).map((step) => ({
        stepName: step.stepName || "",
        tool: step.tool || "",
        toolImage: step.toolImage || "",
        durationDays: Number(step.durationDays) || 0,
        fertilizer: step.fertilizer || "",
        fertilizerDuration: Number(step.fertilizerDuration) || 0,
        cost: Number(step.cost) || 0,
        description: step.description || "",
      })),
    }));

    const normalizedCropImage = (cropImage || "").replace(/\\/g, "/");

    const payload = {
      cropName: cropName === "Other" ? customCrop : cropName,
      cropImage: normalizedCropImage,
      stages: mappedStages,
    };

    api
      .put(`/api/Crop/UpdateCrop/${editingCropId}`, payload)
      .then(() => {
        setSuccessMessage("Crop updated successfully!");
        setOpenUpdateDialog(false);
        setEditingCropId(null);
        // Refresh crop list
        api
          .get("/api/Crop/GetAllCrops")
          .then((res) => setCrops(res.data))
          .catch((err) => console.error("Error fetching crops:", err));
      })
      .catch((error) => {
        console.error("Error updating crop:", error);
        alert("Failed to update crop.");
        setOpenUpdateDialog(false);
      });
  };

  const addStage = () => {
    setStages([...stages, { stage: "", cost: "", link: "", steps: [] }]);
  };

  const addStep = (stageIndex) => {
    const updatedStages = [...stages];
    updatedStages[stageIndex].steps.push({
      description: "",
      tool: "",
      toolImage: "",
      durationDays: "",
      fertilizer: "",
      fertilizerDuration: "",
    });
    setStages(updatedStages);
  };

  const handleStageChange = (index, key, value) => {
    const updatedStages = [...stages];
    updatedStages[index][key] = value;
    setStages(updatedStages);
  };

  const handleStepChange = (stageIndex, stepIndex, key, value) => {
    const updatedStages = [...stages];
    updatedStages[stageIndex].steps[stepIndex][key] = value;
    setStages(updatedStages);
  };

  const handleSubmit = () => {
    const totalCost = stages.reduce(
      (sum, stage) => sum + Number(stage.cost || 0),
      0
    );

    // Map stages to match backend DTO
    const mappedStages = stages.map((stage) => ({
      stageName: stage.stage || "",
      duration: Number(stage.duration) || 0,
      description: stage.description || "",
      pictureUrl: stage.pictureUrl || "",
      totalCost: Number(stage.cost) || 0,
      optionalLink: stage.link || "",
      steps: (stage.steps || []).map((step) => ({
        stepName: step.stepName || "",
        tool: step.tool || "",
        toolImage: step.toolImage || "",
        durationDays: Number(step.durationDays) || 0,
        fertilizer: step.fertilizer || "",
        fertilizerDuration: Number(step.fertilizerDuration) || 0,
        cost: Number(step.cost) || 0,
        description: step.description || "",
      })),
    }));

    // Ensure image path uses forward slashes
    const normalizedCropImage = (cropImage || "").replace(/\\/g, "/");

    const payload = {
      cropName: (cropName === "Other" ? customCrop : cropName) || "",
      cropImage: normalizedCropImage,
      stages: mappedStages,
    };

    // Log payload for debugging
    console.log("Submitting payload:", payload);

    // Only update crops from backend after add/update
    api
      .post("/api/Crop/AddCrop", payload)
      .then(() => {
        setSuccessMessage("Crop saved to backend!");
        api
          .get("/api/Crop/GetAllCrops")
          .then((res) => setCrops(res.data))
          .catch((err) => console.error("Error fetching crops:", err));
      })
      .catch((error) => {
        console.error("Error saving crop:", error);
        alert("Something went wrong while connecting to the backend.");
      });

    setCropName("");
    setCustomCrop("");
    setStages([]);
    setCropImage("");
    setEditingCropId(null);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCropImage(file); // ✅ Store the file itself, not URL.createObjectURL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // just for preview
      };
      reader.readAsDataURL(file);
    }
  };

  const payload = {
    cropName: cropName === "Other" ? customCrop : cropName,
    cropImage, // this is just a string URL now
    stages, // includes all your steps too
  };

  return (
    <div>
      <h2 className="text-center mt-4 text-success">Expert Dashboard</h2>
      <div className="d-flex">
        {/* Sidebar */}
        <div
          className="sidebar p-2 border-end"
          style={{ width: "250px", background: "#f8f9fa" }}
        >
          <h5>Added Crops</h5>
          <ul className="list-group">
            {crops.map((crop, index) => (
              <li
                key={crop.id ?? `local-${index}`}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>{crop.cropName}</span>

                <button
                  className="btn btn-sm btn-primary me-1"
                  onClick={() => handleOpenUpdateDialog(crop.id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleOpenDeleteDialog(crop.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>

          {/* Delete Confirmation Dialog */}
          <Dialog
            open={openDeleteDialog}
            onClose={() => setOpenDeleteDialog(false)}
          >
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this crop?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setOpenDeleteDialog(false)}
                color="primary"
              >
                Cancel
              </Button>
              <Button onClick={handleConfirmDelete} color="error">
                Delete
              </Button>
            </DialogActions>
          </Dialog>

          {/* Update Confirmation Dialog */}
          <Dialog
            open={openUpdateDialog}
            onClose={() => setOpenUpdateDialog(false)}
          >
            <DialogTitle>Confirm Update</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to update this crop?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setOpenUpdateDialog(false)}
                color="primary"
              >
                Cancel
              </Button>
              <Button onClick={handleConfirmUpdate} color="success">
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </div>

        {/* Main Content */}
        <div className="container mt-2">
          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}

          {/* Crop Name and Image */}
          <div className="mb-2">
            <label className="fw-bold">Crop Name:</label>
            <select
              className="form-control w-50"
              value={cropName || ""}
              onChange={(e) => setCropName(e.target.value)}
            >
              <option value="">Select Crop</option>
              {cropList.map((crop, i) => (
                <option key={i} value={crop}>
                  {crop}
                </option>
              ))}
            </select>
            {cropName === "Other" && (
              <input
                type="text"
                className="form-control mt-2 w-50"
                placeholder="Enter crop name"
                value={customCrop || ""}
                onChange={(e) => setCustomCrop(e.target.value)}
              />
            )}

            <label className="fw-bold mt-2">Crop Image URL:</label>
            <input
              type="text"
              className="form-control w-50"
              placeholder="Enter Crop Image URL"
              value={cropImage || ""}
              onChange={(e) => setCropImage(e.target.value)} // Store URL
            />
            {cropImage && (
              <img
                src={cropImage} // Show image using the URL entered
                alt="Crop Preview"
                className="mt-2"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
            )}
          </div>

          {/* Stages */}
          <h5 className="fw-bold">Crop Stages</h5>
          {stages.map((stage, index) => (
            <div key={index} className="mb-3 border p-2">
              <select
                className="form-control w-50"
                value={stage.stage}
                onChange={(e) =>
                  handleStageChange(index, "stage", e.target.value)
                }
              >
                <option value="">Select Stage</option>
                {cropStagesList.map((stageName, i) => (
                  <option key={i} value={stageName}>
                    {stageName}
                  </option>
                ))}
              </select>
              <input
                type="text"
                className="form-control mt-2 w-50"
                placeholder="Optional Link"
                value={stage.link}
                onChange={(e) =>
                  handleStageChange(index, "link", e.target.value)
                }
              />

              {stage.steps.map((step, stepIndex) => (
                <div key={stepIndex} className="mt-2 border p-2">
                  {/* Tools and Duration */}
                  <div className="d-flex mt-2">
                    <select
                      className="form-control me-2 w-50"
                      value={step.tool}
                      onChange={(e) =>
                        handleStepChange(
                          index,
                          stepIndex,
                          "tool",
                          e.target.value
                        )
                      }
                    >
                      <option value="">Select Tool</option>
                      {toolsList.map((tool, i) => (
                        <option key={i} value={tool}>
                          {tool}
                        </option>
                      ))}
                    </select>

                    <input
                      type="text"
                      className="form-control w-25 me-2"
                      placeholder="Tool Image URL"
                      value={step.toolImage}
                      onChange={(e) =>
                        handleStepChange(
                          index,
                          stepIndex,
                          "toolImage",
                          e.target.value
                        )
                      }
                    />

                    <input
                      type="number"
                      className="form-control w-25"
                      placeholder="Duration (Days)"
                      value={step.durationDays}
                      onChange={(e) =>
                        handleStepChange(
                          index,
                          stepIndex,
                          "durationDays",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  {/* Fertilizer and Duration */}
                  <div className="d-flex mt-2">
                    <select
                      className="form-control me-2 w-50"
                      value={step.fertilizer}
                      onChange={(e) =>
                        handleStepChange(
                          index,
                          stepIndex,
                          "fertilizer",
                          e.target.value
                        )
                      }
                    >
                      <option value="">Select Fertilizer</option>
                      {fertilizersList.map((fertilizer, i) => (
                        <option key={i} value={fertilizer}>
                          {fertilizer}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      className="form-control w-50"
                      placeholder="Duration (Days)"
                      value={step.durationDays}
                      onChange={(e) =>
                        handleStepChange(
                          index,
                          stepIndex,
                          "durationDays",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
              ))}
              <button
                className="btn btn-secondary mt-2"
                onClick={() => addStep(index)}
              >
                + Add Step
              </button>
              <input
                type="number"
                className="form-control mt-2 w-50"
                placeholder="Stage Cost"
                value={stage.cost}
                onChange={(e) =>
                  handleStageChange(index, "cost", e.target.value)
                }
              />
            </div>
          ))}
          <button className="btn btn-danger w-50" onClick={addStage}>
            + Add Stage
          </button>
          <div className="mt-3 fw-bold">
            Total Cost: $
            {stages.reduce((sum, stage) => sum + Number(stage.cost || 0), 0)}
          </div>
          <button className="btn btn-success w-50 mt-3" onClick={handleSubmit}>
            {editingCropId ? "Update Crop" : "Save Crop"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpertDashboard;

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

const FarmerPlan = () => {
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
  const fertilizersList = [
    "Compost",
    "Urea",
    "Phosphate",
    "Potassium",
    "Other",
  ];

  const [cropName, setCropName] = useState("");
  const [customCrop, setCustomCrop] = useState("");
  const [stages, setStages] = useState([]);
  const [crops, setCrops] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [editingCropId, setEditingCropId] = useState(null);
  const [cropImage, setCropImage] = useState("");
  const [description, setDescription] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedCropId, setSelectedCropId] = useState(null);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Fetch crops from backend on mount
  useEffect(() => {
    api
      .get("/api/Crop/GetCrops") // Updated to use shared api instance and correct baseURL
      .then((res) => {
        setCrops(res.data);
        console.log("Fetched crops:", res.data); // Log crops for debugging
      })
      .catch((err) => console.error("Error fetching crops:", err));
  }, []);

  const handleOpenDeleteDialog = (cropId, event) => {
    if (event && event.target) event.target.blur();
    const idStr = String(cropId);
    setSelectedCropId(idStr);
    console.log("Opening delete dialog for cropId:", idStr);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (
      selectedCropId === null ||
      selectedCropId === undefined ||
      selectedCropId === "undefined"
    ) {
      alert("No crop selected for deletion.");
      setOpenDeleteDialog(false);
      return;
    }
    const crop = crops.find(
      (c) =>
        String(c.id) === selectedCropId ||
        String(c.cropId) === selectedCropId ||
        String(c.Id) === selectedCropId ||
        String(c.CropId) === selectedCropId
    );
    const idToDelete = crop
      ? crop.id ?? crop.cropId ?? crop.Id ?? crop.CropId
      : selectedCropId;
    console.log("Attempting to delete crop with id:", idToDelete, crop);
    api
      .delete(`/api/Crop/DeleteCrop/${idToDelete}`)
      .then((res) => {
        console.log("Delete response:", res);
        api.get("/api/Crop/GetCrops").then((res) => setCrops(res.data));
        setOpenDeleteDialog(false);
        setSelectedCropId(null);
      })
      .catch((err) => {
        console.error("Delete error:", err);
        alert("Failed to delete crop from backend.");
        setOpenDeleteDialog(false);
        setSelectedCropId(null);
      });
  };

  const handleOpenUpdateDialog = (cropId, event) => {
    if (event && event.target) event.target.blur();
    const crop = crops.find(
      (c) =>
        String(c.id) === String(cropId) ||
        String(c.cropId) === String(cropId) ||
        String(c.Id) === String(cropId) ||
        String(c.CropId) === String(cropId)
    );
    if (!crop) {
      console.error("No crop found for update dialog with id:", cropId, crops);
      return;
    }
    setEditingCropId(crop.id ?? crop.cropId ?? crop.Id ?? crop.CropId);
    setCropName(crop.cropName || crop.name || crop.CropName || crop.Name || "");
    // Always ensure stages and steps are arrays
    const rawStages = JSON.parse(
      JSON.stringify(crop.stages || crop.Stages || [])
    );
    const safeStages = Array.isArray(rawStages)
      ? rawStages.map((s) => ({
          ...s,
          steps: Array.isArray(s.steps) ? s.steps : [],
        }))
      : [];
    setStages(safeStages);
    setCropImage(crop.cropImage || crop.CropImage || "");
    setDescription(crop.description || crop.CropDescription || "");
    // Do NOT open a dialog
  };

  const handleConfirmUpdate = () => {
    if (editingCropId === null) {
      alert("No crop selected for update.");
      return;
    }
    // Prevent update if no stages
    if (!stages || stages.length === 0) {
      alert("You must add at least one stage before updating the crop.");
      return;
    }
    // Map stages and steps to PascalCase keys for backend compatibility
    const mappedStages = stages.map((stage) => ({
      StageName: stage.stage || stage.stageName || "",
      Duration: Number(stage.duration) || 0,
      Description: stage.description || "",
      PictureUrl: stage.pictureUrl || "",
      TotalCost: Number(stage.cost || stage.totalCost) || 0,
      OptionalLink: stage.link || stage.optionalLink || "",
      Steps: (stage.steps || []).map((step) => ({
        StepName: step.stepName || "",
        Tool: step.tool || "",
        ToolImage: step.toolImage || "",
        DurationDays: Number(step.durationDays) || 0,
        Fertilizer: step.fertilizer || "",
        FertilizerDuration: Number(step.fertilizerDuration) || 0,
        Cost: Number(step.cost) || 0,
        Description: step.description || "",
      })),
    }));
    const normalizedCropImage = (cropImage || "").replace(/\\/g, "/");
    // Ensure editingCropId is a number if possible
    const numericCropId = isNaN(Number(editingCropId))
      ? editingCropId
      : Number(editingCropId);
    const payload = {
      CropId: numericCropId, // For backend compatibility
      Id: numericCropId, // For backend compatibility
      CropName: cropName === "Other" ? customCrop : cropName,
      CropImage: normalizedCropImage,
      Description: description,
      Stages: mappedStages,
    };
    console.log("Update URL ID:", numericCropId);
    console.log("Update payload:", JSON.stringify(payload, null, 2));
    api
      .put(`/api/Crop/UpdateCrop/${editingCropId}`, payload)
      .then(() => {
        setSuccessMessage("Crop updated successfully!");
        setEditingCropId(null);
        setCropName("");
        setCustomCrop("");
        setStages([]);
        setCropImage("");
        setDescription("");
        api.get("/api/Crop/GetCrops").then((res) => {
          setCrops(res.data);
        });
      })
      .catch((error) => {
        console.error("Error updating crop:", error);
        if (error.response) {
          console.error("Backend error response:", error.response);
          console.error("Backend error data:", error.response.data);
          alert(
            "Failed to update crop. Backend says: " +
              (typeof error.response.data === "string"
                ? error.response.data
                : JSON.stringify(error.response.data))
          );
        } else {
          alert("Failed to update crop.");
        }
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
      description: description || "",
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
          .get("/api/Crop/GetCrops") // Use consistent endpoint
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
    setDescription("");
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

  return (
    <div>
      <h2 className="text-center mt-4 text-success">Farmer Plan</h2>
      <div className="d-flex">
        {/* Sidebar */}
        <div
          className="sidebar p-3 border-end bg-light"
          style={{ width: 250, minHeight: "100vh", position: "sticky", top: 0 }}
        >
          <h5>Added Crops</h5>
          <ul
            className="list-group"
            style={{ maxHeight: "80vh", overflowY: "auto" }}
          >
            {crops.map((crop, index) => {
              // Support all possible ID property names
              const cropId =
                crop.id ??
                crop.cropId ??
                crop.Id ??
                crop.CropId ??
                `local-${index}`;
              return (
                <li
                  key={cropId}
                  className="list-group-item d-flex justify-content-between align-items-center"
                  style={{ wordBreak: "break-word" }}
                >
                  <span
                    style={{
                      maxWidth: 120,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "inline-block",
                    }}
                  >
                    {crop.cropName ||
                      crop.name ||
                      crop.CropName ||
                      crop.Name ||
                      "Unnamed Crop"}
                  </span>
                  <div className="d-flex flex-column gap-1">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={(e) =>
                        handleOpenUpdateDialog(
                          String(
                            crop.id ?? crop.cropId ?? crop.Id ?? crop.CropId
                          ),
                          e
                        )
                      }
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={(e) =>
                        handleOpenDeleteDialog(
                          String(
                            crop.id ?? crop.cropId ?? crop.Id ?? crop.CropId
                          ),
                          e
                        )
                      }
                    >
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
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
        </div>
        {/* Main Content */}
        <div className="container mt-2 flex-grow-1">
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

            <label className="fw-bold mt-2">Description:</label>
            <input
              type="text"
              className="form-control w-50"
              placeholder="Enter Description"
              value={description || ""}
              onChange={(e) => setDescription(e.target.value)}
            />

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

            <label className="fw-bold mt-2">Start date:</label>
            <input
              type="date"
              className="form-control w-50"
              placeholder="Start Date"
            />

            <label className="fw-bold mt-2">Last start date:</label>
            <input
              type="date"
              className="form-control w-50"
              placeholder="Last Start Date"
            />

            <label className="fw-bold mt-2">Duration for planting:</label>
            <input
              type="number"
              className="form-control w-50"
              placeholder="Duration (Days)"
            />
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

              {/* Estimated and Actual Cost fields for each stage */}
              <div className="d-flex gap-2 mt-2">
                <input
                  type="number"
                  className="form-control w-25"
                  placeholder="Estimated Cost"
                  value={stage.estimatedCost || ""}
                  onChange={(e) =>
                    handleStageChange(index, "estimatedCost", e.target.value)
                  }
                />
                <input
                  type="number"
                  className="form-control w-25"
                  placeholder="Actual Cost"
                  value={stage.actualCost || ""}
                  onChange={(e) =>
                    handleStageChange(index, "actualCost", e.target.value)
                  }
                />
              </div>

              {stage.steps.map((step, stepIndex) => (
                <div key={stepIndex} className="mt-2 border p-2">
                  <input
                    type="text"
                    className="form-control mt-2 w-50"
                    placeholder="Step Name"
                    value={step.stepName || ""}
                    onChange={(e) =>
                      handleStepChange(
                        index,
                        stepIndex,
                        "stepName",
                        e.target.value
                      )
                    }
                  />
                  <input
                    type="text"
                    className="form-control mt-2 w-50"
                    placeholder="Optional Link"
                    value={stage.link}
                    onChange={(e) =>
                      handleStageChange(index, "link", e.target.value)
                    }
                  />

                  {/* Tools and Duration */}
                  <div className="d-flex mt-2">
                    <select
                      className="form-control me-2 w-25"
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

                  {/* Fertilizer, Duration and Cost in one row */}
                  <div className="d-flex mt-2 align-items-center">
                    <select
                      className="form-control me-2 w-25"
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
                      className="form-control w-25 me-2"
                      placeholder="Duration (Days)"
                      value={step.fertilizerDuration}
                      onChange={(e) =>
                        handleStepChange(
                          index,
                          stepIndex,
                          "fertilizerDuration",
                          e.target.value
                        )
                      }
                    />
                    <input
                      type="number"
                      className="form-control w-25"
                      placeholder="Step Cost"
                      value={step.cost}
                      onChange={(e) =>
                        handleStepChange(
                          index,
                          stepIndex,
                          "cost",
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
              <div className="mt-1 fw-bold">
                Total Stage Cost: $
                {Number(stage.cost || 0) +
                  (stage.steps
                    ? stage.steps.reduce(
                        (stepSum, step) => stepSum + Number(step.cost || 0),
                        0
                      )
                    : 0)}
              </div>
            </div>
          ))}
          <button className="btn btn-danger w-50" onClick={addStage}>
            + Add Stage
          </button>
          <div className="mt-3 fw-bold">
            Total Cost For all stages: $
            {stages.reduce(
              (sum, stage) =>
                sum +
                Number(stage.cost || 0) +
                (stage.steps
                  ? stage.steps.reduce(
                      (stepSum, step) => stepSum + Number(step.cost || 0),
                      0
                    )
                  : 0),
              0
            )}
          </div>
          {/* Only show the correct button for add or update */}
          {editingCropId ? (
            <button
              className="btn btn-success w-50 mt-3"
              onClick={handleConfirmUpdate}
            >
              Update Crop
            </button>
          ) : (
            <button
              className="btn btn-success w-50 mt-3"
              onClick={handleSubmit}
            >
              Add Crop
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmerPlan;

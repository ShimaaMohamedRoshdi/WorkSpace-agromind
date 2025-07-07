import React, { useState, useEffect } from "react";
import api from "../../services/api";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button as MuiButton,
} from "@mui/material";
import { SettingsInputComponentSharp } from "@mui/icons-material";

const ExpertDashboard = () => {
  // State is almost identical to FarmerPlan, but without land-related state
  const [plan, setCrop] = useState({
    Id: null,
    CropName: "",
    PictureUrl: "",
    CropDescription: "",
    StartDate: "",
    LastStartDate: "",
    Duration: 0,
    Stages: [],
  });

  const [allCrops, setAllCrops] = useState([]); // Will hold the expert's plans
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [cropIdToDelete, setCropIdToDelete] = useState(null);

  // Fetch the expert's created plans (templates)
  const fetchExpertCrops = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
      const headers = { Authorization: `Bearer ${token}` };

      // We still call GetMyPlans, as the backend logic should differentiate
      // and return templates if the logged-in user is an Expert.
      const cropsRes = await api.get("/api/Crop/GetCrops", { headers });
      setAllCrops(cropsRes.data);
    } catch (err) {
      console.error("Error fetching expert Crops:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpertCrops();
  }, []);

  // All form handlers are identical to FarmerPlan
  const handleCropChange = (e) => {
    const { name, value } = e.target;
    setCrop((prev) => ({ ...prev, [name]: value }));
  };
  const handleStageChange = (stageIndex, e) => {
    const { name, value } = e.target;
    const updatedStages = [...plan.Stages];
    updatedStages[stageIndex] = { ...updatedStages[stageIndex], [name]: value };
    setCrop((prev) => ({ ...prev, Stages: updatedStages }));
  };
  const handleStepChange = (stageIndex, stepIndex, e) => {
    const { name, value } = e.target;
    const updatedStages = [...plan.Stages];
    updatedStages[stageIndex].Steps[stepIndex] = {
      ...updatedStages[stageIndex].Steps[stepIndex],
      [name]: value,
    };
    setCrop((prev) => ({ ...prev, Stages: updatedStages }));
  };
  const addStage = () => {
    const newStage = {
      Id: 0,
      StageName: "",
      OptionalLink: "",
      EstimatedCost: 0,
      Steps: [],
    };
    setCrop((prev) => ({ ...prev, Stages: [...prev.Stages, newStage] }));
  };
  const removeStage = (stageIndex) => {
    const updatedStages = plan.Stages.filter(
      (_, index) => index !== stageIndex
    );
    setCrop((prev) => ({ ...prev, Stages: updatedStages }));
  };
  const addStep = (stageIndex) => {
    // New step for an expert does NOT include PlannedStartDate
    const newStep = {
      Id: 0,
      StepName: "",
      Description: "",
      Tool: "",
      ToolImage: "",
      DurationDays: 0,
      Fertilizer: "",
      EstimatedCost: 0,
    };
    const updatedStages = [...plan.Stages];
    updatedStages[stageIndex].Steps.push(newStep);
    setCrop((prev) => ({ ...prev, Stages: updatedStages }));
  };
  const removeStep = (stageIndex, stepIndex) => {
    const updatedStages = [...plan.Stages];
    updatedStages[stageIndex].Steps = updatedStages[stageIndex].Steps.filter(
      (_, index) => index !== stepIndex
    );
    setCrop((prev) => ({ ...prev, Stages: updatedStages }));
  };

  // In ExpertDashboard.jsx

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!plan.Stages || plan.Stages.length === 0) {
      alert("A plan template must have at least one stage.");
      return;
    }

    // This part is correct
    const mappedStages = plan.Stages.map((stage) => ({
      Id: stage.Id || 0,
      StageName: stage.StageName,
      OptionalLink: stage.OptionalLink,
      EstimatedCost: Number(stage.EstimatedCost) || 0,
      Steps: (stage.Steps || []).map((step) => ({
        Id: step.Id || 0,
        StepName: step.StepName,
        Description: step.Description,
        Tool: step.Tool,
        ToolImage: step.ToolImage,
        DurationDays: Number(step.DurationDays) || 0,
        Fertilizer: step.Fertilizer,
        EstimatedCost: Number(step.EstimatedCost) || 0,
      })),
    }));

    // ✅ THIS IS THE FIX ✅
    const payload = {
      Id: plan.Id || 0,
      CropName: plan.CropName,
      PictureUrl: plan.PictureUrl,
      CropDescription: plan.CropDescription,
      StartDate: plan.StartDate
        ? new Date(plan.StartDate).toISOString()
        : new Date().toISOString(),
      LastStartDate: plan.LastStartDate
        ? new Date(plan.LastStartDate).toISOString()
        : new Date().toISOString(),
      Duration: Number(plan.Duration) || 0,
      // Add the mappedStages to the payload object
      Stages: mappedStages,
    };

    console.log(
      "Submitting Expert Template Payload:",
      JSON.stringify(payload, null, 2)
    );

    try {
      const apiCall = isEditing
        ? api.put(`/api/Crop/UpdateCrop/${plan.Id}`, payload)
        : api.post("/api/Crop/AddCrop", payload);
      await apiCall;
      alert(`Crop Template ${isEditing ? "updated" : "added"} successfully!`);
      resetForm();
      fetchExpertCrops();
    } catch (error) {
      console.error(`Error saving Crop template:`, error);
      const errorMsg =
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "An unknown error occurred.";
      alert(`Failed to save crop: ${errorMsg}`);
    }
  };
  const handleEdit = (planToEdit) => {
    setIsEditing(true);
    setCrop({
      Id: planToEdit.Id || planToEdit.id,
      CropName: planToEdit.CropName || planToEdit.cropName || "",
      PictureUrl: planToEdit.PictureUrl || planToEdit.pictureUrl || "",
      CropDescription:
        planToEdit.CropDescription || planToEdit.cropDescription || "",
      StartDate: (planToEdit.StartDate || planToEdit.startDate || "").split(
        "T"
      )[0],
      LastStartDate: (
        planToEdit.LastStartDate ||
        planToEdit.lastStartDate ||
        ""
      ).split("T")[0],
      Duration: planToEdit.Duration || planToEdit.duration || 0,
      Stages: (planToEdit.Stages || planToEdit.stages || []).map((stage) => ({
        ...stage,
        Steps: stage.Steps || stage.steps || [], // No need to format date here
      })),
    });
    window.scrollTo(0, 0);
  };

  const openDeleteModal = (id) => {
    setCropIdToDelete(id);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await api.delete(`/api/Crop/DeleteCrop/${cropIdToDelete}`);
      alert("Plan template deleted successfully.");
      fetchExpertCrops();
    } catch (error) {
      console.error("Error deleting plan:", error);
      alert("Failed to delete plan.");
    } finally {
      setOpenDeleteDialog(false);
      setCropIdToDelete(null);
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setCrop({
      Id: null,
      CropName: "",
      PictureUrl: "",
      CropDescription: "",
      StartDate: "",
      LastStartDate: "",
      Duration: "",
      Stages: [],
    });
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div>
      <div className="d-flex">
        {/* ✅ SIDEBAR SECTION (STYLES NOW IDENTICAL TO FARMERPLAN) ✅ */}
        <div className="col-lg-3 col-md-4 col-12 bg-light p-3 border-end min-vh-100">
          <div className="p-2 h-100">
            <h2 className="fs-3 fw-bolder mb-4 text-success text-center">
              Expert Crops
            </h2>
            {allCrops.length === 0 ? (
              <p className="text-muted">No Crops created yet.</p>
            ) : (
              <ul className="list-unstyled">
                {allCrops
                .filter((plan) => plan.PlanType === "ExpertTemplate") // Add this line to filter the array
                .map((p) => (
                  <li
                    key={p.Id || p.id}
                    className="bg-white p-3 mb-3 rounded d-flex justify-content-between align-items-center shadow-sm"
                  >
                    <div>
                      <div className="fw-semibold text-success">
                        {p.CropName || p.cropName}
                      </div>
                    </div>
                    <div className="d-flex gap-2 justify-content-end">
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => handleEdit(p)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => openDeleteModal(p.Id || p.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        {/* --- END OF SIDEBAR SECTION --- */}
        {/* Main Content */}
        <div className="container mt-2 flex-grow-1">
          <h2 className="mt-4 text-success ">
            {isEditing ? "Edit Crop Template" : "Create a New Crop Template"}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label className="fw-bold">Crop Name:</label>
              <input
                type="text"
                className="form-control w-50"
                name="CropName"
                placeholder="Enter crop name"
                value={plan.CropName}
                onChange={handleCropChange}
                required
              />
              <label className="fw-bold mt-2">Crop Description:</label>
              <input
                type="text"
                className="form-control w-50"
                name="CropDescription"
                placeholder="Enter Description"
                value={plan.CropDescription}
                onChange={handleCropChange}
              />
              <label className="fw-bold mt-2">Crop Image URL:</label>
              <input
                type="text"
                className="form-control w-50"
                name="PictureUrl"
                placeholder="Enter Crop Image URL"
                value={plan.PictureUrl}
                onChange={handleCropChange}
              />
              <label className="fw-bold mt-2">Recommended Start Date:</label>
              <input
                type="date"
                className="form-control w-50"
                name="StartDate"
                value={plan.StartDate}
                onChange={handleCropChange}
                required
              />
              <label className="fw-bold mt-2">
                Recommended Last Start Date:
              </label>
              <input
                type="date"
                className="form-control w-50"
                name="LastStartDate"
                value={plan.LastStartDate}
                onChange={handleCropChange}
                required
              />
              <label className="fw-bold mt-2">Typical Duration (Days):</label>
              <input
                type="number"
                className="form-control w-50"
                name="Duration"
                placeholder="Duration in Days"
                value={plan.Duration}
                onChange={handleCropChange}
              />
            </div>

            <h5 className="fw-bold">Plan Stages</h5>
            {plan.Stages.map((stage, stageIndex) => {
              const calculatedStageCost =
                (Number(stage.EstimatedCost) || 0) +
                (stage.Steps || []).reduce(
                  (sum, step) => sum + (Number(step.EstimatedCost) || 0),
                  0
                );
              return (
                <div key={stageIndex} className="mb-3 border p-2">
                  <h6 className="fw-bold">
                    Stage {stageIndex + 1}
                    <button
                      type="button"
                      className="btn-close float-end"
                      onClick={() => removeStage(stageIndex)}
                    ></button>
                  </h6>
                  <input
                    type="text"
                    className="form-control w-50"
                    placeholder="Stage Name"
                    name="StageName"
                    value={stage.StageName}
                    onChange={(e) => handleStageChange(stageIndex, e)}
                    required
                  />
                  <input
                    type="text"
                    className="form-control mt-2 w-50"
                    placeholder="Optional Link"
                    name="OptionalLink"
                    value={stage.OptionalLink}
                    onChange={(e) => handleStageChange(stageIndex, e)}
                  />
                  <label className="fw-bold mt-2">
                    Stage's Own Estimated Cost
                  </label>
                  <input
                    type="number"
                    className="form-control mt-1 w-50"
                    placeholder="Stage Cost"
                    name="EstimatedCost"
                    value={stage.EstimatedCost || ""}
                    onChange={(e) => handleStageChange(stageIndex, e)}
                  />
                  <div className="mt-1 fw-bold bg-light p-1">
                    Total Estimated Cost for this Stage: $
                    {calculatedStageCost.toFixed(2)}
                  </div>

                  {stage.Steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="mt-2 border p-2">
                      <h6 className="fw-normal">
                        Step {stepIndex + 1}
                        <button
                          type="button"
                          className="btn-close btn-sm float-end"
                          onClick={() => removeStep(stageIndex, stepIndex)}
                        ></button>
                      </h6>
                      <input
                        type="text"
                        className="form-control mt-2 w-50"
                        placeholder="Step Name"
                        name="StepName"
                        value={step.StepName}
                        onChange={(e) =>
                          handleStepChange(stageIndex, stepIndex, e)
                        }
                        required
                      />
                      <input
                        type="text"
                        className="form-control mt-2 w-50"
                        placeholder="Step Description"
                        name="Description"
                        value={step.Description}
                        onChange={(e) =>
                          handleStepChange(stageIndex, stepIndex, e)
                        }
                      />

                      <div className="d-flex mt-2">
                        <input
                          type="text"
                          className="form-control me-2 w-25"
                          placeholder="Tool"
                          name="Tool"
                          value={step.Tool}
                          onChange={(e) =>
                            handleStepChange(stageIndex, stepIndex, e)
                          }
                        />
                        <input
                          type="text"
                          className="form-control w-25"
                          placeholder="Tool Image URL"
                          name="ToolImage"
                          value={step.ToolImage}
                          onChange={(e) =>
                            handleStepChange(stageIndex, stepIndex, e)
                          }
                        />
                      </div>

                      <div className="d-flex mt-2 align-items-center">
                        <input
                          type="text"
                          className="form-control me-2 w-25"
                          placeholder="Fertilizer"
                          name="Fertilizer"
                          value={step.Fertilizer}
                          onChange={(e) =>
                            handleStepChange(stageIndex, stepIndex, e)
                          }
                        />
                        <input
                          type="number"
                          className="form-control me-2 w-25"
                          placeholder="Duration (Days)"
                          name="DurationDays"
                          value={step.DurationDays}
                          onChange={(e) =>
                            handleStepChange(stageIndex, stepIndex, e)
                          }
                        />
                        <input
                          type="number"
                          className="form-control w-25"
                          placeholder="Step Cost"
                          name="EstimatedCost"
                          value={step.EstimatedCost}
                          onChange={(e) =>
                            handleStepChange(stageIndex, stepIndex, e)
                          }
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn btn-secondary mt-2"
                    onClick={() => addStep(stageIndex)}
                  >
                    + Add Step
                  </button>
                </div>
              );
            })}
            <button
              type="button"
              className="btn btn-primary w-50"
              onClick={addStage}
            >
              + Add Stage
            </button>

            <div className="mt-3">
              <button type="submit" className="btn btn-success w-50">
                {isEditing ? "Update Crop" : "Save Crop"}
              </button>
              {isEditing && (
                <button
                  type="button"
                  className="btn btn-secondary ms-2"
                  onClick={resetForm}
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>

        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
        >
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this Crop template?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <MuiButton onClick={() => setOpenDeleteDialog(false)}>
              Cancel
            </MuiButton>
            <MuiButton onClick={handleConfirmDelete} color="error">
              Delete
            </MuiButton>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default ExpertDashboard;

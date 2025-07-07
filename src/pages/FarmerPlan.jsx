import React, { useState, useEffect } from "react";
import api from "../../services/api";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSearchParams } from "react-router-dom"; 
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button as MuiButton,
} from "@mui/material";

const FarmerPlan = () => {

  const [searchParams] = useSearchParams();


  const [plan, setPlan] = useState({
    Id: null, CropName: "", PictureUrl: "", CropDescription: "", StartDate: "",
    LastStartDate: "", Duration: 0, Stages: [],
  });
  const [allPlans, setAllPlans] = useState([]);
  const [myLands, setMyLands] = useState([]);
  const [selectedLandId, setSelectedLandId] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [planIdToDelete, setPlanIdToDelete] = useState(null);
  const [isLandSelectionLocked, setIsLandSelectionLocked] = useState(false);


  const fetchInitialData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) { setLoading(false); return; }
      const headers = { Authorization: `Bearer ${token}` };
      const [plansRes, landsRes] = await Promise.all([
        api.get("/api/Crop/GetMyPlans", { headers }),
        api.get("/api/Land/GetMyLands", { headers })
      ]);
      setAllPlans(plansRes.data);
      setMyLands(landsRes.data);

      const landIdFromUrl = searchParams.get("landId");


      if (landIdFromUrl) {
        // 2. If a landId was passed in the URL, set the dropdown to that value.
        setSelectedLandId(landIdFromUrl);
        setIsLandSelectionLocked(true); 

      } else if (landsRes.data.length > 0) {
        // 3. Otherwise, if no landId was passed, default to the first land in the list.
        setSelectedLandId(landsRes.data[0].Id);
        setIsLandSelectionLocked(false);

      }

      // if (landsRes.data.length > 0 && !isEditing) {
      //   setSelectedLandId(landsRes.data[0].Id);
      // }
    } catch (err) {
      console.error("Error fetching initial data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, [searchParams, isEditing]);

  const handlePlanChange = (e) => {
    const { name, value } = e.target;
    setPlan(prev => ({ ...prev, [name]: value }));
  };

  const handleStageChange = (stageIndex, e) => {
    const { name, value } = e.target;
    const updatedStages = [...plan.Stages];
    updatedStages[stageIndex] = { ...updatedStages[stageIndex], [name]: value };
    setPlan(prev => ({ ...prev, Stages: updatedStages }));
  };

  const handleStepChange = (stageIndex, stepIndex, e) => {
    const { name, value } = e.target;
    const updatedStages = [...plan.Stages];
    updatedStages[stageIndex].Steps[stepIndex] = { ...updatedStages[stageIndex].Steps[stepIndex], [name]: value };
    setPlan(prev => ({ ...prev, Stages: updatedStages }));
  };

  const addStage = () => {
    const newStage = { Id: 0, StageName: "", OptionalLink: "", EstimatedCost: 0, Steps: [] };
    setPlan(prev => ({ ...prev, Stages: [...prev.Stages, newStage] }));
  };

  const removeStage = (stageIndex) => {
    const updatedStages = plan.Stages.filter((_, index) => index !== stageIndex);
    setPlan(prev => ({ ...prev, Stages: updatedStages }));
  };

  const addStep = (stageIndex) => {
    const newStep = { Id: 0, StepName: "", Description: "", Tool: "", ToolImage: "", DurationDays: 0, Fertilizer: "", EstimatedCost: 0, PlannedStartDate: "" };
    const updatedStages = [...plan.Stages];
    updatedStages[stageIndex].Steps.push(newStep);
    setPlan(prev => ({ ...prev, Stages: updatedStages }));
  };

  const removeStep = (stageIndex, stepIndex) => {
    const updatedStages = [...plan.Stages];
    updatedStages[stageIndex].Steps = updatedStages[stageIndex].Steps.filter((_, index) => index !== stepIndex);
    setPlan(prev => ({ ...prev, Stages: updatedStages }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedLandId) {
      alert("Please select a land for this plan."); return;
    }
    if (!plan.Stages || plan.Stages.length === 0) {
      alert("A plan must have at least one stage."); return;
    }

    const mappedStages = plan.Stages.map(stage => {
      return {
        Id: stage.Id || 0,
        StageName: stage.StageName,
        OptionalLink: stage.OptionalLink,
        EstimatedCost: Number(stage.EstimatedCost) || 0,
        Steps: (stage.Steps || []).map(step => ({
          Id: step.Id || 0,
          StepName: step.StepName,
          Description: step.Description,
          Tool: step.Tool,
          ToolImage: step.ToolImage,
          DurationDays: Number(step.DurationDays) || 0,
          Fertilizer: step.Fertilizer,
          EstimatedCost: Number(step.EstimatedCost) || 0,
          PlannedStartDate: step.PlannedStartDate ? new Date(step.PlannedStartDate).toISOString() : null,
        }))
      };
    });

    const payload = {
      Id: plan.Id || 0,
      CropName: plan.CropName,
      PictureUrl: plan.PictureUrl,
      CropDescription: plan.CropDescription,
      StartDate: plan.StartDate ? new Date(plan.StartDate).toISOString() : new Date().toISOString(),
      LastStartDate: plan.LastStartDate ? new Date(plan.LastStartDate).toISOString() : new Date().toISOString(),
      Duration: Number(plan.Duration) || 0,
      PlanType: "FarmerPlan",
      LandId: Number(selectedLandId),
      Stages: mappedStages,
    };

    console.log("Submitting Payload:", JSON.stringify(payload, null, 2));

    try {
      const apiCall = isEditing
        ? api.put(`/api/Crop/UpdateCrop/${plan.Id}`, payload)
        : api.post("/api/Crop/AddCrop", payload);
      await apiCall;
      alert(`Plan ${isEditing ? 'updated' : 'added'} successfully!`);
      resetForm();
      fetchInitialData();
    } catch (error) {
      console.error(`Error ${isEditing ? 'updating' : 'adding'} plan:`, error);
      const errorMsg = error.response?.data?.message || error.response?.data || error.message || "An unknown error occurred.";
      alert(`Failed to save plan: ${errorMsg}`);
    }
  };

  const handleEdit = (planToEdit) => {
    setIsEditing(true);
    setSelectedLandId(planToEdit.LandId || '');
    setPlan({
      Id: planToEdit.Id || planToEdit.id,
      CropName: planToEdit.CropName || planToEdit.cropName || '',
      PictureUrl: planToEdit.PictureUrl || planToEdit.pictureUrl || '',
      CropDescription: planToEdit.CropDescription || planToEdit.cropDescription || '',
      StartDate: (planToEdit.StartDate || planToEdit.startDate || "").split("T")[0],
      LastStartDate: (planToEdit.LastStartDate || planToEdit.lastStartDate || "").split("T")[0],
      Duration: planToEdit.Duration || planToEdit.duration || 0,
      Stages: (planToEdit.Stages || planToEdit.stages || []).map(stage => ({
        ...stage,
        Steps: (stage.Steps || stage.steps || []).map(step => ({
          ...step,
          PlannedStartDate: (step.PlannedStartDate || "").split("T")[0]
        }))
      })),
    });
    window.scrollTo(0, 0);
  };

  const openDeleteModal = (id) => {
    setPlanIdToDelete(id); setOpenDeleteDialog(true);
  };
  const handleConfirmDelete = async () => {
    try {
      await api.delete(`/api/Crop/DeleteCrop/${planIdToDelete}`);
      alert("Plan deleted successfully.");
      fetchInitialData();
    } catch (error) {
      console.error("Error deleting plan:", error);
      alert("Failed to delete plan.");
    } finally {
      setOpenDeleteDialog(false); setPlanIdToDelete(null);
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setPlan({ Id: null, CropName: "", PictureUrl: "", CropDescription: "", StartDate: "", LastStartDate: "", Duration: 0, Stages: [] });
    setSelectedLandId(myLands.length > 0 ? myLands[0].Id : '');
    setIsLandSelectionLocked(false); 

  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div>
      <div className="d-flex row g-0">
        {/* --- SIDEBAR SECTION (STYLES UPDATED FOR FULL HEIGHT AND BUTTON LAYOUT) --- */}
        <div className="col-lg-3 col-md-4 col-12 bg-light p-3 border-end min-vh-100">
          <div className="p-2 h-100">
            <h2 className="fs-3 fw-bolder mb-4 text-success text-center">
              My Plans
            </h2>
            {allPlans.length === 0 ? (
              <p className="text-muted">No plans added yet.</p>
            ) : (
              <ul className="list-unstyled">
                {allPlans.map((p) => (
                  <li
                    key={p.Id || p.id}
                    className="bg-white p-3 mb-3 rounded d-flex justify-content-between align-items-center shadow-sm"
                  >
                    <div>
                      <div className="fw-semibold text-success">{p.CropName || p.cropName}</div>
                    </div>
                    <div className="d-flex gap-2 justify-content-end">
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => handleEdit(p)}
                      >
                        Update Plan
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => openDeleteModal(p.Id || p.id)}
                      >
                        Delete Plan
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        {/* --- END OF SIDEBAR SECTION --- */}

        <div className="container mt-2 flex-grow-1">
        <h2 className=" my-5 text-success">{isEditing ? "Edit Farmer Plan" : "Create a New Farmer Plan"}</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label className="fw-bold">Select Land for this Plan:</label>
              <select className="form-select w-50" value={selectedLandId} onChange={(e) => setSelectedLandId(e.target.value)} required     disabled={isLandSelectionLocked || isEditing}>
                <option value="" disabled>-- Choose a Land --</option>
                {myLands.length > 0 ? myLands.map(land => <option key={land.Id} value={land.Id}>{land.LandName}</option>) : <option disabled>No lands found. Please add a land first.</option>}
              </select>
              <label className="fw-bold mt-2">Crop Name:</label>
              <input type="text" className="form-control w-50" name="CropName" placeholder="Enter crop name" value={plan.CropName} onChange={handlePlanChange} required />
              <label className="fw-bold mt-2">Crop Description:</label>
              <input type="text" className="form-control w-50" name="CropDescription" placeholder="Enter Description" value={plan.CropDescription} onChange={handlePlanChange} />
              <label className="fw-bold mt-2">Crop Image URL:</label>
              <input type="text" className="form-control w-50" name="PictureUrl" placeholder="Enter Crop Image URL" value={plan.PictureUrl} onChange={handlePlanChange} />
              <label className="fw-bold mt-2">Start Date:</label>
              <input type="date" className="form-control w-50" name="StartDate" value={plan.StartDate} onChange={handlePlanChange} required />
              <label className="fw-bold mt-2">Last Start Date:</label>
              <input type="date" className="form-control w-50" name="LastStartDate" value={plan.LastStartDate} onChange={handlePlanChange} required />
              <label className="fw-bold mt-2">Total Duration (Days):</label>
              <input type="number" className="form-control w-50" name="Duration" placeholder="Duration in Days" value={plan.Duration} onChange={handlePlanChange} />
            </div>
            <h5 className="fw-bold">Crop Stages</h5>
            {plan.Stages.map((stage, stageIndex) => {
              const calculatedStageTotalCost = (Number(stage.EstimatedCost) || 0) + (stage.Steps || []).reduce((sum, step) => sum + (Number(step.EstimatedCost) || 0), 0);
              return (
                <div key={stageIndex} className="mb-3 border p-2">
                  <h6 className="fw-bold">Stage {stageIndex + 1}
                    <button type="button" className="btn-close float-end" onClick={() => removeStage(stageIndex)}></button>
                  </h6>
                  <input type="text" className="form-control w-50" placeholder="Stage Name" name="StageName" value={stage.StageName} onChange={(e) => handleStageChange(stageIndex, e)} required />
                  <input type="text" className="form-control mt-2 w-50" placeholder="Optional Link" name="OptionalLink" value={stage.OptionalLink} onChange={(e) => handleStageChange(stageIndex, e)} />
                  <label className="fw-bold mt-2">Stage's Own Estimated Cost</label>
                  <input type="number" className="form-control mt-1 w-50" placeholder="Stage Cost" name="EstimatedCost" value={stage.EstimatedCost || ''} onChange={(e) => handleStageChange(stageIndex, e)} />
                  <div className="mt-1 fw-bold bg-light p-1">Total Estimated Cost for this Stage: ${calculatedStageTotalCost.toFixed(2)}</div>
                  {stage.Steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="mt-2 border p-2">
                      <h6 className="fw-normal">Step {stepIndex + 1}
                        <button type="button" className="btn-close btn-sm float-end" onClick={() => removeStep(stageIndex, stepIndex)}></button>
                      </h6>
                      <input type="text" className="form-control mt-2 w-50" placeholder="Step Name" name="StepName" value={step.StepName} onChange={(e) => handleStepChange(stageIndex, stepIndex, e)} required />
                      <input type="text" className="form-control mt-2 w-50" placeholder="Step Description" name="Description" value={step.Description} onChange={(e) => handleStepChange(stageIndex, stepIndex, e)} />
                      <label className="fw-bold mt-2">Planned Start Date:</label>
                      <input type="date" className="form-control mt-1 w-50" name="PlannedStartDate" value={step.PlannedStartDate} onChange={(e) => handleStepChange(stageIndex, stepIndex, e)} />
                      <div className="d-flex mt-2">
                        <input type="text" className="form-control me-2 w-25" placeholder="Tool" name="Tool" value={step.Tool} onChange={(e) => handleStepChange(stageIndex, stepIndex, e)} />
                        <input type="text" className="form-control w-25" placeholder="Tool Image URL" name="ToolImage" value={step.ToolImage} onChange={(e) => handleStepChange(stageIndex, stepIndex, e)} />
                      </div>
                      <div className="d-flex mt-2 align-items-center">
                        <input type="text" className="form-control me-2 w-25" placeholder="Fertilizer" name="Fertilizer" value={step.Fertilizer} onChange={(e) => handleStepChange(stageIndex, stepIndex, e)} />
                        <input type="number" className="form-control me-2 w-25" placeholder="Duration (Days)" name="DurationDays" value={step.DurationDays} onChange={(e) => handleStepChange(stageIndex, stepIndex, e)} />
                        <input type="number" className="form-control w-25" placeholder="Step Cost" name="EstimatedCost" value={step.EstimatedCost} onChange={(e) => handleStepChange(stageIndex, stepIndex, e)} />
                      </div>
                    </div>
                  ))}
                  <button type="button" className="btn btn-secondary mt-2" onClick={() => addStep(stageIndex)}>+ Add Step</button>
                </div>
              )})}
            <button type="button" className="btn btn-primary w-50" onClick={addStage}>+ Add Stage</button>
            <div className="mt-3">
              <button type="submit" className="btn btn-success w-50">{isEditing ? 'Save Changes' : 'Save Plan'}</button>
              {isEditing && <button type="button" className="btn btn-secondary ms-2" onClick={resetForm}>Cancel Edit</button>}
            </div>
          </form>
        </div>
        <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent><DialogContentText>Are you sure you want to delete this plan?</DialogContentText></DialogContent>
          <DialogActions>
            <MuiButton onClick={() => setOpenDeleteDialog(false)}>Cancel</MuiButton>
            <MuiButton onClick={handleConfirmDelete} color="error">Delete</MuiButton>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default FarmerPlan;

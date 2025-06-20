import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Chip,
} from "@mui/material";
import { getRecommendedCrops, adoptRecommendedCrop, addCrop } from "../api"; // Assuming these are in your api.js
import "./RecommendPlan.css"; // Your custom CSS file

// ForwardRef for Material-UI Alert component
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Joi validation schema for the form
const schema = Joi.object({
  startDate: Joi.date().required().label("Start Date"),
  endDate: Joi.date().min(Joi.ref("startDate")).required().label("End Date"),
  budget: Joi.number().positive().required().label("Budget"),
});

const RecommendPlan = () => {
  const navigate = useNavigate();

  // State for the form inputs
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    budget: "",
  });
  const [errors, setErrors] = useState({});

  // State for API results and loading status
  const [recommendedPlans, setRecommendedPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  // State for plan selection logic
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedPlanId, setSelectedPlanId] = useState(null);

  // State for UI feedback (Snackbar and Dialog)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const [openStageModal, setOpenStageModal] = useState(false);
  const [currentStages, setCurrentStages] = useState([]);

  // Handler for form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handler for submitting the recommendation form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = schema.validate(formData, { abortEarly: false });
    if (error) {
      const validationErrors = {};
      error.details.forEach((err) => {
        validationErrors[err.path[0]] = err.message;
      });
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    setRecommendedPlans([]);
    setSelectedPlan(null); // Clear selection on new search
    setSelectedPlanId(null);

    try {
      const payload = {
        fromDate: formData.startDate,
        toDate: formData.endDate,
        budget: parseFloat(formData.budget),
      };
      const response = await getRecommendedCrops(payload);
      setRecommendedPlans(response);
      setSnackbar({
        open: true,
        message: `Found ${response.length} recommended plans.`,
        severity: "success",
      });
    } catch (err) {
      const message =
        err.response?.data?.Message ||
        "No suitable plans found. Try different criteria.";
      setSnackbar({ open: true, message, severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Handler for the "Adopt this Plan" button
  // const handleAdoptPlan = async (planId, event) => {
  //   event.stopPropagation(); // Prevent the card's onClick from firing
  //   try {

  //     await adoptRecommendedCrop(planId);
  //     setSnackbar({ open: true, message: "Plan successfully adopted! You can now view it in 'My Plans'.", severity: "success" });
  //   } catch (error) {
  //     const errorMsg = error.response?.data || error.message;
  //     setSnackbar({ open: true, message: `Failed to adopt plan: ${errorMsg}`, severity: "error" });
  //   }
  // };

  const handleAdoptPlan = async (planToAdopt, event) => {
    event.stopPropagation();

    if (!planToAdopt) {
      alert("Error: No plan selected to adopt.");
      return;
    }

    // 1. Get the landId directly from localStorage
    const landId = localStorage.getItem("landId");

    // 2. Check if a landId exists. This is a critical validation step.
    if (!landId) {
      alert(
        "No land selected. Please go to 'My Lands' and select a land to work on first."
      );
      // Optionally, navigate the user to the lands page
      // navigate('/add-land');
      return;
    }

    // 3. Create the payload based on the selected plan, resetting IDs
    const payload = {
      Id: 0,
      CropName: planToAdopt.CropName,
      PictureUrl: planToAdopt.PictureUrl,
      CropDescription: planToAdopt.CropDescription,
      StartDate: planToAdopt.StartDate,
      LastStartDate: planToAdopt.LastStartDate,
      Duration: planToAdopt.Duration,
      PlanType: "FarmerPlan",
      LandId: Number(landId), // Use the ID from localStorage
      Stages: (planToAdopt.Stages || []).map((stage) => ({
        Id: 0,
        StageName: stage.StageName,
        OptionalLink: stage.OptionalLink,
        EstimatedCost: stage.EstimatedCost,
        Steps: (stage.Steps || []).map((step) => ({
          Id: 0,
          StepName: step.StepName,
          Description: step.Description,
          Tool: step.Tool,
          ToolImage: step.ToolImage,
          DurationDays: step.DurationDays,
          Fertilizer: step.Fertilizer,
          EstimatedCost: step.EstimatedCost,
          PlannedStartDate: null,
        })),
      })),
    };

    console.log("Adopting plan by creating new crop with payload:", payload);

    try {
      // 4. Call the generic addCrop API endpoint
      await addCrop(payload);
      setSnackbar({
        open: true,
        message:
          "Plan successfully adopted! You can now view it in 'My Plans'.",
        severity: "success",
      });
    } catch (error) {
      const errorMsg = error.response?.data || error.message;
      setSnackbar({
        open: true,
        message: `Failed to adopt plan: ${errorMsg}`,
        severity: "error",
      });
    }
  };

  // Handler for the "Show Stages" button
  const handleShowStages = (stages, event) => {
    event.stopPropagation(); // Prevent the card's onClick from firing
    setCurrentStages(stages || []);
    setOpenStageModal(true);
  };

  // Handler for clicking on a plan card to select it
  const handlePlanClick = (plan) => {
    setSelectedPlan(plan);
    setSelectedPlanId(plan.Id);
  };

  // Handler for the "Confirm Plan Selection" button
  const handleConfirmPlan = () => {
    if (selectedPlan) {
      // Navigate to the progress page with the necessary data
      navigate(`/ViewMyPlans`);
    } else {
      alert("Please adopt a plan first.");
    }
  };

  // Handler to close the snackbar
  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  return (
    <div>
      <div
        className="container mt-5 p-4 border rounded"
        style={{ maxWidth: "600px" }}
      >
        <h2 className="text-center mb-4 text-success">Recommend Plan</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="startDate" className="form-label">
              Plan Start Date:
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className={`form-control ${errors.startDate ? "is-invalid" : ""}`}
            />
            {errors.startDate && (
              <div className="invalid-feedback">{errors.startDate}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="endDate" className="form-label">
              Plan End Date:
            </label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className={`form-control ${errors.endDate ? "is-invalid" : ""}`}
            />
            {errors.endDate && (
              <div className="invalid-feedback">{errors.endDate}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="budget" className="form-label">
              Budget:
            </label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className={`form-control ${errors.budget ? "is-invalid" : ""}`}
              placeholder="Enter your budget"
              min="0"
              step="any" // TODO: needed?
            />
            {errors.budget && (
              <div className="invalid-feedback">{errors.budget}</div>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-success w-100"
            disabled={loading}
          >
            {loading ? "Searching..." : "Get Recommendation"}
          </button>
        </form>
      </div>

      <div className="m-5">
        {recommendedPlans.length > 0 && (
          <div className="mt-4">
            <h4 className="text-success text-center m-5 fs-2 fw-bolder">
              Recommended Plans:
            </h4>
            <div className="d-flex flex-wrap justify-content-center gap-4">
              {recommendedPlans
                .filter((plan) => plan.PlanType === "ExpertTemplate") // Add this line to filter the array
                .map((plan, index) => (
                  <div
                    key={index}
                    className="plan-box mb-4 p-4 shadow-lg rounded"
                    style={{
                      width: "calc(33.33% - 16px)",
                      cursor: "pointer",
                      backgroundColor:
                        selectedPlanId === plan.Id ? "#d4edda" : "white",
                    }}
                    onClick={() => handlePlanClick(plan)}
                  >
                    <div className="d-flex justify-content-between align-items-start">
                      <h5 className="text-success fw-bolder fs-4 mb-3">
                        {plan.CropName}
                      </h5>
                      <Chip
                        label={plan.PlanType}
                        size="small"
                        variant="outlined"
                        color={
                          plan.PlanType === "ExpertTemplate"
                            ? "info"
                            : "secondary"
                        }
                      />
                    </div>
                    <p>
                      <strong>Description:</strong> {plan.CropDescription}
                    </p>
                    <p>
                      <strong>Total Cost:</strong> $
                      {Number(plan.TotalEstimatedCost || 0).toFixed(2)}
                    </p>
                    <div className="d-flex justify-content-between mt-3">
                      <button
                        className="btn btn-outline-success"
                        onClick={(e) => handleShowStages(plan.Stages, e)}
                      >
                        Show Stages
                      </button>
                      <button
                        className="btn btn-success"
                        onClick={(e) => handleAdoptPlan(plan, e)}
                      >
                        Adopt this Plan
                      </button>
                    </div>
                  </div>
                ))}
            </div>
            {selectedPlanId && (
              <div className="text-center">
                <button
                  className="btn btn-success w-25 mt-4 p-4 fs-5"
                  onClick={handleConfirmPlan}
                >
                  View My Plans
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>

      <Dialog
        open={openStageModal}
        onClose={() => setOpenStageModal(false)}
        maxWidth="md"
        fullWidth
        // TODO: needed?
        // scroll="body" // Allow dialog to scroll if content overflows, not the page
        // disableEnforceFocus // Optional: if you need tooltips etc. to still work
        // disableEscapeKeyDown={false} // Esc key can close it (optional)
      >
        {" "}
        <DialogTitle
          sx={{ fontWeight: "bold", fontSize: "1.5rem", color: "#2e7d32" }}
        >
          Crop Stages
        </DialogTitle>
        <DialogContent dividers sx={{ backgroundColor: "#f9f9f9" }}>
          {currentStages.length === 0 ? (
            <p>No stages available.</p>
          ) : (
            currentStages.map((stage, idx) => (
              <div
                key={idx}
                className="mb-4 p-3 border rounded shadow-sm bg-white"
              >
                <h5 className="text-success">{stage.StageName}</h5>
                <p>
                  <strong>Estimated Cost:</strong> $
                  {Number(stage.EstimatedCost || 0).toFixed(2)}
                </p>
                {stage.OptionalLink && (
                  <p>
                    <strong>More Info:</strong>{" "}
                    <a
                      href={stage.OptionalLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Click here
                    </a>
                  </p>
                )}
                <h6 className="mt-3">Steps:</h6>
                <ul className="list-unstyled mt-2">
                  {(stage.Steps || []).length > 0 ? (
                    (stage.Steps || []).map((step, stepIdx) => (
                      <li key={stepIdx} className="mb-2 border-bottom pb-2">
                        <strong>{step.StepName}</strong>: {step.Description}
                        <div className="ps-3">
                          <small>
                            <em>Tool:</em> {step.Tool}
                          </small>
                          <br />
                          <small>
                            <em>Duration (Days):</em> {step.DurationDays}
                          </small>
                          <br />
                          <small>
                            <em>Fertilizer:</em> {step.Fertilizer}
                          </small>
                          <br />
                          <small>
                            <em>Cost:</em> $
                            {Number(step.EstimatedCost || 0).toFixed(2)}
                          </small>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li>No steps available for this stage.</li>
                  )}
                </ul>
              </div>
            ))
          )}
        </DialogContent>
        <DialogActions sx={{ backgroundColor: "#f9f9f9" }}>
          <Button
            onClick={() => setOpenStageModal(false)}
            variant="contained"
            color="success"
            sx={{ fontWeight: "bold" }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RecommendPlan;

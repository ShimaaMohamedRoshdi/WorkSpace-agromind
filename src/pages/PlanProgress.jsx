import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Progress } from "../components/Progress "; // Your progress bar component
import "bootstrap-icons/font/bootstrap-icons.css";
import ShopButton from "../components/ShopButton";
import {
  TextField,
  Button,
  Box,
  CircularProgress,
  Typography,
  Snackbar,
  Alert as MuiAlert,
  Paper,
  Divider,
  Grid,
} from "@mui/material";
import { getPlanInfo, updatePlanActuals } from "../api";

// Helper function to format dates for the date input fields
const formatDateForInput = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toISOString().split("T")[0];
};

const PlanProgress = () => {
  const { planId } = useParams();
  const navigate = useNavigate();

  // State for the plan data itself
  const [plan, setPlan] = useState(null);

  // State for UI and loading
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // State for the checklist of completed stages
  const [completedStagesIndices, setCompletedStagesIndices] = useState(() => {
    if (!planId) return [];
    try {
      const savedProgress = localStorage.getItem(`progress_${planId}`);
      return savedProgress ? JSON.parse(savedProgress) : [];
    } catch {
      return [];
    }
  });

  // Fetch plan details when the component mounts or planId changes
  useEffect(() => {
    if (!planId) {
      setError("No Plan ID specified in the URL.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    getPlanInfo(planId)
      .then((data) => {
        setPlan(data.Crop); // We store the main Crop object in our state
      })
      .catch((err) => {
        console.error("Failed to fetch plan details:", err);
        setError(
          "Could not load plan details. The plan may not exist or an error occurred."
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [planId]);

  // Save the checklist progress to localStorage whenever it changes
  useEffect(() => {
    if (planId) {
      localStorage.setItem(
        `progress_${planId}`,
        JSON.stringify(completedStagesIndices)
      );
    }
  }, [completedStagesIndices, planId]);

  // Handler for updating Actual Cost/Date in the component's state
  const handleActualsChange = (stageIndex, stepIndex, field, value) => {
    // Create a deep copy to avoid direct state mutation
    const newPlan = JSON.parse(JSON.stringify(plan));
    const step = newPlan.Stages[stageIndex].Steps[stepIndex];

    if (field === "ActualCost") {
      step.ActualCost = parseFloat(value) || 0;
    } else if (field === "ActualStartDate") {
      step.ActualStartDate = value ? new Date(value).toISOString() : null;
    }
    setPlan(newPlan);
  };

  // Handler for the main "Save Progress" button
  const handleSaveChanges = async () => {
    if (!plan) return;

    // The backend expects the entire plan DTO for an update
    const payload = JSON.parse(JSON.stringify(plan));

    try {
      await updatePlanActuals(plan.Id, payload);
      setSnackbar({
        open: true,
        message: "Progress saved successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Failed to save progress:", error);
      setSnackbar({
        open: true,
        message: `Error saving progress: ${error.message}`,
        severity: "error",
      });
    }
  };

  // Handlers for the stage completion checklist
  const handleStageComplete = (index) => {
    if (!completedStagesIndices.includes(index)) {
      setCompletedStagesIndices((prev) =>
        [...prev, index].sort((a, b) => a - b)
      );
    }
  };
  const handleStageUndo = (index) => {
    setCompletedStagesIndices((prev) => prev.filter((i) => i !== index));
  };

  // --- RENDER LOGIC ---

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          flexDirection: "column",
        }}
      >
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading Plan Details...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <Typography color="error" variant="h5">
          {error}
        </Typography>
        <Button variant="contained" onClick={() => navigate(-1)} sx={{ mt: 2 }}>
          Go Back
        </Button>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="container py-5 text-center">
        Plan data could not be loaded.
      </div>
    );
  }

  const stages = plan.Stages || [];
  const currentProgressCount = completedStagesIndices.length;

  return (
    <div className="container py-5">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
        flexWrap="wrap"
        gap={2}
      >
        <Button
          variant="outlined"
          onClick={() => navigate("/ViewMyPlans")}
          startIcon={<i className="bi bi-arrow-left"></i>}
        >
          Back to My Plans
        </Button>
        <Typography
          variant="h4"
          className="text-success fw-bold text-center flex-grow-1"
        >
          {plan.CropName} Progress
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveChanges}
          startIcon={<i className="bi bi-save"></i>}
        >
          Save All Progress
        </Button>
      </Box>

      {stages.length > 0 && (
        <Progress stages={stages} currentProgress={currentProgressCount} />
      )}

      <div className="mt-5">
        {stages.map((stage, idx) => {
          const isCompleted = completedStagesIndices.includes(idx);
          const canMarkAsDone =
            idx === 0 || completedStagesIndices.includes(idx - 1);

          return (
            <Paper elevation={3} className="mb-4" key={stage.Id || idx}>
              <Box
                className={`p-3 d-flex justify-content-between align-items-center ${
                  isCompleted ? "bg-success text-white" : "bg-light"
                }`}
              >
                <Typography variant="h5">
                  <span
                    className={`badge me-3 p-2 ${
                      isCompleted ? "bg-light text-success" : "bg-secondary"
                    }`}
                  >
                    Stage {idx + 1}
                  </span>
                  {stage.StageName}
                </Typography>
                {isCompleted && (
                  <i className="bi bi-check-circle-fill fs-4"></i>
                )}
              </Box>

              <Box p={3}>
                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Typography variant="body1">
                    <strong>Stage Estimated Cost:</strong> $
                    {Number(stage.EstimatedCost || 0).toFixed(2)}
                  </Typography>
                  {/* You can add stage-level actuals here if needed */}
                </Box>
                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" color="text.secondary" mb={2}>
                  Steps
                </Typography>
                <Grid container spacing={3}>
                  {(stage.Steps || []).map((step, stepIdx) => (
                    <Grid item xs={12} md={6} key={step.Id || stepIdx}>
                      <Paper variant="outlined" sx={{ p: 2, height: "100%" }}>
                        <Typography fontWeight="bold">
                          {step.StepName}

                          <Typography
                            variant="body2"
                            color="text.secondary"
                            mb={2}
                          >
                            Step Duration:  
                            {step.DurationDays || 0} day
                          </Typography>
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          mb={2}
                        >
                          Est. Cost: $
                          {Number(step.EstimatedCost || 0).toFixed(2)}
                        </Typography>
                        <TextField
                          label="Actual Cost"
                          type="number"
                          fullWidth
                          size="small"
                          value={step.ActualCost || ""}
                          onChange={(e) =>
                            handleActualsChange(
                              idx,
                              stepIdx,
                              "ActualCost",
                              e.target.value
                            )
                          }
                          sx={{ mb: 2 }}
                        />
                        <TextField
                          label="Actual Start Date"
                          type="date"
                          fullWidth
                          size="small"
                          value={formatDateForInput(step.ActualStartDate)}
                          onChange={(e) =>
                            handleActualsChange(
                              idx,
                              stepIdx,
                              "ActualStartDate",
                              e.target.value
                            )
                          }
                          InputLabelProps={{ shrink: true }}
                        />
                      </Paper>
                    </Grid>
                  ))}
                </Grid>

                <Box
                  mt={3}
                  display="flex"
                  justifyContent="end"
                  alignItems="center"
                >
                  {isCompleted ? (
                    <Button
                      variant="outlined"
                      color="warning"
                      onClick={() => handleStageUndo(idx)}
                      startIcon={
                        <i className="bi bi-arrow-counterclockwise"></i>
                      }
                    >
                      Mark as Not Done
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="success"
                      size="large"
                      onClick={() => handleStageComplete(idx)}
                      disabled={!canMarkAsDone}
                    >
                      <i className="bi bi-check-circle me-2"></i>Mark Stage as
                      Done
                    </Button>
                  )}
                </Box>
                {!isCompleted && !canMarkAsDone && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: "block", textAlign: "end", mt: 1 }}
                  >
                    Complete the previous stage to enable.
                  </Typography>
                )}
              </Box>
            </Paper>
          );
        })}
      </div>

      {stages.length > 0 && currentProgressCount === stages.length && (
        <div
          className="alert alert-success text-center mt-5 p-4 shadow"
          role="alert"
        >
          <h4 className="alert-heading">
            <i className="bi bi-trophy-fill me-2"></i>Congratulations!
          </h4>
          <p>You have completed all stages for {plan.CropName}.</p>
        </div>
      )}

      {/* ✅ ADDED: A fixed container for the flying shop button */}
      <div
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          zIndex: 1000, // Make sure it's on top of other content
        }}
      >
        <ShopButton />
      </div>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <MuiAlert
          severity={snackbar.severity}
          sx={{ width: "100%" }}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default PlanProgress;

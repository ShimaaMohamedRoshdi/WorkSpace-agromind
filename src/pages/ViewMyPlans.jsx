import React, { useEffect, useState } from "react";
import api from "../../services/api";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Box,
  Grid,
  Paper,
  Divider,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ViewMyPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [stepUpdates, setStepUpdates] = useState({}); // { planId: { stageIdx: { stepIdx: { actualCost, actualDate } } } }

  useEffect(() => {
    api
      .get("/api/Crop/GetCrops")
      .then((res) => {
        setPlans(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch plans");
        setLoading(false);
      });
  }, []);

  const handleExpand = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleStepUpdate = (planId, stageIdx, stepIdx, field, value) => {
    setStepUpdates((prev) => ({
      ...prev,
      [planId]: {
        ...(prev[planId] || {}),
        [stageIdx]: {
          ...((prev[planId] || {})[stageIdx] || {}),
          [stepIdx]: {
            ...(((prev[planId] || {})[stageIdx] || {})[stepIdx] || {}),
            [field]: value,
          },
        },
      },
    }));
  };

  const handleCancel = (planId) => {
    setStepUpdates((prev) => {
      const newUpdates = { ...prev };
      delete newUpdates[planId];
      return newUpdates;
    });
    setPlans((prev) =>
      prev.filter((plan) => (plan.id || plan.Id || plan.CropId) !== planId)
    );
    setExpanded(false); // Collapse the expanded plan when cancel is clicked
  };

  const handleApplyPlan = async (planId) => {
    try {
      const updates = stepUpdates[planId];
      if (!updates) return;

      const payload = [];

      Object.entries(updates).forEach(([stageIdx, steps]) => {
        Object.entries(steps).forEach(([stepIdx, stepData]) => {
          payload.push({
            planId,
            stageIdx: Number(stageIdx),
            stepIdx: Number(stepIdx),
            actualCost: parseFloat(stepData.actualCost) || 0,
            actualDate: stepData.actualDate || null,
          });
        });
      });

      // POST to backend (adjust endpoint as needed)
      //will take it from sara

      
      await api.post("/api/Crop/SaveActuals", payload);

      alert("Plan updated successfully!");
    } catch (error) {
      console.error("Failed to apply plan:", error);
      alert("Failed to apply plan. Please try again.");
    }
  };

  if (loading) return <div>Loading plans...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        My Crop Plans
      </Typography>
      {plans.length === 0 && (
        <Typography align="center" color="text.secondary">
          No plans found.
        </Typography>
      )}
      {plans.map((plan) => {
        const stages = plan.stages || plan.Stages || [];
        const planId = plan.id || plan.Id || plan.CropId;

        let totalEstimated = 0;
        let totalActual = 0;
        stages.forEach((stage, stageIdx) => {
          const steps = stage.steps || stage.Steps || [];
          let stageEst = 0;
          let stageAct = 0;
          steps.forEach((step, stepIdx) => {
            const est = Number(step.cost || step.Cost || 0);
            stageEst += est;
            const act = Number(
              stepUpdates[planId]?.[stageIdx]?.[stepIdx]?.actualCost || 0
            );
            stageAct += act;
          });
          totalEstimated += stageEst;
          totalActual += stageAct;
        });

        return (
          <Accordion
            key={planId}
            expanded={expanded === planId}
            onChange={handleExpand(planId)}
            sx={{ mb: 2 }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ flex: 1, fontWeight: 600 }}>
                {plan.cropName || plan.CropName || "Unnamed Plan"}
              </Typography>
              <Typography color="text.secondary">
                Est. Total: ${totalEstimated.toFixed(2)} | Actual: $
                {totalActual > 0 ? totalActual.toFixed(2) : "-"}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {stages.length === 0 ? (
                <Typography color="text.secondary">No stages.</Typography>
              ) : (
                stages.map((stage, stageIdx) => {
                  const steps = stage.steps || stage.Steps || [];
                  let stageEst = 0;
                  let stageAct = 0;
                  steps.forEach((step, stepIdx) => {
                    const est = Number(step.cost || step.Cost || 0);
                    stageEst += est;
                    const act = Number(
                      stepUpdates[planId]?.[stageIdx]?.[stepIdx]?.actualCost ||
                        0
                    );
                    stageAct += act;
                  });
                  return (
                    <Paper key={stageIdx} sx={{ p: 2, mb: 2 }} elevation={2}>
                      <Typography variant="h6" gutterBottom>
                        Stage {stageIdx + 1}:{" "}
                        {stage.stageName || stage.StageName || "Unnamed Stage"}
                      </Typography>
                      <Typography color="text.secondary" sx={{ mb: 1 }}>
                        Est. Stage Cost: ${stageEst.toFixed(2)} | Actual: $
                        {stageAct > 0 ? stageAct.toFixed(2) : "-"}
                      </Typography>
                      <Divider sx={{ mb: 2 }} />
                      {steps.length === 0 ? (
                        <Typography color="text.secondary">
                          No steps.
                        </Typography>
                      ) : (
                        <Grid container spacing={2}>
                          {steps.map((step, stepIdx) => {
                            const est = Number(step.cost || step.Cost || 0);
                            const update =
                              stepUpdates[planId]?.[stageIdx]?.[stepIdx] || {};
                            return (
                              <Grid item xs={12} md={6} key={stepIdx}>
                                <Paper sx={{ p: 2, mb: 2 }}>
                                  <Typography fontWeight={600}>
                                    Step {stepIdx + 1}:{" "}
                                    {step.stepName ||
                                      step.StepName ||
                                      "Unnamed Step"}
                                  </Typography>
                                  <Typography color="text.secondary">
                                    Est. Cost: ${est.toFixed(2)}
                                  </Typography>
                                  <TextField
                                    label="Actual Cost"
                                    type="number"
                                    size="small"
                                    value={update.actualCost || ""}
                                    onChange={(e) =>
                                      handleStepUpdate(
                                        planId,
                                        stageIdx,
                                        stepIdx,
                                        "actualCost",
                                        e.target.value
                                      )
                                    }
                                    sx={{ mt: 1, mr: 2, width: 120 }}
                                  />
                                  <TextField
                                    label="Actual Completion Date"
                                    type="date"
                                    size="small"
                                    value={update.actualDate || ""}
                                    onChange={(e) =>
                                      handleStepUpdate(
                                        planId,
                                        stageIdx,
                                        stepIdx,
                                        "actualDate",
                                        e.target.value
                                      )
                                    }
                                    sx={{ mt: 1, width: 180 }}
                                    InputLabelProps={{ shrink: true }}
                                  />
                                </Paper>
                              </Grid>
                            );
                          })}
                        </Grid>
                      )}
                    </Paper>
                  );
                })
              )}
              <Divider sx={{ my: 2 }} />
              <Typography fontWeight={600}>
                Plan Total Estimated Cost: ${totalEstimated.toFixed(2)}
              </Typography>
              <Typography fontWeight={600}>
                Plan Total Actual Cost:{" "}
                {totalActual > 0 ? `$${totalActual.toFixed(2)}` : "-"}
              </Typography>
              <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleCancel(planId)}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleApplyPlan(planId)}
                >
                  Apply Plan
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
};

export default ViewMyPlans;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Grid,
  Paper,
  Divider,
  Button,
  CircularProgress,
  Chip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getMyPlans, getPlanInfo } from "../api";

const ViewMyPlans = () => {
  const navigate = useNavigate(); // Initialize for navigation
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedPlanId, setExpandedPlanId] = useState(null);

  useEffect(() => {
    getMyPlans()
      .then((data) => {
        const initialPlans = (data || []).map(plan => ({
          ...plan,
          details: null,
          isLoadingDetails: false,
          error: null,
        }));
        setPlans(initialPlans);
      })
      .catch((err) => {
        console.error("Failed to fetch plans:", err);
        setError("Failed to fetch plans. Please try logging in again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleExpand = (planId) => (event, isExpanded) => {
    const newExpandedId = isExpanded ? planId : null;
    setExpandedPlanId(newExpandedId);

    if (isExpanded) {
      const planIndex = plans.findIndex(p => (p.Id || p.id) === planId);
      if (planIndex !== -1 && !plans[planIndex].details && !plans[planIndex].isLoadingDetails) {
        setPlans(prev => prev.map(p => (p.Id || p.id) === planId ? { ...p, isLoadingDetails: true } : p));
        
        getPlanInfo(planId)
          .then(details => {
            setPlans(prev => prev.map(p => (p.Id || p.id) === planId ? { ...p, details, isLoadingDetails: false } : p));
          })
          .catch(err => {
            console.error(`Failed to fetch details for plan ${planId}:`, err);
            setPlans(prev => prev.map(p => (p.Id || p.id) === planId ? { ...p, isLoadingDetails: false, error: "Could not load details." } : p));
          });
      }
    }
  };

  // ✅ ADDED: Navigate to the PlanProgress page
  const handleTrackProgress = (planId) => {
    navigate(`/plan-progress/${planId}`);
  };

  if (loading) return <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}><CircularProgress /></Box>;
  if (error) return <Typography color="error" align="center" sx={{ mt: 4 }}>{error}</Typography>;

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4, p: { xs: 1, sm: 2 } }}>
      <Typography variant="h4" align="center" gutterBottom className="text-success">
        My Plans
      </Typography>
      {plans.length === 0 ? (
        <Typography align="center" color="text.secondary">You don't have any plans yet.</Typography>
      ) : (
        plans.map((plan) => {
          const planId = plan.Id || plan.id;
          const planDetails = plan.details;

          return (
            <Accordion key={planId} expanded={expandedPlanId === planId} onChange={handleExpand(planId)} sx={{ mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  <Typography sx={{ fontWeight: "bold" }}>{plan.CropName || "Unnamed Plan"}</Typography>
                  {planDetails && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" color="text.secondary">{planDetails.CreatorEmail}</Typography>
                      <Chip label={planDetails.CreatorRole} size="small" color="primary" variant="outlined" />
                    </Box>
                  )}
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ backgroundColor: "#f9f9f9" }}>
                {plan.isLoadingDetails && <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}><CircularProgress /></Box>}
                {plan.error && <Typography color="error">{plan.error}</Typography>}
                {planDetails && (
                  <>
                    {(planDetails.Crop.Stages || []).map((stage, stageIdx) => (
                      <Paper key={stage.Id || stageIdx} sx={{ p: 2, mb: 2 }} elevation={2}>
                        <Typography variant="h6">{stage.StageName}</Typography>
                        <Divider sx={{ my: 1 }} />
                        <Grid container spacing={2}>
                          {(stage.Steps || []).map((step, stepIdx) => (
                            <Grid item xs={12} md={6} key={step.Id || stepIdx}>
                              <Paper variant="outlined" sx={{ p: 2, height: "100%" }}>
                                <Typography fontWeight="medium">{step.StepName}</Typography>
                                <Typography color="text.secondary" variant="body2">
                                  Est. Cost: ${Number(step.EstimatedCost || 0).toFixed(2)}
                                </Typography>
                                {/* ✅ REMOVED: Inputs for actuals are gone */}
                              </Paper>
                            </Grid>
                          ))}
                        </Grid>
                      </Paper>
                    ))}
                    {/* ✅ CHANGED: "Save Changes" is now "Track Progress" */}
                    <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
                      <Button variant="contained" color="success" onClick={() => handleTrackProgress(planId)}>
                        Track or Update Progress
                      </Button>
                    </Box>
                  </>
                )}
              </AccordionDetails>
            </Accordion>
          );
        })
      )}
    </Box>
  );
};

export default ViewMyPlans;

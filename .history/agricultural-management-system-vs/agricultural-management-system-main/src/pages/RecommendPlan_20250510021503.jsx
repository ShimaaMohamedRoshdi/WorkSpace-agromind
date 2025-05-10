import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const mockPlans = [
  {
    id: 1,
    planName: "Plan A",
    description: "A cost-effective plan suitable for short-term planting.",
    startDate: "2023-01-01",
    endDate: "2023-06-30",
    budget: 1000,
  },
  {
    id: 2,
    planName: "Plan B",
    description: "A premium plan for long-term planting with high yield.",
    startDate: "2023-03-01",
    endDate: "2023-12-31",
    budget: 5000,
  },
  {
    id: 3,
    planName: "Plan C",
    description: "A balanced plan for medium-term planting and moderate budget.",
    startDate: "2023-02-15",
    endDate: "2023-09-30",
    budget: 3000,
  },
];

const RecommendPlan = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [budget, setBudget] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [recommendedPlans, setRecommendedPlans] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!startDate || !endDate || !budget) {
      setRecommendedPlans([]);
      setSnackbarMessage("Please fill in all fields.");
      setOpenSnackbar(true);
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const budgetNum = parseFloat(budget);

    const filteredPlans = mockPlans.filter((plan) => {
      const planStart = new Date(plan.startDate);
      const planEnd = new Date(plan.endDate);
      const overlapsDateRange = planStart <= end && planEnd >= start;
      const fitsBudget = plan.budget <= budgetNum * 1.1;
      return overlapsDateRange && fitsBudget;
    });

    setRecommendedPlans(filteredPlans);
    setSnackbarMessage(`Found ${filteredPlans.length} recommended plans.`);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div
      className="recommend-plan-container"
      style={{
        maxWidth: "600px",
        margin: "2rem auto",
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        Recommend Plan
      </h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="startDate"
            style={{ display: "block", marginBottom: "0.5rem" }}
          >
            Plan Start Date:
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="endDate"
            style={{ display: "block", marginBottom: "0.5rem" }}
          >
            Plan End Date:
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div style={{ marginBottom: "1.5rem" }}>
          <label
            htmlFor="budget"
            style={{ display: "block", marginBottom: "0.5rem" }}
          >
            Budget:
          </label>
          <input
            type="number"
            id="budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            min="0"
            step="any"
            required
            placeholder="Enter your budget"
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <button
          type="submit"
          className="hero-button"
          style={{ width: "100%", padding: "0.75rem", fontSize: "1rem" }}
        >
          Get Recommendation
        </button>
      </form>

      {recommendedPlans.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Recommended Plans:</h3>
          <ul>
            {recommendedPlans.map((plan) => (
              <li
                key={plan.id}
                style={{ marginBottom: "0.5rem", fontWeight: "bold" }}
              >
                {plan.planName}: {plan.description}
              </li>
            ))}
          </ul>
        </div>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default RecommendPlan;

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

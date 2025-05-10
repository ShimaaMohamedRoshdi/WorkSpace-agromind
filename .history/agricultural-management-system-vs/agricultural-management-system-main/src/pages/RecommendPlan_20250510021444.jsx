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

// import React, { useState } from "react";
// import Joi from "joi";
// import Snackbar from "@mui/material/Snackbar";
// import MuiAlert from "@mui/material/Alert";
// import api from "../../services/api";
// import { useNavigate } from "react-router-dom"; // Import useNavigate for page navigation
// import "./RecommendPlan.css";

// const Alert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

// // Joi schema for validation
// const schema = Joi.object({
//   startDate: Joi.date().required().label("Start Date"),
//   endDate: Joi.date().min(Joi.ref("startDate")).required().label("End Date"),
//   budget: Joi.number().positive().required().label("Budget"),
// });

// const RecommendPlan = () => {
//   const [formData, setFormData] = useState({
//     startDate: "",
//     endDate: "",
//     budget: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [recommendedPlans, setRecommendedPlans] = useState([]);
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [selectedPlanId, setSelectedPlanId] = useState(null); // State for storing selected plan's ID

//   const navigate = useNavigate(); // useNavigate for navigation

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const { error } = schema.validate(formData, { abortEarly: false });
//     if (error) {
//       const validationErrors = {};
//       error.details.forEach((err) => {
//         validationErrors[err.path[0]] = err.message;
//       });
//       setErrors(validationErrors);
//       return;
//     }

//     setErrors({});

//     try {
//       const response = await api.post("/api/Crop/GetRecommendedCrops", {
//         fromDate: formData.startDate,
//         toDate: formData.endDate,
//         budget: parseFloat(formData.budget),
//       });

//       console.log("✅ API Success Response:", response.data);
//       setRecommendedPlans(response.data);
//       setSnackbarMessage(`Found ${response.data.length} recommended plans.`);
//       console.log("recommended plans are : ", recommendedPlans);
//       setOpenSnackbar(true);
//     } catch (err) {
//       // Full error logging
//       if (err.response) {
//         console.error("❌ API Error Response:", err.response.data);
//         const message =
//           err.response.data.Message || "Failed to get recommendations.";
//         const reasons = err.response.data.Reasons || [];

//         setSnackbarMessage(
//           `${message}`
//         );
//       } else {
//         console.error("❌ Network or other error:", err);
//         setSnackbarMessage("Unexpected error occurred.");
//       }

//       setRecommendedPlans([]);
//       setOpenSnackbar(true);
//     }
//   };

//   const handleCloseSnackbar = () => {
//     setOpenSnackbar(false);
//   };

//   // Handle plan click
//   const handlePlanClick = (planId) => {
//     setSelectedPlanId(planId);
//     console.log("Selected Plan ID:", planId);
//     // Optionally, you can display a confirmation message or do something with the ID
//   };

//   // Handle confirm button click to navigate
//   const handleConfirmPlan = () => {
//     if (selectedPlanId) {
//       // Navigate to /planProgress with the selected plan's ID
//       navigate(`/plan-progress/${selectedPlanId}`);
//     } else {
//       alert("Please select a plan first.");
//     }
//   };

//   return (
//     <div>
//       <div
//         className="container mt-5 p-4 border rounded"
//         style={{ maxWidth: "600px" }}
//       >
//         <h2 className="text-center mb-4 text-success">Recommend Plan</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="startDate" className="form-label">
//               Plan Start Date:
//             </label>
//             <input
//               type="date"
//               name="startDate"
//               value={formData.startDate}
//               onChange={handleChange}
//               className={`form-control ${errors.startDate ? "is-invalid" : ""}`}
//             />
//             {errors.startDate && (
//               <div className="invalid-feedback">{errors.startDate}</div>
//             )}
//           </div>

//           <div className="mb-3">
//             <label htmlFor="endDate" className="form-label">
//               Plan End Date:
//             </label>
//             <input
//               type="date"
//               name="endDate"
//               value={formData.endDate}
//               onChange={handleChange}
//               className={`form-control ${errors.endDate ? "is-invalid" : ""}`}
//             />
//             {errors.endDate && (
//               <div className="invalid-feedback">{errors.endDate}</div>
//             )}
//           </div>

//           <div className="mb-4">
//             <label htmlFor="budget" className="form-label">
//               Budget:
//             </label>
//             <input
//               type="number"
//               name="budget"
//               value={formData.budget}
//               onChange={handleChange}
//               className={`form-control ${errors.budget ? "is-invalid" : ""}`}
//               placeholder="Enter your budget"
//               min="0"
//               step="any"
//             />
//             {errors.budget && (
//               <div className="invalid-feedback">{errors.budget}</div>
//             )}
//           </div>

//           <button type="submit" className="btn btn-success w-100">
//             Get Recommendation
//           </button>
//         </form>
//       </div>

//       <div className=" m-5">
//         {recommendedPlans.length > 0 && (
//           <div className="mt-4">
//             <h4 className="text-success text-center m-5 fs-2 fw-bolder">
//               Recommended Plans:
//             </h4>
//             <div className="d-flex flex-wrap justify-content-center gap-4">
//               {recommendedPlans.map((plan, index) => (
//                 <div
//                   key={index}
//                   className="plan-box mb-4 p-4 shadow-lg rounded"
//                   style={{
//                     width: "calc(33.33% - 16px)", // 3 plans in a row with some gap
//                     cursor: "pointer", // Make it clickable
//                     backgroundColor:
//                       selectedPlanId === plan.Id ? "#d4edda" : "", // Optional highlight for the selected plan
//                   }}
//                   onClick={() => handlePlanClick(plan.Id)} // Handle the click event
//                 >
//                   <h5 className="text-success fw-bolder fs-4 mb-3">
//                     {plan.CropName}
//                   </h5>
//                   <p>
//                     <strong>Description:</strong> {plan.CropDescription}
//                   </p>
//                   <p>
//                     <strong>Start Date:</strong>{" "}
//                     {new Date(plan.StartDate).toLocaleDateString()}
//                   </p>
//                   <p>
//                     <strong>Last Start Date:</strong>{" "}
//                     {new Date(plan.LastStartDate).toLocaleDateString()}
//                   </p>
//                   <p>
//                     <strong>Duration:</strong> {plan.Duration} days
//                   </p>
//                   <p>
//                     <strong>Total Cost:</strong> ${plan.TotalCost.toFixed(2)}
//                   </p>
//                 </div>
//               ))}
//             </div>

//             {/* Confirm button that appears only if there are recommended plans */}
//             {selectedPlanId && (
//               <div className="text-center">
//                 <button
//                   className="btn btn-success w-25 mt-4 p-4 fs-5"
//                   onClick={handleConfirmPlan}
//                 >
//                   Confirm Plan Selection
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       <Snackbar
//         open={openSnackbar}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//       >
//         <Alert
//           onClose={handleCloseSnackbar}
//           severity={recommendedPlans.length > 0 ? "success" : "error"}
//           sx={{ width: "100%" }}
//         >
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// };

// export default RecommendPlan;
import React, { useState, useEffect } from "react";
import Joi from "joi";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import api from "../../services/api";
import { useNavigate } from "react-router-dom"; // Import useNavigate for page navigation
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

import "./RecommendPlan.css";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Joi schema for validation
const schema = Joi.object({
  startDate: Joi.date().required().label("Start Date"),
  endDate: Joi.date().min(Joi.ref("startDate")).required().label("End Date"),
  budget: Joi.number().positive().required().label("Budget"),
});

const RecommendPlan = () => {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    budget: "",
  });

  const [errors, setErrors] = useState({});
  const [recommendedPlans, setRecommendedPlans] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedPlanId, setSelectedPlanId] = useState(null); // State for storing selected plan's ID
  const [openStageModal, setOpenStageModal] = useState(false); // For modal visibility
  const [currentStages, setCurrentStages] = useState([]); // For storing stages of selected plan

  const navigate = useNavigate(); // useNavigate for navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

    try {
      const response = await api.post("/api/Crop/GetRecommendedCrops", {
        fromDate: formData.startDate,
        toDate: formData.endDate,
        budget: parseFloat(formData.budget),
      });

      console.log("✅ API Success Response:", response.data);
      setRecommendedPlans(response.data);
      setSnackbarMessage(`Found ${response.data.length} recommended plans.`);
      console.log("recommended plans are : ", recommendedPlans);
      setOpenSnackbar(true);
    } catch (err) {
      // Full error logging
      if (err.response) {
        console.error("❌ API Error Response:", err.response.data);
        const message =
          err.response.data.Message || "Failed to get recommendations.";
        const reasons = err.response.data.Reasons || [];

        setSnackbarMessage(`${message}`);
      } else {
        console.error("❌ Network or other error:", err);
        setSnackbarMessage("Unexpected error occurred.");
      }

      setRecommendedPlans([]);
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Handle plan click
  const handlePlanClick = (plan) => {
    setSelectedPlan(plan); // Store the full plan object
    setSelectedPlanId(plan.Id); // Keep ID too, if needed
    console.log("Selected Plan:", plan);
  };

  // Handle confirm button click to navigate
  const handleConfirmPlan = () => {
    if (selectedPlanId) {
      // Navigate to /planProgress with the selected plan's ID
      navigate(`/plan-progress/${selectedPlan.Id}`, {
        state: {
          stages: selectedPlan.Stages,
          cropName: selectedPlan.CropName,
        },
      });
    } else {
      alert("Please select a plan first.");
    }
  };

  const handleShowStages = (stages) => {
    setCurrentStages(stages); // Set the stages to show
    setOpenStageModal(true); // Open the modal
  };

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
              step="any"
            />
            {errors.budget && (
              <div className="invalid-feedback">{errors.budget}</div>
            )}
          </div>

          <button type="submit" className="btn btn-success w-100">
            Get Recommendation
          </button>
        </form>
      </div>

      <div className=" m-5">
        {recommendedPlans.length > 0 && (
          <div className="mt-4">
            <h4 className="text-success text-center m-5 fs-2 fw-bolder">
              Recommended Plans:
            </h4>
            <div className="d-flex flex-wrap justify-content-center gap-4">
              {recommendedPlans.map((plan, index) => (
                <div
                  key={index}
                  className="plan-box mb-4 p-4 shadow-lg rounded"
                  style={{
                    width: "calc(33.33% - 16px)", // 3 plans in a row with some gap
                    cursor: "pointer", // Make it clickable
                    backgroundColor:
                      selectedPlanId === plan.Id ? "#d4edda" : "", // Optional highlight for the selected plan
                  }}
                  onClick={() => handlePlanClick(plan)} // Handle the click event
                >
                  <h5 className="text-success fw-bolder fs-4 mb-3">
                    {plan.CropName}
                  </h5>
                  <p>
                    <strong>Description:</strong> {plan.CropDescription}
                  </p>
                  <p>
                    <strong>Total Cost:</strong> ${plan.TotalCost.toFixed(2)}
                  </p>

                  <button
                    className="btn btn-outline-success mt-3"
                    onClick={() => handleShowStages(plan.Stages)}
                  >
                    Show Stages
                  </button>
                </div>
              ))}
            </div>

            {/* Confirm button that appears only if there are recommended plans */}
            {selectedPlanId && (
              <div className="text-center">
                <button
                  className="btn btn-success w-25 mt-4 p-4 fs-5"
                  onClick={handleConfirmPlan}
                >
                  Confirm Plan Selection
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={recommendedPlans.length > 0 ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Dialog
        open={openStageModal}
        onClose={() => setOpenStageModal(false)}
        maxWidth="md"
        fullWidth
        scroll="body" // Allow dialog to scroll if content overflows, not the page
        disableEnforceFocus // Optional: if you need tooltips etc. to still work
        disableEscapeKeyDown={false} // Esc key can close it (optional)
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
                  <strong>Cost:</strong> ${stage.Cost}
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
                <ul className="mt-3">
                  {stage.Steps && stage.Steps.length > 0 ? (
                    stage.Steps.map((step, stepIdx) => (
                      <li key={stepIdx} className="mb-3">
                        <strong>{step.StepName}</strong>: {step.Description}
                        <br />
                        <em>Tool:</em> {step.Tool}
                        <br />
                        <em>Duration (Days):</em> {step.DurationDays}
                        <br />
                        <em>Cost:</em> ${step.Cost?.toFixed(2)}
                        <br />
                        <em>Fertilizer:</em> {step.Fertilizer}
                        {step.ToolImage && (
                          <div className="mt-2">
                            <img
                              src={`/assets/images/${step.ToolImage}`}
                              alt={step.Tool}
                              style={{ width: "100px", borderRadius: "8px" }}
                            />
                          </div>
                        )}
                      </li>
                    ))
                  ) : (
                    <li>No steps available.</li>
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
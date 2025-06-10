import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Progress } from "../components/Progress ";
import "bootstrap-icons/font/bootstrap-icons.css";
import { getCropById } from "../api";

const PlanProgress = () => {
  const { planId: routePlanId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [planName, setPlanName] = useState(
    location.state?.cropName || `Plan ${routePlanId || "Details"}`
  );
  const [stages, setStages] = useState(location.state?.stages || []);
  const [isLoading, setIsLoading] = useState(false);
  const [initialStateLoadAttempted, setInitialStateLoadAttempted] =
    useState(false);

  const [completedStagesIndices, setCompletedStagesIndices] = useState(() => {
    if (!routePlanId) return [];
    const savedProgress = localStorage.getItem(`progress_${routePlanId}`);
    return savedProgress ? JSON.parse(savedProgress) : [];
  });

  useEffect(() => {
    if (location.state?.stages && location.state?.cropName) {
      setStages(location.state.stages);
      setPlanName(location.state.cropName);
      setInitialStateLoadAttempted(true);
    } else if (!initialStateLoadAttempted && routePlanId && !isLoading) {
      setIsLoading(true);
      setInitialStateLoadAttempted(true);

      const fetchPlanDetails = async (id) => {
        try {
          const data = await getCropById(id);
          // The API is expected to return { CropName: "...", Stages: [...] }
          return data;
        } catch (error) {
          console.error("Failed to fetch plan details:", error);
          throw error;
        }
      };

      fetchPlanDetails(routePlanId)
        .then((data) => {
          console.log(
            "PlanProgress: API response for planId",
            routePlanId,
            data
          );
          // Try to handle both PascalCase and camelCase keys
          const stagesData = data?.Stages || data?.stages || [];
          const cropNameData =
            data?.CropName || data?.cropName || data?.name || "";
          if (stagesData.length > 0 && cropNameData) {
            if (stages.length === 0) {
              setStages(stagesData);
              setPlanName(cropNameData);
            }
          } else if (data) {
            // Data received but not in expected format
            console.error(
              "PlanProgress: Fetched data is invalid or missing Stages/CropName.",
              data
            );
          }
          // If data is null/undefined from a successful but "not found" API call, do nothing here.
        })
        .catch((err) => {
          console.error(
            "PlanProgress: Failed to fetch plan details:",
            err.message
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [location.state, routePlanId, initialStateLoadAttempted, isLoading]);

  useEffect(() => {
    if (routePlanId) {
      localStorage.setItem(
        `progress_${routePlanId}`,
        JSON.stringify(completedStagesIndices)
      );
    }
  }, [completedStagesIndices, routePlanId]);

  const handleStageComplete = (index) => {
    if (!completedStagesIndices.includes(index)) {
      setCompletedStagesIndices((prevCompleted) =>
        [...prevCompleted, index].sort((a, b) => a - b)
      );
    }
  };

  const handleStageUndo = (index) => {
    setCompletedStagesIndices((prevCompleted) =>
      prevCompleted.filter((i) => i !== index)
    );
  };

  if (!routePlanId && !isLoading && stages.length === 0) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger text-center" role="alert">
          No Plan ID specified and no data loaded. Cannot display progress.
        </div>
        <button
          onClick={() => navigate(-1)}
          className="btn btn-primary mt-3 d-block mx-auto"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container py-5 text-center">
        <div
          className="d-flex justify-content-center align-items-center mb-3"
          style={{ minHeight: "200px" }}
        >
          <div
            className="spinner-border text-success"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
          >
            <span className="visually-hidden">Loading plan details...</span>
          </div>
          <p className="ms-3 fs-4">Loading plan details for {planName}...</p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="btn btn-outline-secondary"
        >
          {" "}
          ← Back{" "}
        </button>
      </div>
    );
  }

  const currentProgressCount = completedStagesIndices.length;

  if (!isLoading && stages.length === 0 && initialStateLoadAttempted) {
    return (
      <div className="container py-5">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-outline-secondary mb-4"
        >
          <i className="bi bi-arrow-left me-2"></i>Back
        </button>
        <h1 className="text-center text-danger mb-3 display-5 fw-bold">
          {planName || `Plan ${routePlanId}`}
        </h1>
        <div className="alert alert-warning text-center" role="alert">
          Could not load plan details. Please check if the plan exists or try
          again later.
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <button
        onClick={() => navigate(-1)}
        className="btn btn-outline-secondary mb-4"
      >
        <i className="bi bi-arrow-left me-2"></i>Back
      </button>
      <h1 className="text-center text-success mb-3 display-5 fw-bold">
        {planName} Progress
      </h1>
      <p className="text-center text-muted mb-5">
        Follow the stages below to complete your agricultural plan for{" "}
        {planName}.
      </p>

      {stages && stages.length > 0 ? (
        <Progress stages={stages} currentProgress={currentProgressCount} />
      ) : (
        <div className="alert alert-info text-center" role="alert">
          Preparing plan details... If this persists, the plan might have no
          stages or data could not be loaded.
        </div>
      )}

      {stages && stages.length > 0 && (
        <div className="accordion" id="planStagesAccordion">
          {stages.map((stage, idx) => {
            const isCompleted = completedStagesIndices.includes(idx);
            const isActive =
              (idx === 0 || completedStagesIndices.includes(idx - 1)) &&
              !isCompleted;
            const canMarkAsDone =
              idx === 0 || completedStagesIndices.includes(idx - 1);

            return (
              <div
                className="accordion-item mb-3 shadow-sm rounded"
                key={stage.Id || idx}
              >
                <h2 className="accordion-header" id={`heading-${idx}`}>
                  <button
                    className={`accordion-button p-3 
                      ${isCompleted ? "bg-success text-white fw-semibold" : ""} 
                      ${!isActive && !isCompleted ? "collapsed" : ""}
                    `}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse-${idx}`}
                    aria-expanded={isActive || isCompleted ? "true" : "false"}
                    aria-controls={`collapse-${idx}`}
                  >
                    <span
                      className={`badge me-3 p-2 ${
                        isCompleted
                          ? "bg-light text-success border border-success"
                          : "bg-secondary text-white"
                      }`}
                    >
                      Stage {idx + 1}
                    </span>
                    {stage.StageName}
                    {isCompleted && (
                      <i className="bi bi-check-circle-fill ms-auto fs-5"></i>
                    )}
                  </button>
                </h2>
                <div
                  id={`collapse-${idx}`}
                  className={`accordion-collapse collapse ${
                    isActive || isCompleted ? "show" : ""
                  }`}
                  aria-labelledby={`heading-${idx}`}
                  data-bs-parent="#planStagesAccordion"
                >
                  <div
                    className={`card-body p-4 ${
                      isCompleted
                        ? "border border-success border-top-0 rounded-bottom"
                        : "border border-light-subtle border-top-0 rounded-bottom"
                    }`}
                  >
                    <p className="mb-1">
                      <strong>Estimated Cost for Stage:</strong> $
                      {stage.Cost?.toFixed(2) ?? "N/A"}
                    </p>
                    {stage.OptionalLink && (
                      <p className="mb-3">
                        <strong>More Info:</strong>{" "}
                        <a
                          href={stage.OptionalLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-decoration-none"
                        >
                          {stage.OptionalLink}
                        </a>
                      </p>
                    )}
                    <hr />
                    {stage.Steps && stage.Steps.length > 0 ? (
                      <>
                        <h4 className="mb-3 mt-3 text-muted fw-normal fs-5">
                          Steps:
                        </h4>
                        {stage.Steps.map((step, stepIdx) => (
                          <div
                            className="card mb-3 w-100"
                            key={step.Id || stepIdx}
                          >
                            <div className="card-body">
                              <h5 className="card-title text-primary">
                                {step.StepName}
                              </h5>
                              {step.Description && (
                                <p className="card-text">{step.Description}</p>
                              )}
                              <ul className="list-group list-group-flush mt-2">
                                {step.Tool && (
                                  <li className="list-group-item px-0">
                                    <strong>Tool:</strong> {step.Tool}
                                  </li>
                                )}
                                {step.DurationDays !== undefined && (
                                  <li className="list-group-item px-0">
                                    <strong>Duration:</strong>{" "}
                                    {step.DurationDays} day(s)
                                  </li>
                                )}
                                {step.Cost !== undefined && (
                                  <li className="list-group-item px-0">
                                    <strong>Est. Step Cost:</strong> $
                                    {step.Cost?.toFixed(2)}
                                  </li>
                                )}
                                {step.Fertilizer && (
                                  <li className="list-group-item px-0">
                                    <strong>Fertilizer:</strong>{" "}
                                    {step.Fertilizer}
                                  </li>
                                )}
                              </ul>
                              {step.ToolImage && (
                                <div className="mt-3 text-center">
                                  <img
                                    src={step.ToolImage}
                                    alt={step.Tool || "Tool image"}
                                    className="img-thumbnail"
                                    style={{
                                      maxWidth: "150px",
                                      maxHeight: "150px",
                                      objectFit: "contain",
                                    }}
                                    onError={(e) => {
                                      e.target.style.display = "none";
                                    }}
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <p className="text-muted">
                        No steps defined for this stage.
                      </p>
                    )}
                    <div className="mt-4 d-flex justify-content-end">
                      {isCompleted ? (
                        <button
                          className="btn btn-outline-warning"
                          onClick={() => handleStageUndo(idx)}
                        >
                          <i className="bi bi-arrow-counterclockwise me-2"></i>
                          Undo Completion
                        </button>
                      ) : (
                        <button
                          className="btn btn-lg btn-success"
                          onClick={() => handleStageComplete(idx)}
                          disabled={!canMarkAsDone}
                        >
                          <i className="bi bi-check-circle me-2"></i>Mark Stage{" "}
                          {idx + 1} as Done
                        </button>
                      )}
                    </div>
                    {!isCompleted && !canMarkAsDone && (
                      <small className="form-text text-muted d-block text-end mt-1">
                        {" "}
                        Please complete the previous stage first.{" "}
                      </small>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {stages &&
        stages.length > 0 &&
        currentProgressCount === stages.length && (
          <div
            className="alert alert-success text-center mt-5 p-4 shadow"
            role="alert"
          >
            <h4 className="alert-heading">
              <i className="bi bi-trophy-fill me-2"></i>Congratulations!
            </h4>
            <p>You have completed all stages for {planName}.</p>
            <hr />
            <p className="mb-0">Well done on your progress!</p>
          </div>
        )}
    </div>
  );
};

export default PlanProgress;

import "./Progress.css";
import React from "react";

const Progress = ({ stages = [], currentProgress = 0 }) => {
  if (!stages || stages.length === 0) {
    return null;
  }

  const totalStages = stages.length;
  const isSingleStep = totalStages === 1; // Check if there's only one step

  return (
    <div className="stepper-container mb-5">
      {/* Add 'single-step-mode' class conditionally */}
      <div
        className={`stepper-wrapper ${isSingleStep ? "single-step-mode" : ""}`}
      >
        <div className="stepper-line-bg"></div>
        <div
          className="stepper-line-fg"
          style={{
            width:
              totalStages > 1
                ? `${
                    (Math.max(0, currentProgress - 1) / (totalStages - 1)) * 100
                  }%`
                : currentProgress > 0
                ? "100%"
                : "0%",
          }}
        ></div>
        {stages.map((stage, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber <= currentProgress;

          return (
            <div
              key={stage.Id || index}
              className={`stepper-step ${isCompleted ? "completed" : ""}`}
            >
              <div className="step-indicator">
                {isCompleted ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-check-lg"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
                  </svg>
                ) : (
                  stepNumber
                )}
              </div>
              <div className="step-label mt-2">{stage.StageName}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { Progress };

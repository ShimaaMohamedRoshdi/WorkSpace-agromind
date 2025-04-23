const BASE_URL = "https://localhost:7057/api";

export const addCrop = async (cropData) => {
  const response = await fetch(`${BASE_URL}/Crop/AddCrop`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cropData),
  });

  return await response.json();
};

export const updateCrop = async (id, cropData) => {
  const response = await fetch(`${BASE_URL}/Crop/UpdateCrop/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cropData),
  });

  return await response.json();
};

export const deleteCrop = async (id) => {
  const response = await fetch(`${BASE_URL}/Crop/DeleteCrop/${id}`, {
    method: "DELETE",
  });

  return await response.json();
};

export const getAllCrops = async () => {
  const response = await fetch(`${BASE_URL}/Crop/GetAllCrops`);
  return await response.json();
};

export const getCropById = async (id) => {
  const response = await fetch(`${BASE_URL}/Crop/GetCropById/${id}`);
  return await response.json();
};

export const addStage = async (stageData) => {
  const response = await fetch(`${BASE_URL}/Stage/AddStage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(stageData),
  });

  return await response.json();
};

export const addStep = async (stepData) => {
  const response = await fetch(`${BASE_URL}/Step/AddStep`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(stepData),
  });

  return await response.json();
};

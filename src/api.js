const BASE_URL = "https://localhost:7057/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token
    ? { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
    : { "Content-Type": "application/json" };
};

export const addCrop = async (cropData) => {
  const response = await fetch(`${BASE_URL}/Crop/AddCrop`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(cropData),
  });

  return await response.json();
};

export const updateCrop = async (id, cropData) => {
  const response = await fetch(`${BASE_URL}/Crop/UpdateCrop/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(cropData),
  });

  return await response.json();
};

export const deleteCrop = async (id) => {
  const token = localStorage.getItem("token");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await fetch(`${BASE_URL}/Crop/DeleteCrop/${id}`, {
    method: "DELETE",
    headers,
  });

  return await response.json();
};

export const getAllCrops = async () => {
  const token = localStorage.getItem("token");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await fetch(`${BASE_URL}/Crop/GetAllCrops`, { headers });
  return await response.json();
};

export const getCropById = async (id) => {
  const token = localStorage.getItem("token");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await fetch(`${BASE_URL}/Crop/GetCropById/${id}`, {
    headers,
  });
  return await response.json();
};

export const addStage = async (stageData) => {
  const response = await fetch(`${BASE_URL}/Stage/AddStage`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(stageData),
  });

  return await response.json();
};

export const addStep = async (stepData) => {
  const response = await fetch(`${BASE_URL}/Step/AddStep`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(stepData),
  });

  return await response.json();
};

// ✅ NEW: GetMyPlans
export const getMyPlans = async () => {
  const token = localStorage.getItem("token");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const response = await fetch(`${BASE_URL}/Crop/GetMyPlans`, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch plans");
  }

  return await response.json();
};

export const getPlanInfo = async (cropId) => {
  const token = localStorage.getItem("token");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  // This endpoint gets the detailed information for one plan
  const response = await fetch(`${BASE_URL}/Crop/GetPlanInfo/${cropId}`, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch plan details for ID ${cropId}`);
  }
  return await response.json();
};


// ✅ NEW: Update Plan Actuals
export const updatePlanActuals = async (cropId, actuals) => {
  console.log("Updating plan actuals for cropId:", cropId);
  console.log("Payload:", JSON.stringify(actuals, null, 2));

  const response = await fetch(`${BASE_URL}/Crop/${cropId}/Actuals`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(actuals),
  });

  console.log("Response status:", response.status);
  console.log("Response headers:", response.headers);

  if (!response.ok) {
    const errorText = await response.text(); // Read as text for error details
    console.error("Error response body:", errorText);
    throw new Error(`Failed to update plan actuals: ${response.status} - ${errorText}`);
  }

  // Handle 204 No Content response specifically
  if (response.status === 204) {
    return; // Successfully processed, no content to parse
  }

  // For other successful responses (e.g., 200 OK with a body)
  return await response.json();
};

// ✅ NEW: Adopt Recommended Crop
export const adoptRecommendedCrop = async (recommendedCropId, payload = {}) => {
  const response = await fetch(
    `${BASE_URL}/Crop/AdoptRecommendedCrop/${recommendedCropId}`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to adopt recommended crop");
  }
  return await response.json();
};

// ✅ NEW: Get Recommended Crops
export const getRecommendedCrops = async (payload = {}) => {
  const response = await fetch(`${BASE_URL}/Crop/GetRecommendedCrops`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error("Failed to get recommended crops");
  }
  return await response.json();
};

// ✅ NEW: Get All Plans With Creator Info
export const getAllPlansWithCreatorInfo = async () => {
  const token = localStorage.getItem("token");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await fetch(`${BASE_URL}/Crop/GetAllPlansWithCreatorInfo`, {
    method: "GET",
    headers,
  });
  if (!response.ok) {
    throw new Error("Failed to fetch all plans with creator info");
  }
  return await response.json();
};

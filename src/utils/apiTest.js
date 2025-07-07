import api from '../api';

// Function to test if the API server is running
export const checkApiServer = async () => {
  try {
    // Try to connect to the server with a simple request
    await api.get('/api/health');
    return {
      success: true,
      message: 'API server is running and accessible'
    };
  } catch (error) {
    console.error('API server check failed:', error);
    
    let message = 'API server is not accessible. ';
    
    if (error.code === 'ERR_NETWORK') {
      message += 'Please check if the backend server is running at the correct URL.';
      
      // Check if we're using the right port
      const currentBaseUrl = api.defaults.baseURL;
      message += `\nCurrent API URL: ${currentBaseUrl}`;
      
      // Suggest alternative ports to try
      message += '\nTry changing the port in src/api.js to one of: 5132, 7057, 5000, 5001';
    } else if (error.response) {
      message += `Server responded with status ${error.response.status}.`;
    }
    
    return {
      success: false,
      message,
      error: error.message,
      code: error.code
    };
  }
};

// Function to test the API endpoints
export const testApiEndpoints = async () => {
  console.log('Testing API endpoints...');
  
  // First check if the server is running
  const serverCheck = await checkApiServer();
  if (!serverCheck.success) {
    return serverCheck;
  }
  
  try {
    // Test GET /api/Crop/GetCrops
    console.log('Testing GET /api/Crop/GetCrops...');
    const cropsResponse = await api.get('/api/Crop/GetCrops');
    console.log('GetCrops response:', cropsResponse.data);
    
    // Test the structure of a simple crop payload
    const sampleCrop = {
      CropName: "Test Crop",
      CropImage: "",
      Description: "Test description",
      Stages: [
        {
          StageName: "Test Stage",
          Duration: 10,
          Description: "Test stage description",
          PictureUrl: "",
          TotalCost: 100,
          OptionalLink: "",
          Steps: []
        }
      ]
    };
    
    console.log('Sample crop payload:', JSON.stringify(sampleCrop, null, 2));
    
    return {
      success: true,
      message: 'API endpoints tested successfully',
      samplePayload: sampleCrop
    };
  } catch (error) {
    console.error('API test failed:', error);
    return {
      success: false,
      message: 'API test failed',
      error: error.message,
      details: error.response ? error.response.data : null
    };
  }
};

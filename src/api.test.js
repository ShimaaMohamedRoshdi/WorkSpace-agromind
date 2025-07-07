import axios from 'axios';

// Test different possible backend URLs
const testUrls = [
  'http://localhost:5132',
  'https://localhost:7057',
  'http://localhost:7057',
  'https://localhost:5132'
];

// Function to test connectivity to each URL
async function testBackendConnectivity() {
  console.log('Testing backend connectivity...');
  
  for (const url of testUrls) {
    try {
      console.log(`Testing ${url}...`);
      const response = await axios.get(`${url}/api`, { 
        timeout: 5000,
        validateStatus: () => true // Accept any status code
      });
      console.log(`✅ ${url} responded with status ${response.status}`);
    } catch (error) {
      console.log(`❌ ${url} failed: ${error.message}`);
    }
  }
}

// Export the test function
export { testBackendConnectivity };
import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { getAllCrops } from '../api';
import ProductCard from '../components/ProductCard';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const RecommendCrop = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [crops, setCrops] = useState([]);
  const [recommendedCrops, setRecommendedCrops] = useState([]);

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const data = await getAllCrops();
        console.log('Fetched crops:', data); // Debug log
        setCrops(data);
      } catch (error) {
        console.error('Error fetching crops:', error);
      }
    };
    fetchCrops();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!startDate || !endDate || !budget) {
      setRecommendedCrops([]);
      setSnackbarMessage("Please fill in all fields.");
      setOpenSnackbar(true);
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const budgetNum = parseFloat(budget);

    // Filter crops based on budget and growing duration within start and end dates
    // Map CropImage to image for ProductCard compatibility, prepend base URL if needed
    const baseUrl = ''; // Adjust this to your public assets or API base URL if needed, e.g. '/assets/images/' or 'http://localhost:5000/'
    const cropsWithImage = crops.map(crop => {
      let imageUrl = crop.CropImage || crop.cropImage || '';
      if (imageUrl && !imageUrl.startsWith('http')) {
        imageUrl = baseUrl + imageUrl;
      }
      return {
        ...crop,
        image: imageUrl,
      };
    });

    const filtered = cropsWithImage.filter((crop) => {
      // Parse crop start and end dates from crop data
      const cropStartDate = new Date(crop.startDate);
      const cropEndDate = new Date(crop.endDate);

      // Check if crop growing period overlaps with user input date range
      const overlapsDateRange = cropStartDate <= end && cropEndDate >= start;

      // Check budget
      const fitsBudget = crop.totalCost ? crop.totalCost <= budgetNum * 1.1 : true;

      return overlapsDateRange && fitsBudget;
    });

    setRecommendedCrops(filtered);
    setSnackbarMessage(`Found ${filtered.length} recommended crops.`);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div className="recommend-crop-container" style={{ maxWidth: '600px', margin: '2rem auto', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Recommend Crop</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="startDate" style={{ display: 'block', marginBottom: '0.5rem' }}>Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="endDate" style={{ display: 'block', marginBottom: '0.5rem' }}>End Date:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="budget" style={{ display: 'block', marginBottom: '0.5rem' }}>Budget:</label>
          <input
            type="number"
            id="budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            min="0"
            step="any"
            required
            placeholder="Enter your budget"
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <button type="submit" className="hero-button" style={{ width: '100%', padding: '0.75rem', fontSize: '1rem' }}>
          Get Recommendation
        </button>
      </form>

      {recommendedCrops.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Recommended Crops:</h3>
          <ul>
            {recommendedCrops.map((crop) => (
              <li key={crop.id} style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
                {crop.cropName}
              </li>
            ))}
          </ul>
        </div>
      )}

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default RecommendCrop;

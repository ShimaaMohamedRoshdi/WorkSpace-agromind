import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { getAllCrops } from '../api';

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
        setCrops(data);
      } catch (error) {
        console.error('Error fetching crops:', error);
      }
    };
    fetchCrops();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple filtering logic placeholder
    // Use CropName and TotalCost fields from API response
    const filtered = crops.filter(crop => {
      const cost = crop.TotalCost || 0;
      return cost <= parseFloat(budget);
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
              <li key={crop.Id}>
                <strong>{crop.CropName}</strong> - Estimated Cost: {crop.TotalCost || 'N/A'}
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

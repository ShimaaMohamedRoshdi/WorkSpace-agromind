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
    // For example, filter crops with estimatedCost <= budget
    const filtered = crops.filter(crop => {
      // Assuming crop has estimatedCost property, else adjust accordingly
      const cost = crop.estimatedCost || 0;
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
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default RecommendCrop;

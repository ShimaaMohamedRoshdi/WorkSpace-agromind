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
    // Map CropImage to image for ProductCard compatibility
    const cropsWithImage = crops.map(crop => ({
      ...crop,
      image: crop.CropImage || crop.cropImage || '', // fallback to empty string if no image
    }));

    const filtered = cropsWithImage.filter((crop) => {
      // Calculate total duration from stages if available, else default 90
      const totalDuration = crop.stages?.reduce((sum, stage) => sum + (stage.duration || 0), 0) || 90;

      // Calculate crop end date based on startDate input and totalDuration
      const cropEndDate = new Date(start.getTime() + totalDuration * 24 * 60 * 60 * 1000);

      // Relaxed filtering: allow crops that start before end date and cost within 10% above budget
      const fitsDateRange = cropEndDate >= start && cropEndDate <= end;
      const fitsBudget = crop.totalCost ? crop.totalCost <= budgetNum * 1.1 : true;

      return fitsDateRange && fitsBudget;
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
          <div className="row row-cols-1 row-cols-md-3 row-cols-lg-5 g-4">
            {recommendedCrops.map((crop) => (
              <div key={crop.id} className="col">
                <ProductCard product={crop} />
              </div>
            ))}
          </div>
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

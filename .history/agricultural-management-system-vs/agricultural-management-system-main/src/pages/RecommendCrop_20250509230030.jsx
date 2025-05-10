import React, { useState } from 'react';

const RecommendCrop = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for recommendation logic
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
    console.log('Budget:', budget);
    alert(`Recommendation requested for:\nStart Date: ${startDate}\nEnd Date: ${endDate}\nBudget: ${budget}`);
  };

  return (
    <div className="recommend-crop-container" style={{ maxWidth: '500px', margin: '2rem auto', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
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

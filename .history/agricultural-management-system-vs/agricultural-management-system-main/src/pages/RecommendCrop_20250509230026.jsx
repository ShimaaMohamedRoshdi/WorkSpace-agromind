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

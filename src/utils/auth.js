// Authentication utility functions

// Check if user is logged in
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token; // Returns true if token exists
};

// Get the current user's token
export const getToken = () => {
  return localStorage.getItem('token');
};

// Get the current user's role
export const getUserRole = () => {
  return localStorage.getItem('userRole');
};

// Logout function - clear all auth data
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userRole');
  // Redirect to login page
  window.location.href = '/signin';
};
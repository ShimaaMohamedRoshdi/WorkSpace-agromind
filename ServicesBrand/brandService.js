import api from '../services/api.jsx';

// Get all brands
export const getAllBrands = async () => {
  try {
    const response = await api.get('/api/Brand/GetAllBrands');
    return response.data;
  } catch (error) {
    console.error('Error fetching brands:', error);
    throw error;
  }
};

// Get brand by ID
export const getBrandById = async (id) => {
  try {
    const response = await api.get(`/api/Brand/GetBrandById/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching brand with ID ${id}:`, error);
    throw error;
  }
};

// Add new brand
export const addBrand = async (brandData) => {
  try {
    const response = await api.post('/api/Brand/AddBrand', brandData);
    return response.data;
  } catch (error) {
    console.error('Error adding brand:', error);
    throw error;
  }
};

// Update brand
export const updateBrand = async (id, brandData) => {
  try {
    const response = await api.put(`/api/Brand/UpdateBrandById/${id}`, brandData);
    return response.data;
  } catch (error) {
    console.error(`Error updating brand with ID ${id}:`, error);
    throw error;
  }
};

// Delete brand
export const deleteBrand = async (id) => {
  try {
    const response = await api.delete(`/api/Brand/DeleteBrand/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting brand with ID ${id}:`, error);
    throw error;
  }
};

// Get deleted brands
export const getDeletedBrands = async () => {
  try {
    const response = await api.get('/api/Brand/DeletedBrands');
    return response.data;
  } catch (error) {
    console.error('Error fetching deleted brands:', error);
    throw error;
  }
};







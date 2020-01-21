import axios from './axios';

export async function list(irr) {
  try {
    const response = await axios.get('/api/assets', {
      params: {
        irr:irr
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function show(id) {
  try {
    const response = await axios.get('/api/assets/'+id);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Index, Show, Create, Delete, Update
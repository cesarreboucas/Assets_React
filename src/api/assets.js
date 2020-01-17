import axios from './axios';

export async function list() {
  try {
    const response = await axios.get('/api/assets');
    return response.data.assets;
  } catch (error) {
    throw error;
  }
}
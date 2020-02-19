import axios from './axios';

export async function createGoal(goalData) {
  try {
    const response = await axios.post('/api/goals',
      goalData);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getGoals() {
  try {
    const response = await axios.get('/api/goals');
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getGoal(goalId) {
  try {
    const response = await axios.get('/api/goals/'+goalId);
    return response.data;
  } catch (error) {
    throw error;
  }
}
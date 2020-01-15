import axios from './axios';
import qs from 'qs';

export function isAuthenticated() {
  const logged = localStorage.getItem('LOGGED');
  if(logged != null) {
    if(logged === 'true') return true;
    return false;
  }
  return false;
};

export async function logIn(username, password, remember) {
  const details = {
      username: username,
      password: password
  };

  try {
    let response = await axios.post('/api/login', qs.stringify(details), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    if(remember) {
      localStorage.setItem('AUTH_TOKEN');
    }
    localStorage.setItem('LOGGED', 'true');
    return response.data.token;
  } catch (error) {
    throw error;
  }
};

export async function signUp(firstName, lastName, username, password) {
  const details = {
      username: username,
      password: password,
      first_name : firstName,
      last_name : lastName
  };

  try {
    let response = await axios.post('/api/signup', qs.stringify(details), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response.data.token;
  } catch (error) {
    throw error;
  }
};
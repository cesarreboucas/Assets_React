import axios from './axios';
import qs from 'qs';

export function isAuthenticated() {
  const logged = localStorage.getItem('AUTH_TOKEN');
  console.log('[isAuthenticated]', logged);
  if(logged != null) {
    return true;
  }
  return false;
};

export function logOut() {
  localStorage.removeItem('AUTH_TOKEN');
}

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
    localStorage.setItem('AUTH_TOKEN', response.data.token);
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

export async function userInfo() {
  let response = await axios.get('/api/users/read/:id');
  return response.data;
}

export async function editUserInfo(res){
  
  try{
    let response = await axios.put('/api/users/update/:id',res);

    console.log("NODE - ANDRE", response);
  }
  catch(error){

    console.log("React Response from NODE - ANDRE", error.response.data);
  }

  
}
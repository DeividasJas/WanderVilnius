import axios from 'axios';

const user_url = import.meta.env.VITE_USER;

export const signupUser = async (formData) => {
  try {
    const response = await axios.post(`${user_url}/signup`, formData);
    return response;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

export const loginUser = async (formData) => {
  try {
    const response = await axios.post(`${user_url}/login`, formData);
    console.log(`${user_url}/login`);
    return response
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

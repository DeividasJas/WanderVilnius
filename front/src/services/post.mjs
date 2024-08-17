import axios from 'axios';

const user_url = import.meta.env.VITE_USER;
const tour_url = import.meta.env.VITE_TOUR;
const registration_url = import.meta.env.VITE_REGISTRATION;

const token = window.localStorage.getItem('token');
const config = {
  headers: { Authorization: `Bearer ${token}` },
};

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
    return response;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

export const createTour = async (formData) => {
  try {
    // console.log(formData);
    const response = await axios.post(tour_url, formData, config);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

export const registerTourTime = async (formData) => {
  try {
    const response = await axios.post(`${tour_url}/time`, formData, config);
    return response;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

export const registerUserToTour = async (data) => {
  try {
    const response = await axios.post(registration_url, data, config);
    return response;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

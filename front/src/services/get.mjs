import axios from 'axios';

const tour_url = import.meta.env.VITE_TOUR;
const user_url = import.meta.env.VITE_USER;
const token = window.localStorage.getItem('token');
const config = {
  headers: { Authorization: `Bearer ${token}` },
};

export const getGroupTours = async () => {
  try {
    const response = await axios.get(`${tour_url}/group`, config);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};
export const getSoloTours = async () => {
  try {
    const response = await axios.get(`${tour_url}/solo`, config);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

export const getTours = async (tourType) => {
  try {
    const response = await axios.get(`${tour_url}/${tourType}`, config);
    return response;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

export const getAllTours = async () => {
  try {
    const response = await axios.get(tour_url, config);
    return response;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

export const getTourById = async (tourId) => {
  try {
    console.log(`${tour_url}/${tourId}`);
    const response = await axios.get(`${tour_url}/${tourId}`);
    return response;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

export const searchTours = async (queryString, tourType) => {
  try {
    // console.log(`${tour_url}/search/${tourType}?${queryString}`);
    const response = await axios.get(
      `${tour_url}/search/${tourType}?${queryString}`,
      config
    );
    return response;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

export const getUserByEmail = async (email) => {
  try {
    const response = await axios.get(`${user_url}/email/${email}`);
    return response;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

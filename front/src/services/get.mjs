import axios from 'axios';

const tour_url = import.meta.env.VITE_TOUR;
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

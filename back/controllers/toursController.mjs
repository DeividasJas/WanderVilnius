import { DateTime } from 'luxon';
import {
  pg_deleteTour,
  pg_deleteTourTime,
  pg_getAllTours,
  pg_getGroupTours,
  pg_getSoloTours,
  pg_getTourById,
  pg_postTour,
  pg_registerNewTourTime,
  pg_searchTour,
} from '../models/toursModel.mjs';

export const postTour = async (req, res) => {
  try {
    console.log('hello');
    let {
      name,
      description,
      is_group,
      location,
      maximum_participants,
      image_url,
      //   registered_participants
    } = req.body;
    console.log(
      name,
      description,
      is_group,
      location,
      maximum_participants,
      image_url
    );

    if (!is_group) {
      maximum_participants = 1;
    }

    if (
      typeof is_group !== 'boolean' ||
      typeof maximum_participants !== 'number'
    ) {
      return res.status(409).json({ message: 'Wrong format' });
    }
    // Not posting registered participants here
    // because in this query we are just stating maximum capacity of the tour
    // it should be done in next steps
    const newTour = await pg_postTour(
      name,
      description,
      is_group,
      location,
      parseInt(maximum_participants),
      image_url
    );

    if (typeof newTour.id !== 'number') {
      return res.status(422).json({ message: 'Failed to create new tour' });
    }
    return res.status(201).json(newTour);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export const getGroupTours = async (req, res) => {
  try {
    const groupTours = await pg_getGroupTours();

    if (groupTours.length < 1) {
      return res.status(404).json({ message: 'No group tours has been found' });
    }
    return res.status(200).json(groupTours);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export const getSoloTours = async (req, res) => {
  try {
    const soloTours = await pg_getSoloTours();
    // console.log(grou);
    if (soloTours.length < 1) {
      return res
        .status(404)
        .json({ message: 'No tour for one person has been found' });
    }
    return res.status(200).json(soloTours);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export const getTourById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('IAM HERE');
    console.log(id);
    const tour = await pg_getTourById(id);
    console.log(tour);
    if (!tour) {
      return res.status(404).json({ message: 'No tour found by id 👀' });
    }
    return res.status(200).json(tour);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export const getAllTours = async (req, res) => {
  try {
    const allTours = await pg_getAllTours();
    return res.status(200).json(allTours);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export const deleteTourById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTour = await pg_deleteTour(id);

    if (!deletedTour) {
      return res.status(200).json({ message: 'Tour was successfully deleted' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export const registerNewTourTime = async (req, res) => {
  try {
    const { tour_id, tour_date_time } = req.body;
    console.log(tour_id, tour_date_time);

    // Create a Luxon DateTime object with the Vilnius time zone
    const dateInVilnius = DateTime.fromISO(tour_date_time, {
      zone: 'Europe/Vilnius',
    });

    // Convert to UTC
    const dateInUTC = dateInVilnius.toUTC().toISO();

    console.log(`Converted DateTime (UTC): ${dateInUTC}`);

    const newTourTime = await pg_registerNewTourTime(tour_id, dateInUTC);

    return res.status(201).json(newTourTime);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteTourTime = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTime = await pg_deleteTourTime(id);
    console.log(deletedTime);
    return res.status(200).json({ message: 'Successfully deleted' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export const searchTour = async (req, res) => {
  try {
    let { tourType } = req.params;
    if (tourType === 'individual') {
      tourType = false;
    } else if (tourType === 'group') {
      tourType = true;
    } else {
      return res.status(404).json({ message: 'Bad request' });
    }

    const results = await pg_searchTour(req.query, tourType);
    console.log(results);
    return res.status(200).json(results);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

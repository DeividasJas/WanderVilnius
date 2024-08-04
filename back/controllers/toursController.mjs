import {
  pg_deleteTour,
  pg_deleteTourTime,
  pg_getGroupTours,
  pg_getSoloTours,
  pg_getTourById,
  pg_postTour,
  pg_registerNewTourTime,
} from '../models/toursModel.mjs';

export const postTour = async (req, res) => {
  try {
    let {
      name,
      description,
      is_group,
      location,
      maximum_participants,
      //   registered_participants
    } = req.body;

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
      maximum_participants
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
    const newTourTime = await pg_registerNewTourTime(tour_id, tour_date_time);
    // all times are given in UTC 0,
    // thus you will have to add / remove extra hours depending on you time zone
    return res.status(201).json(newTourTime);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
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

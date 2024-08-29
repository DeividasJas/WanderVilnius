import {
  pg_maximum_participants,
  pg_newRegistration,
  pg_registered_participants,
} from "../models/registrationModel.mjs";

export const newRegistartion = async (req, res) => {
  try {
    const { id: user_id } = req.user;

    const { tour_id, tour_time_id } = req.body;

    const maxPeople = await pg_maximum_participants(tour_id);
    console.log(maxPeople);

    const currentPeople = await pg_registered_participants(tour_time_id);
    console.log(currentPeople);

    if (maxPeople - currentPeople >= 1) {
      const registration = await pg_newRegistration(
        user_id,
        tour_id,
        tour_time_id,
      );
      return res.status(201).json(registration);
    } else {
      return res.status(400).json({ message: "No spots available" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

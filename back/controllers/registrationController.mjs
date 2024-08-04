import { pg_newRegistration } from '../models/registrationModel.mjs';

export const newRegistartion = async (req, res) => {
  try {
    const { id: user_id } = req.user;
    const { tour_id, tour_time_id } = req.body;
    const registration = await pg_newRegistration(user_id, tour_id, tour_time_id);
    console.log(registration);
    return res.status(201).json(registration);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

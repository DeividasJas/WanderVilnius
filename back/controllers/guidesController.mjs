import {
  pg_getGuideByEmail,
  pg_getGuideById,
  pg_getGuideByPhoneNumber,
  pg_getGuides,
  pg_postGuide,
} from '../models/guidesModel.mjs';

export const postGuide = async (req, res) => {
  try {
    const { name, lastname, description, phone_number, email, age } = req.body;
    const new_guide = await pg_postGuide(
      name,
      lastname,
      description,
      phone_number,
      email,
      age
    );

    const existingGuideEmail = await pg_getGuideByEmail(email);
    const existingGuidePhone = await pg_getGuideByPhoneNumber(phone_number);
    if (existingGuideEmail) {
      return res.status(409).json({ message: 'Email is ocupied 😫' });
    }
    if (existingGuidePhone) {
      return res.status(409).json({ message: 'Phone number is ocupied 🤨' });
    }

    console.log(new_guide);
    res.status(201).json(new_guide);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export const getGuideById = async (req, res) => {
  try {
    const { id } = req.params;
    const guide = await pg_getGuideById(id);
    if (!guide) {
      return res.status(404).json({ message: 'Guide not found' });
    }
    res.status(200).json(guide);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export const getGuides = async (req, res) => {
  try {
    const guides = await pg_getGuides();
    console.log(guides);
    if (guides.length < 1) {
      return res.status(404).json({ message: 'No guides found' });
    }
    return res.status(200).json(guides)
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

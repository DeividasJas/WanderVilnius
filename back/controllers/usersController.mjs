import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  pg_getAllUsers,
  pg_postUser,
  pg_getUserByEmail,
  pg_getUserByPhoneNumber,
  pg_getUserById,
} from '../models/usersModel.mjs';

// --------generate token----------------
const getToken = (id, name, lastname, email, phone_number, role) => {
  const token = jwt.sign(
    { id, name, lastname, email, phone_number, role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES,
    }
  );
  return token;
};
// --------------------------------------

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await pg_getAllUsers();
    if (allUsers.length > 0) {
      return res.status(200).json(allUsers);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await pg_getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: 'No user found' });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await pg_getUserById(id);
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: 'User not found ☹️' });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export const signupUser = async (req, res) => {
  try {
    const { name, lastname, email, phone_number, password, repeat_password } =
      req.body;

    if (password !== repeat_password) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const existingUserByEmail = await pg_getUserByEmail(email);
    const existingUserByPhone = await pg_getUserByPhoneNumber(phone_number);

    if (existingUserByEmail) {
      console.log('Email or phone number is occupied');
      return res.status(409).json({ message: 'Email is occupied' });
    }
    if (existingUserByPhone) {
      console.log('Email or phone number is occupied');
      return res.status(409).json({ message: 'Phone is occupied' });
    }

    // hashing password
    const salt = await bcrypt.genSalt(10);
    console.log(salt);
    const hashed_password = await bcrypt.hash(password, salt);
    // ---------------------------------
    const newUser = await pg_postUser(
      name,
      lastname,
      email,
      phone_number,
      hashed_password
    );
    console.log(newUser);

    const token = getToken(
      newUser.id,
      newUser.name,
      newUser.lastname,
      newUser.email,
      newUser.phone_number,
      newUser.role
    );

    res.status(201).json(token);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(email, password, 1234);
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email or password is missing 😤' });
    }

    const existingUser = await pg_getUserByEmail(email);

    //  check if user exsist
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: 'User with this email does not exists' });
    }
    // compare existing user passsword with entered password
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    console.log(isPasswordValid);
    console.log(password, existingUser.password);
    // if password doesnt match return
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: 'email or password does not match 😭' });
    }

    // if password and email matches create user new token
    const token = getToken(
      existingUser.id,
      existingUser.lastname,
      existingUser.name,
      existingUser.email,
      existingUser.phone_number,
      existingUser.role
    );

    res.status(200).json(token);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

import express from "express";
import {
  getAllUsers,
  signupUser,
  loginUser,
  getUserById,
  getUserByEmail,
} from "../controllers/usersController.mjs";

const router = express.Router();

router.route("").get(getAllUsers);
router.route("/login").post(loginUser);
router.route("/signup").post(signupUser);
router.route("/email/:email").get(getUserByEmail);
router.route("/:id").get(getUserById);

export default router;
// wandervilnius

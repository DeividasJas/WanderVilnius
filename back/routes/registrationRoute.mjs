import express from 'express';
import { newRegistartion } from '../controllers/registrationController.mjs';
import { isUser } from '../middlewares/authorizationMiddleware.mjs';

const router = express.Router();

router.route('').post(isUser, newRegistartion);

export default router;

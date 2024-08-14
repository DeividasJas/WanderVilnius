import express from 'express';
import {
  deleteTourById,
  deleteTourTime,
  getAllTours,
  getGroupTours,
  getSoloTours,
  getTourById,
  postTour,
  registerNewTourTime,
  searchTour,
} from '../controllers/toursController.mjs';
import { isAdmin, isUser } from '../middlewares/authorizationMiddleware.mjs';
const router = express.Router();

router.route('').post(postTour).get(isAdmin, getAllTours);
router.route('/group').get(getGroupTours);
router.route('/individual').get(getSoloTours);

router.route('/time').post(isAdmin, registerNewTourTime);
router.route('/time/:id').delete(deleteTourTime);

router.route('/search/:tourType').get(searchTour);

router.route('/:id').get(getTourById).delete(deleteTourById);

export default router;

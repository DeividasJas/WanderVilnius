import express from 'express'
import { deleteTourById, deleteTourTime, getGroupTours, getSoloTours, getTourById, postTour, registerNewTourTime } from '../controllers/toursController.mjs'
import { isUser } from '../middlewares/authorizationMiddleware.mjs'
const router = express.Router()

router.route('').post(postTour)
router.route('/group').get(isUser, getGroupTours)
router.route('/solo').get(isUser, getSoloTours)


router.route('/time').post(registerNewTourTime)
router.route('/time/:id').delete(deleteTourTime)



router.route('/:id').get(getTourById).delete(deleteTourById)



export default router
import express from 'express'
import { deleteTourById, deleteTourTime, getGroupTours, getSoloTours, getTourById, postTour, registerNewTourTime } from '../controllers/toursController.mjs'

const router = express.Router()

router.route('').post(postTour)
router.route('/group').get(getGroupTours)
router.route('/solo').get(getSoloTours)


router.route('/time').post(registerNewTourTime)
router.route('/time/:id').delete(deleteTourTime)



router.route('/:id').get(getTourById).delete(deleteTourById)



export default router
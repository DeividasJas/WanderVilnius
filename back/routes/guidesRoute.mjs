import express from 'express';

import { getGuideById, getGuides, postGuide } from '../controllers/guidesController.mjs';

const router = express.Router();

router.route('/').post(postGuide).get(getGuides)
router.route('/:id').get(getGuideById);

export default router;

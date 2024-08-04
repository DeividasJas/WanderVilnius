import express from 'express'
import { isUser } from '../middlewares/authorizationMiddleware.mjs'

const router = express.Router()

router.route('').get(isUser, )

export default router
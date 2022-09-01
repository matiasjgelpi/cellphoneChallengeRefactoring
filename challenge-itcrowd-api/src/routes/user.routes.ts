import { Router } from 'express'
import userServices from '../services/userServices'

const router = Router()

router.post('/user', userServices.postUser)

export default router

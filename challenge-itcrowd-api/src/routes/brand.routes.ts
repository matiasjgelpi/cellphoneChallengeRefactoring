import { Router } from 'express'
import brandServices from '../services/brandServices'
import { verifyToken } from '../utils/verifyToken'

const router = Router()

router.post('/brand',verifyToken, brandServices.postBrand)
router.get('/brands', brandServices.getAllBrands)
router.get('/brand/:id', brandServices.getBrand)
router.delete('/brand/:id',verifyToken, brandServices.deleteBrand)
router.put('/brand/:id',verifyToken, brandServices.updateBrand)

export default router

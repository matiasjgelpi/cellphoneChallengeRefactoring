import { Router } from 'express'
import brandServices from '../services/brandServices'

const router = Router()

router.post('/brand', brandServices.postBrand)
router.get('/brands', brandServices.getAllBrands)
router.get('/brand/:id', brandServices.getBrand)
router.delete('/brand/:id', brandServices.deleteBrand)
router.put('/brand/:id', brandServices.updateBrand)

export default router

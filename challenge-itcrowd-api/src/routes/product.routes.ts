import { Router } from 'express'
import productServices from '../services/productServices'
import { verifyToken } from '../utils/verifyToken'

const router = Router()

router.post('/product',verifyToken, productServices.postProduct)
router.get('/products', productServices.getAllProducts)
router.get('/product/:id', productServices.getProduct)
router.get('/products/:brandId', productServices.getProductsByBrand)
router.delete('/product/:id',verifyToken, productServices.deleteProduct)
router.put('/product/:id', verifyToken, productServices.updateProduct)

export default router

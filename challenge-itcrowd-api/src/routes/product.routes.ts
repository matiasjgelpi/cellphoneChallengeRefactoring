import { Router } from 'express'
import productServices from '../services/productServices'

const router = Router()

router.post('/product', productServices.postProduct)
router.get('/products', productServices.getAllProducts)
router.get('/product/:id', productServices.getProduct)
router.get('/products/:brandId', productServices.getProductsByBrand)
router.delete('/product/:id', productServices.deleteProduct)
router.put('/product/:id', productServices.updateProduct)

export default router

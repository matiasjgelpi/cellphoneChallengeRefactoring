import ProductModel from '../database/models/productModel'
import BrandModel from '../database/models/brandModel'
import { validateNewProduct, validateUpdateProduct } from '../utils/parsers'
import { parseIds } from '../utils/typeValidators'

const getAllProducts = (_req: any, res: any): any => {
  void (async () => {
    try {
      const products = await ProductModel.find({}, 'name image_url price')
      return res.send(products)
    } catch (error: any) {
      return res.status(400).send({ msg: error.toString() })
    }
  })()
}

const getProduct = (req: any, res: any): any => {
  void (async () => {
    try {
      const { id } = req.params
      parseIds(id, 'id')

      const product = await ProductModel.findById(id).populate({
        path: 'brand',
        model: BrandModel
      })
      return res.send(product)
    } catch (error: any) {
      return res.status(400).send({ msg: error.toString() })
    }
  })()
}

const getProductsByBrand = (req: any, res: any): any => {
  void (async () => {
    try {
      const { brandId } = req.params
      parseIds(brandId, 'brandId')

      const products = await ProductModel.find({ brand: brandId }).populate({
        path: 'brand',
        model: BrandModel
      })

      if (products.length === 0) {
        return res.status(400).send({ msg: 'No products with this brand found' })
      }
      return res.send(products)
    } catch (error: any) {
      return res.status(400).send({ msg: error.toString() })
    }
  })()
}

const postProduct = (req: any, res: any): any => {
  void (async () => {
    try {
      const validatedRequestBody = validateNewProduct(req.body)
      const product = await ProductModel.create(validatedRequestBody)
      return res.send(product)
    } catch (error: any) {
      return res.status(400).send({ msg: error.toString() })
    }
  })()
}

const deleteProduct = (req: any, res: any): any => {
  void (async () => {
    try {
      const { id } = req.params
      parseIds(id, 'id')

      const deletedProduct = await ProductModel.deleteOne({ _id: id })
      return res.send({ msg: `${deletedProduct.deletedCount} document deleted` })
    } catch (error: any) {
      return res.status(400).send({ msg: error.toString() })
    }
  })()
}

const updateProduct = (req: any, res: any): any => {
  void (async () => {
    try {
      const { id } = req.params
      parseIds(id, 'id')

      const validatedRequestBody = validateUpdateProduct(req.body)

      const updatedProduct = await ProductModel.findByIdAndUpdate(id, validatedRequestBody, { new: true })
      return res.send({ product_updated: updatedProduct })
    } catch (error: any) {
      return res.status(400).send({ msg: error.toString() })
    }
  })()
}

const productServices = {
  getAllProducts,
  getProductsByBrand,
  getProduct,
  postProduct,
  deleteProduct,
  updateProduct
}

export default productServices

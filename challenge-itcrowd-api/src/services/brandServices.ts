import BrandModel from '../database/models/brandModel'
import { parseIds } from '../utils/typeValidators'
import { validateNewBrand, validateUpdateBrand } from '../utils/parsers'

const getAllBrands = (_req: any, res: any): any => {
  void (async () => {
    try {
      const brands = await BrandModel.find({})
      return res.json(brands)
    } catch (error: any) {
      return res.status(400).send({ msg: error.toString() })
    }
  })()
}

const getBrand = (req: any, res: any): any => {
  void (async () => {
    try {
      const { id } = req.params
      parseIds(id, 'id')

      const brand = await BrandModel.findById(id)
      return res.send(brand)
    } catch (error: any) {
      return res.status(400).send({ msg: error.toString() })
    }
  })()
}

const postBrand = (req: any, res: any): any => {
  void (async () => {
    try {
      const validatedRequestBody = validateNewBrand(req.body)
      const brand = await BrandModel.create(validatedRequestBody)
      return res.send(brand)
    } catch (error: any) {
      return res.status(400).send({ msg: error.toString() })
    }
  })()
}

const deleteBrand = (req: any, res: any): any => {
  void (async () => {
    try {
      const { id } = req.params
      parseIds(id, 'id')

      const deletedBrand = await BrandModel.deleteOne({ _id: id })
      return res.send({ msg: `${deletedBrand.deletedCount} document deleted` })
    } catch (error: any) {
      return res.status(400).send({ msg: error.toString() })
    }
  })()
}

const updateBrand = (req: any, res: any): any => {
  void (async () => {
    try {
      const { id } = req.params
      parseIds(id, 'id')

      const validatedRequestBody = validateUpdateBrand(req.body)
      const updatedBrand = await BrandModel.findByIdAndUpdate(id, validatedRequestBody, {
        new: true
      })
      return res.send({ brand_updated: updatedBrand })
    } catch (error: any) {
      return res.status(400).send({ msg: error.toString() })
    }
  })()
}

const brandServices = {
  getAllBrands,
  getBrand,
  postBrand,
  deleteBrand,
  updateBrand
}

export default brandServices

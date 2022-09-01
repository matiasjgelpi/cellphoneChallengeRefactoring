import { model, Schema } from 'mongoose'
import { Product } from '../../types/types'

const productSchema = new Schema<Product>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image_url: { type: String, required: true },
  price: { type: Number, required: true },
  brand: { type: Schema.Types.ObjectId, ref: 'BrandModel' }
})

productSchema.set('toJSON', {
  transform: (_doc, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject?.brand?.id
  }
})

const ProductModel = model<Product>('Product', productSchema)

export default ProductModel

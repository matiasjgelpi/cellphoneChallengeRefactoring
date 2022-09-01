import { model, Schema } from 'mongoose'
import { Brand } from '../../types/types'

const brandSchema = new Schema<Brand>({
  name: { type: String, required: true },
  logo_url: { type: String, required: true }
})

brandSchema.set('toJSON', {
  transform: (_doc, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})
const BrandModel = model<Brand>('Brand', brandSchema)

export default BrandModel

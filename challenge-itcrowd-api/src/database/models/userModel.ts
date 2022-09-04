import { model, Schema } from 'mongoose'
import { User } from '../../types/types'

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  isAdministrator: { type: Boolean, required: true }
})

userSchema.set('toJSON', {
  transform: (_doc, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const UserModel = model<User>('User', userSchema)

export default UserModel

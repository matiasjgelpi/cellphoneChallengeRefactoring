import UserModel from '../database/models/userModel'

const postUser = async (req: any, res: any): Promise<any> => {
  try {
    const { name, email, password } = req.body
    const newUser = {
      name,
      email,
      passwordHash: password
    }

    const user = await UserModel.create(newUser)
    return res.send(user)
  } catch (error: any) {
    return res.status(400).send({ msg: error.toString() })
  }
}

const userServices = {
  postUser
}

export default userServices

import 'dotenv/config'
import UserModel from '../database/models/userModel'
import jwt from 'jsonwebtoken'

// const secret = process.env.SECRET_KEY

const postUser = (req: any, res: any): any => {
  void (async () => {
    try {
      const { name, email, isAdministrator } = req.body

      let user = await UserModel.findOne({ email: email })

      if (user === null) {
        const newUser = {
          name,
          email,
          isAdministrator
        }
        user = await UserModel.create(newUser)
      }

      const token = jwt.sign(
        { name: user.name, email: user.email, isAdministrator: user.isAdministrator },
        'secret',
        { expiresIn: '2h' }

      )

      return res.send({ user, token })
    } catch (error: any) {
      return res.status(400).send({ msg: error.toString() })
    }
  })()
}

const userServices = {
  postUser
}

export default userServices

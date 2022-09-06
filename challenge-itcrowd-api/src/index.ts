import 'dotenv/config'
import express from 'express'
import { connectDb } from './database/dbConnection'
import ProductRoutes from './routes/product.routes'
import BrandRoutes from './routes/brand.routes'
import UserRoutes from './routes/user.routes'
// import { verifyToken } from './utils/verifyToken'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cors = require('cors')

const corsOptions = {
  origin: ['https://www.thunderclient.io', 'http://localhost:3000']
}

connectDb()

const app = express()
app.use(express.json())
app.use(cors(corsOptions))

app.use('/', ProductRoutes)
app.use('/', BrandRoutes)
app.use('/', UserRoutes)

app.use('/', (_, res) => {
  return res.status(404).send({ msg: 'resource not found' })
})

const host = ((process.env.HOST !== undefined) && process.env.HOST) || 'localhost'
const port =
  (process.env.PORT !== undefined &&
    parseInt(process.env.PORT)) ||
    4000

app.listen(port, host, () => {
  console.log(`Server started on port ${port}`)
})

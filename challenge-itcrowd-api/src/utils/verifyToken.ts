import jwt from 'jsonwebtoken'

export const verifyToken = (req: any, res: any, next: any): any => {
  const authHeader = req.headers.authorization
  const token = authHeader !== undefined ? authHeader.split(' ')[1] : null

  if (token === null) {
    return res.status(401).send('Token requerido')
  }
  jwt.verify(token, 'secret', (err: any, user: any) => {
    console.log(err)
    if (err !== null) return res.status(403).send('Token invalido')
    console.log(err)
    req.user = user
    next()
  })
}

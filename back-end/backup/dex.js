import express from 'express'
import jwt from 'jsonwebtoken'
import { PORT, SECRET_JWT_KEY } from './config.js'
import { UserRepository } from './user-repository.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.set('view engine', 'ejs')

app.use(express.json())
app.use(cookieParser())

app.use((req, res, next) => {
  const token = req.cookies.access_token
  req.session = { user: null }

  try {
    const data = jwt.verify(token, SECRET_JWT_KEY)
    req.session.user = data
  } catch {}

  next()
})


app.get('/'), (req, res) => {
  const { user } = req.session
  res.render('index', user)
}
  
  //try {
    //const data = jwt.verify(token, SECRET_JWT_KEY)
    //res.render('protected', data)
  //} catch (error) {
    //res.render('index')
  //})
 
app.post('/login', async (req, res) => {
  const { username, password } = req.body
  
  try {
    const user = await UserRepository.login({ username, password })
    const token = jwt.sign(
      { id: user._id, username: user.username },
       SECRET_JWT_KEY,
      { 
        expiresIn: '1h' 
      })
    res
    .cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60
    })
    .send({user, token})
  } catch (error) {
    res.status(401).send( error.message ) 
  }
})

app.post('/logout', (req, res) => {
  res 
  .clearCookie('access_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  }) 
  .json({ message: 'Sesión cerrada '})
})

app.post('/register', async  (req, res) => {
    const { username, password } = req.body
    console.log(req.body)

    try {
        const id = await UserRepository.create({ username, password })
        res.send({ id })
    } catch (error) {
        res.status(400).send({ error: error.message }) 
    }
})


app.get('/protected', (req, res) => {
  const { user } = req.session
  if (!user) return res.status(403).send('Access not authorized')
    res.render('protected', user)
})

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})

//app.post('/tareas', requireSuperuser, (req, res) => {

  //})
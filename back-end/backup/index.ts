import express from 'express'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { PORT, SECRET_JWT_KEY } from './config.js'
import { UserRepository } from './user-repository.js'
import { query } from './db.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { verifyToken } from './middlewares/verifyToken.ts'

const app = express()

const verifyToken = require('./middlewares/verifyToken')

// Middlewares
app.use(cors({ origin: 'http://localhost:5174', credentials: true }))
app.use(express.json())
app.use(cookieParser())

/**
 * Middleware para autenticar mediante JWT en cookies.
 * Establece req.user con id, username y role si el token es válido.
 */
function authenticate(req, res, next) {
  const token = req.cookies.access_token
  if (!token) return next()

  try {
    const data = jwt.verify(token, SECRET_JWT_KEY)
    req.user = data
  } catch {
    req.user = null
  }
  next()
}

/**
 * Middleware para autorizar rutas por rol.
 * Uso: authorizeRoles('admin', 'employee')
 */
function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    const role = req.user?.role
    if (!role || !allowedRoles.includes(role)) {
      return res.status(403).json({ message: 'Access denied' })
    }
    next()
  }
}

app.use(authenticate)

// Ruta pública: Home
app.get('/', (req, res) => {
  res.render('index', { user: req.user })
})

// Registro de usuarios (solo admin puede crear nuevos usuarios)
app.post('/register', authorizeRoles('admin'), async (req, res) => {
  const { username, password, role } = req.body
  try {
    const newRole = role === 'admin' ? 'admin' : 'employee'
    const user = await UserRepository.create({ username, password, role: newRole })
    res.status(201).json(user)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Login de usuarios
app.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await UserRepository.login({ username, password })
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      SECRET_JWT_KEY,
      { expiresIn: '1h' }
    )
    res.cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60
      })
    
      // Agregar la cookie del rol
    res.json({
      user: {
        username: user.username,
        role: user.role
      },
      message: 'Sesión iniciada correctamente',
    });

  } catch (error) {
    res.status(401).json({ error: error.message })
  }
});

app.get('/me', verifyToken, (req, res) => {
  const { id, username, role } = req.user;
  res.json({ user: { id, username, role } });
});

// Logout de usuarios
app.post('/logout', (req, res) => {
  res
    .clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    })
    .json({ message: 'Sesión cerrada' })
})

// Ruta protegida genérica (admin y employee pueden acceder)
app.get('/protected', authorizeRoles('admin', 'employee'), (req, res) => {
  res.render('protected', { user: req.user })
})

// --- Endpoints para la gestión de tareas ---

// Crear una nueva tarea (solo admin)
app.post('/admin/tareas', authorizeRoles('admin'), async (req, res) => {
  const { title, assignedTo, dueAt } = req.body
  try {
    const { rows } = await query(
      'INSERT INTO tareas (title, assigned_to, due_at) VALUES ($1, $2, $3) RETURNING *',
      [title, assignedTo, dueAt]
    )
    res.status(201).json(rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Listar todas las tareas (solo admin)
app.get('/admin/tareas', authorizeRoles('admin'), async (req, res) => {
  try {
    const { rows } = await query(
      'SELECT id, title, assigned_to, status, created_at, due_at FROM tareas ORDER BY created_at DESC',
      []
    )
    res.json(rows)
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo tareas' })
  }
})

// Listar tareas asignadas al empleado logueado (solo employee)
app.get('/employee/tareas', authorizeRoles('employee'), async (req, res) => {
  try {
    const { rows } = await query(
      'SELECT id, title, status, created_at, due_at FROM tareas WHERE assigned_to = $1',
      [req.user.username]
    )
    res.json(rows)
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo tareas' })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})
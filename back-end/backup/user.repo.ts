import bcrypt from 'bcrypt'
import { SALT_ROUNDS } from '../config/environment'
import { query } from '../db/index'
export class UserRepository {
  /**
   * Crea un usuario con rol opcional ('admin' o 'employee').
   */
  static async create({ username, password, role = 'employee' }) {
    Validation.username(username)
    Validation.password(password)
    Validation.role(role)

    const existing = await query('SELECT * FROM users WHERE username = $1', [username])
    if (existing.rows.length > 0) {
      throw new Error('El nombre de usuario ya existe, elija otro por favor')
    }

    const id = crypto.randomUUID()
    const hashedPassword = await bcrypt.hash(password, Number(SALT_ROUNDS))

    await query(
      'INSERT INTO users (id, username, password, role) VALUES ($1, $2, $3, $4)',
      [id, username, hashedPassword, role]
    )

    return { id, username, role }
  }

  /**
   * Valida credenciales y retorna información pública (sin password).
   */
  static async login({ username, password }) {
    Validation.username(username)
    Validation.password(password)

    const result = await query('SELECT * FROM users WHERE username = $1', [username])
    const user = result.rows[0]

    if (!user) throw new Error('username does not exist')

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) throw new Error('password is incorrect')

    const { password: _, ...publicUser } = user
    return publicUser
  }
}

class Validation {
    static username(username) {
      if (typeof username !== 'string') throw new Error('username must be a string')
      if (username.length < 3) throw new Error('El nombre de usuario debe tener al menos 3 caracteres')
    }
  
    static password(password) {
      if (typeof password !== 'string') throw new Error('password must be a string')
      if (password.length < 6) throw new Error('La contraseña debe tener al menos 6 caracteres')
    }
  
    static role(role) {
      const allowed = ['admin', 'employee']
      if (!allowed.includes(role)) {
        throw new Error(`role must be one of: ${allowed.join(', ')}`)
      }
    }
  }
type Role = 'admin' | 'employee'

export interface User {
    id: string,
    username: string
    password: string,
    role: Role
}

export interface UserCredentials {
    username: string,
    password: string
}
import { Role } from './role'

export interface User {
  cognome: string
  email: string
  id: number
  nome: string
  password: string
  roles: Role[]
  username: string
}
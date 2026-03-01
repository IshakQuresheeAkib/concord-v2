// types/user.ts

export type UserRole = 'user' | 'admin'

export interface User {
  _id: string
  name: string
  email: string
  photoURL?: string
  role: UserRole
  isPremium: boolean
  createdAt: Date
}

export interface AuthUser {
  id: string
  email: string
  name: string
  image?: string
  role: UserRole
}
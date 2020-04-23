import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { User } from '../models'
import { getEnv } from '../Env'

export function generateJwt(user: User): string {
  return jwt.sign({ userId: user.id, roleId: user.roleId }, getEnv().JwtSecret, { expiresIn: '1 day' })
}

export function generateRefreshToken(): string {
  return jwt.sign({}, getEnv().JwtSecret, { expiresIn: '30 days' })
}

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, getEnv().SaltRounds)
}

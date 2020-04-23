import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { User } from '../models'
import { getEnv } from '../Env'

export function generateAccessToken(user: User): string {
  const { AccessTokenExpirationTime, JwtSecret } = getEnv()
  return jwt.sign(
    { userId: user.id, roleId: user.roleId },
    JwtSecret,
    { expiresIn: AccessTokenExpirationTime },
  )
}

export function generateRefreshToken(): string {
  const { JwtSecret, RefreshTokenExpirationTime } = getEnv()
  return jwt.sign({}, JwtSecret, { expiresIn: RefreshTokenExpirationTime })
}

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, getEnv().SaltRounds)
}

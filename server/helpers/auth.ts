import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import ms from 'ms'
import { v4 as uuid } from 'uuid'

import { User } from '../models'
import { getEnv } from '../Env'
import { Request } from 'express'

interface TokenPayload {
  iat: number
  exp: number
}

export interface AccessTokenPayload extends TokenPayload {
  userId: string
  roleId: string
}

export interface RefreshTokenPayload extends TokenPayload {
  uuid: string
}

export function generateAccessToken(user: User): string {
  const { AccessTokenExpirationTime, JwtSecret } = getEnv()
  return jwt.sign(
    {
      userId: user.id,
      roleId: user.roleId,
    },
    JwtSecret,
    {
      expiresIn: AccessTokenExpirationTime,
    },
  )
}

export function generateRefreshToken(): string {
  const { JwtSecret, RefreshTokenExpirationTime } = getEnv()
  return jwt.sign(
    {
      uuid: uuid(),
    },
    JwtSecret,
    {
      expiresIn: RefreshTokenExpirationTime,
    }
  )
}

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, getEnv().SaltRounds)
}

export function setRefreshTokenCookie(req: Request): void {
  // eslint-disable-next-line no-unused-expressions
  req.res?.cookie('refreshToken', generateRefreshToken(), {
    httpOnly: true,
    maxAge: ms(getEnv().RefreshTokenExpirationTime),
  })
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  return verifyToken(token)
}

export function verifyRefreshToken(token: string): RefreshTokenPayload {
  return verifyToken(token)
}

function verifyToken<T extends TokenPayload>(token: string): T {
  return jwt.verify(token, getEnv().JwtSecret) as T
}

import bcrypt from 'bcrypt'

import { getEnv } from '../Env'

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, getEnv().saltRounds)
}

import { RequestHandler } from 'express'
import { TokenExpiredError } from 'jsonwebtoken'

import { AccessTokenState } from './helpers/auth'
import { DataProvider } from './DataProvider'
import { RequestUserInfo } from './models/User'
import { verifyAccessToken } from './helpers/auth'

export const parseAccessToken: RequestHandler = (req, res, next) => {
  const accessToken = req.headers.authorization?.split(' ')[1]
  let accessTokenState = AccessTokenState.NotPresent
  let userInfo: RequestUserInfo | null = null

  if (accessToken !== undefined) {
    let payload

    try {
      payload = verifyAccessToken(accessToken)
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        accessTokenState = AccessTokenState.Expired
      } else {
        accessTokenState = AccessTokenState.Invalid
      }
    }

    if (payload !== undefined) {
      accessTokenState = AccessTokenState.Valid

      userInfo = {
        permissions: DataProvider.getUserRoleById(payload.roleId).permissions,
        ...payload,
      }
    }
  }

  req.accessTokenState = accessTokenState
  req.userInfo = userInfo
  next()
}

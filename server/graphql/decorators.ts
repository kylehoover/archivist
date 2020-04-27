import { Request } from 'express'
import { createMethodDecorator, createParamDecorator } from 'type-graphql'

import { PermissionName } from '../models/UserRole'
import { UnauthorizedError } from './errors'

export { RequestUserInfo } from '../models/User'

export function Authorized(...requiredPermissions: PermissionName[]): MethodDecorator {
  return createMethodDecorator<Request>(({ context }, next) => {
    const { accessTokenState, userInfo } = context

    if (userInfo === null) {
      throw new UnauthorizedError(accessTokenState)
    }

    requiredPermissions.forEach(permission => {
      if (!userInfo.permissions[permission]) {
        throw new UnauthorizedError(accessTokenState)
      }
    })

    return next()
  })
}

export function CurrentUser(): ParameterDecorator {
  return createParamDecorator<Request>(({ context }) => context.userInfo)
}

export function NotLoggedIn(): MethodDecorator {
  return createMethodDecorator<Request>(({ context }, next) => {
    if (context.userInfo !== null) {
      throw new Error('User already logged in')
    }

    return next()
  })
}

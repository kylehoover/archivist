import { Request } from 'express'
import { createMethodDecorator, createParamDecorator } from 'type-graphql'

import { PermissionName } from '../models/UserRole'

export { RequestUserInfo } from '../models/User'

export function Authorized(...requiredPermissions: PermissionName[]): MethodDecorator {
  return createMethodDecorator<Request>(({ context }, next) => {
    const { user } = context

    if (user === null) {
      throw new Error('Unauthorized')
    }

    requiredPermissions.forEach(permission => {
      if (!user.permissions[permission]) {
        throw new Error('Unauthorized')
      }
    })

    return next()
  })
}

export function CurrentUser(): ParameterDecorator {
  return createParamDecorator<Request>(({ context }) => context.user)
}

export function NotLoggedIn(): MethodDecorator {
  return createMethodDecorator<Request>(({ context }, next) => {
    if (context.user !== null) {
      throw new Error('User already logged in')
    }

    return next()
  })
}

import React from 'react'

import { Container } from '../Container'
import { PermissionName } from '../../models'
import { useStores } from '../../stores'

type Props = {
  children: JSX.Element
  requiredPermissions?: PermissionName[]
  type?: 'hideContent' | 'route'
}

const UnauthorizedRoute = () => {
  return (
    <Container className='UnauthorizedRoute mt-4' maxWidth={40} centered>
      <h1>
        Unauthorized Access
      </h1>
      <p>
        You are not authorized to access this route. Click <a href='/'>here</a> to go to our home page.
      </p>
    </Container>
  )
}

const Authorized = ({
  children,
  requiredPermissions = [],
  type = 'route',
}: Props) => {
  const { userStore } = useStores()
  const { currentUser } = userStore
  let authorized = true

  if (currentUser === undefined) {
    authorized = false
  } else {
    for (let permissionName of requiredPermissions) {
      if (!currentUser.permissions[permissionName]) {
        authorized = false
        break
      }
    }
  }

  if (!authorized) {
    switch(type) {
      case 'route':
        return <UnauthorizedRoute />
      case 'hideContent':
      default:
        return null
    }
  }

  return children
}

export default Authorized

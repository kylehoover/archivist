import { registerEnumType } from 'type-graphql'

enum Role {
  Admin = 'admin',
  Owner = 'owner',
  User = 'user',
}

registerEnumType(Role, { name: 'Role' })

export default Role

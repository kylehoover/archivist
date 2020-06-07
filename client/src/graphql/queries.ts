import { GetCurrentUserData, GetUsersData, UserType } from './types'
import { authenticatedRequest, request } from './util'

export const getCurrentUser = async (): Promise<UserType> => {
  const query = `
    query GetCurrentUser {
      currentUser {
        id
        name
        permissions {
          name
          value
        }
      }
    }
  `

  const data: GetCurrentUserData = await authenticatedRequest(query)
  return data.currentUser
}

export const getUsers = async (): Promise<UserType[]> => {
  const query = `
    query GetUsers {
      users {
        id
        name
      }
    }
  `

  const data: GetUsersData = await request(query)
  return data.users
}

import { UsersResponse } from './types'
import { request } from './util'

export const getUsers = async () => {
  const query = `
    query GetUsers {
      users {
        id
        name
      }
    }
  `

  const response = await request<UsersResponse>(query)
  console.log(response)
}

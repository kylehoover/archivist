import {
  LoginUserData,
  LoginUserInputType,
  RefreshTokensData,
  RefreshTokensType,
  UserType
} from './types'
import { request, setAccessToken } from './util'

export const loginUser = async (input: LoginUserInputType): Promise<UserType> => {
  const mutation = `
    mutation LoginUser($input: LoginUserInputType!) {
      loginUser(input: $input) {
        accessToken
        user {
          id
          email
          name
          permissions {
            name
            value
          }
        }
      }
    }
  `

  const data: LoginUserData = await request(mutation, { input })
  setAccessToken(data.loginUser.accessToken)
  return data.loginUser.user
}

export const refreshTokens = async (): Promise<RefreshTokensType> => {
  const mutation = `
    mutation RefreshTokens {
      refreshTokens {
        accessToken
      }
    }
  `

  const data: RefreshTokensData = await request(mutation)
  return data.refreshTokens
}

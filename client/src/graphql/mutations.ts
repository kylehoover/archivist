import {
  LoginUserData,
  LoginUserInputType,
  RefreshTokensData,
  RefreshTokensType,
  UserType
} from './types'
import { clearAccessToken, request, setAccessToken, authenticatedRequest } from './request'

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

export const logoutUser = async (): Promise<void> => {
  const mutation = `
    mutation LogoutUser {
      logoutUser
    }
  `

  await authenticatedRequest(mutation)
  clearAccessToken()
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

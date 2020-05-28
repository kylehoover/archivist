import { RefreshTokensResponse, Response } from './types'
import { request } from './util'

export const refreshTokens = async (): Promise<Response<RefreshTokensResponse>> => {
  const mutation = `
    mutation RefreshTokens {
      refreshTokens {
        accessToken
      }
    }
  `

  return request<RefreshTokensResponse>(mutation)
}
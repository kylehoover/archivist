import { RefreshTokensData, RefreshTokensType } from './types'
import { request } from './util'

export const refreshTokens = async (): Promise<RefreshTokensType> => {
  const mutation = `
    mutation RefreshTokens {
      refreshTokens {
        accessToken
      }
    }
  `

  const data = await request<RefreshTokensData>(mutation)
  return data.refreshTokens
}

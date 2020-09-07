import axios, { AxiosRequestConfig } from 'axios'

import { AccessTokenState, GraphQLVariables, RequestErrorType } from './types'
import { AuthenticationRequiredError, RequestError } from './errors'
import { refreshTokens } from './mutations'

let accessToken: string | undefined = undefined

export const authenticatedRequest = async<T>(
  query: string,
  variables?: GraphQLVariables,
): Promise<T> => {
  console.log('authenticatedRequest')
  if (accessToken === undefined) {
    return authenticatedRequestAccessTokenMissing<T>(query, variables)
  }

  return authenticatedRequestAccessTokenPresent<T>(query, variables)
}

export const request = async <T>(
  query: string,
  variables?: GraphQLVariables,
): Promise<T> => {
  console.log('request')
  let response

  try {
    response = await axios.post('/graphql', { query, variables }, getRequestConfig())
  } catch (err) {
    response = err.response
  }

  console.log(response.data)
  const { data, errors } = response.data

  if (errors?.length > 0) {
    throw new RequestError(
      errors[0]?.extensions?.errorType ?? RequestErrorType.Unknown,
      errors[0].message,
      errors[0]?.extensions?.accessTokenState,
    )
  }

  return data as T
}

export const clearAccessToken = (): void => {
  accessToken = undefined
}

export const setAccessToken = (token: string): void => {
  accessToken = token
}

// Helpers //

const authenticatedRequestAccessTokenMissing = async<T>(
  query: string,
  variables?: GraphQLVariables,
): Promise<T> => {
  console.log('accessToken: MISSING')
  await refreshTokensOrThrow()
  return request<T>(query, variables)
}

const authenticatedRequestAccessTokenPresent = async<T>(
  query: string,
  variables?: GraphQLVariables,
): Promise<T> => {
  console.log('accessToken: PRESENT')
  try {
    return request<T>(query, variables)
  } catch (error) {
    if (!(error instanceof RequestError) || !shouldRefreshTokens(error)) {
      throw error
    }
  }

  await refreshTokensOrThrow()
  return request<T>(query, variables)
}

const getRequestConfig = (): AxiosRequestConfig | undefined => {
  return accessToken === undefined ? undefined : {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }
}

const refreshTokensOrThrow = async (): Promise<void> => {
  console.log('refreshTokensOrThrow')
  let data

  try {
    data = await refreshTokens()
  } catch (error) {
    // refresh token either isn't present or isn't valid; the user will need to log in before
    // any authenticated requests should be attempted again
    console.log('Failed to refresh tokens')
    throw new AuthenticationRequiredError()
  }

  console.log('Successfully refreshed tokens')
  accessToken = data.accessToken
}

const shouldRefreshTokens = (error: RequestError): boolean => {
  return error.type === RequestErrorType.Unauthorized && (
    error.accessTokenState === AccessTokenState.Expired ||
    error.accessTokenState === AccessTokenState.Invalid
  )
}

import axios from 'axios'

import { AccessTokenState, GraphQLVariables, Response, ServerError, ServerErrorType } from './types'
import { refreshTokens } from './mutations'

let accessToken: string | undefined = undefined

// TODO: try creating function type for all of these functions

export const authenticatedRequest = async<T>(
  query: string,
  variables?: GraphQLVariables,
): Promise<Response<T>> => {
  if (accessToken === undefined) {
    return authenticatedRequestMissingAccessToken<T>(query, variables)
  }

  return authenticatedRequestHasAccessToken<T>(query, variables)
}

export const request = async <T>(
  query: string,
  variables?: GraphQLVariables,
): Promise<Response<T>> => {
  let resp

  try {
    resp = await axios.post('/graphql', { query, variables })
  } catch (err) {
    resp = err.response
  }

  const { data, errors } = resp.data

  const serverErrors: ServerError[] = errors?.map((error: any) => ({
    accessTokenState: error?.extensions?.accessTokenState,
    message: error.message,
    type: error?.extensions?.errorType,
  })) ?? []

  return {
    data: data ?? null,
    errors: serverErrors,
    hasError: serverErrors.length > 0
  }
}

// Helpers //

const authenticatedRequestHasAccessToken = async<T>(
  query: string,
  variables?: GraphQLVariables,
): Promise<Response<T>> => {
  // need to add Authorization header
  const response = await request<T>(query, variables)

  if (!shouldRefreshTokens(response)) {
    return response
  }

  await refreshTokensOrThrow()

  // need to add Authorization header
  return request<T>(query, variables)
}

const authenticatedRequestMissingAccessToken = async<T>(
  query: string,
  variables?: GraphQLVariables,
): Promise<Response<T>> => {
  await refreshTokensOrThrow()

  // need to add Authorization header
  return request<T>(query, variables)
}

const refreshTokensOrThrow = async (): Promise<void> => {
  const response = await refreshTokens()

  if (response.hasError) {
    // refresh token either isn't present or isn't valid; the user will need to log in before
    // any authenticated requests should be attempted again
    throw new Error('User is not authenticated')
  }

  accessToken = response.data?.refreshTokens.accessToken
}

const shouldRefreshTokens = (response: Response<any>): boolean => {
  if (response.hasError) {
    response.errors.forEach(error => {
      if (error.type === ServerErrorType.Unauthorized && (
        error.accessTokenState === AccessTokenState.Expired ||
        error.accessTokenState === AccessTokenState.Invalid
      )) {
        return true
      }
    })
  }

  return false
}

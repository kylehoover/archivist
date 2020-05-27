import axios from 'axios'

export enum ServerErrorType {
  InvalidCredentials = 'invalidCredentials',
  Unknown = 'unknown',
  Validation = 'validation',
}

type GraphQLVariables = Record<string, any>

type ServerError = {
  message?: string
  type: ServerErrorType
}

type Response<T> = {
  data: T | null
  errors: ServerError[] | null
}

export const request = async <T>(query: string, variables?: GraphQLVariables): Promise<Response<T>> => {
  let resp

  try {
    resp = await axios.post('/graphql', { query, variables })
  } catch (err) {
    resp = err.response
  }

  const errors: ServerError[] | null = resp.data.errors?.map((error: any) => ({
    message: error.message,
    type: getServerErrorType(error?.extensions?.errorType),
  })) ?? null

  return {
    data: resp.data.data,
    errors,
  }
}

// Helpers //

const serverErrorTypesMap: Record<string, ServerErrorType> = {
  [ServerErrorType.InvalidCredentials]: ServerErrorType.InvalidCredentials,
  [ServerErrorType.Unknown]: ServerErrorType.Unknown,
  [ServerErrorType.Validation]: ServerErrorType.Validation,
}

const getServerErrorType = (errorType?: string): ServerErrorType => {
  return errorType === undefined ?
    ServerErrorType.Unknown :
    serverErrorTypesMap[errorType] ?? ServerErrorType.Unknown
}

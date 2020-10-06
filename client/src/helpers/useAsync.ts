import { useCallback, useMemo, useState } from 'react'

type AsyncStatus = 'error' | 'idle' | 'pending' | 'success'
type ResultError = Error | null

export class Result<T> {
  constructor(
    public readonly data: T | null,
    public readonly error: ResultError,
    public readonly status: AsyncStatus,
  ) {}

  public get isError(): boolean {
    return this.status === 'error'
  }

  public get isIdle(): boolean {
    return this.status === 'idle'
  }

  public get isPending(): boolean {
    return this.status === 'pending'
  }

  public get isSuccess(): boolean {
    return this.status === 'success'
  }
}

export const useAsync = <Args extends any[], ReturnType>(
  asyncFn: (...args: Args) => Promise<ReturnType>,
) => {
  const [data, setData] = useState<ReturnType | null>(null)
  const [error, setError] = useState<ResultError>(null)
  const [status, setStatus] = useState<AsyncStatus>('idle')
  const result = useMemo(() => new Result(data, error, status), [data, error, status])

  const execute = useCallback(async (...args: Args) => {
    let localData: ReturnType | null = null
    let localError: ResultError = null
    let localStatus: AsyncStatus = 'pending'
    setData(localData)
    setError(localError)
    setStatus(localStatus)

    try {
      const response = await asyncFn(...args)
      localData = response === undefined ? null : response
      localStatus = 'success'
    } catch (error) {
      // TODO: show generic toast when generic server error
      localError = error
      localStatus = 'error'
      console.log(error)
    }

    setData(localData)
    setError(localError)
    setStatus(localStatus)

    return new Result(localData, localError, localStatus)
  }, [asyncFn])

  return [execute, result] as const
}

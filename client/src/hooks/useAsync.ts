import { useState } from 'react'

type AsyncStatus = 'error' | 'idle' | 'pending' | 'success'

const useAsync = <T, E>(
  asyncFunction: (...args: any[]) => Promise<T>,
) => {
  const [error, setError] = useState<E | null>(null)
  const [status, setStatus] = useState<AsyncStatus>('idle')
  const [value, setValue] = useState<T | null>(null)
  const hasError = status === 'error'
  const isPending = status === 'pending'
  const isSuccess = status === 'success'

  const execute = async (...args: any[]) => {
    setError(null)
    setStatus('pending')
    setValue(null)

    try {
      const response = await asyncFunction(...args)
      setStatus('success')
      setValue(response)
    } catch (error) {
      setError(error)
      setStatus('error')

      // TODO: show generic toast when generic server error
    }
  }

  return {
    error,
    execute,
    hasError,
    isPending,
    isSuccess,
    status,
    value,
  }
}

export default useAsync

import React from 'react'
import { Button } from '../common'

export const NotFoundView = () => {
  return (
    <div className='NotFound'>
      <h1 className='mb-2'>Page Not Found</h1>
      <p>
        Uh-oh! The page you're looking for doesn't exist.
      </p>
      <Button linkTo='/home/'>
        Take me home
      </Button>
    </div>
  )
}

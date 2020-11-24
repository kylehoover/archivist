import React from 'react'
import { useLogoutHandler } from '../../../stores'
import { LoadingIndicator } from '../../common'

export const LogoutView = () => {
  useLogoutHandler()

  return (
    <div className='LogoutView'>
      <LoadingIndicator className='row center middle height-10' size={30} />
    </div>
  )
}

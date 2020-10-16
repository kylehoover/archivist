import React from 'react'
import { useLogoutHandler } from '../../../stores'

export const LogoutView = () => {
  useLogoutHandler()

  return (
    <div className='LogoutView'>
      <p>Logging out . . .</p>
    </div>
  )
}

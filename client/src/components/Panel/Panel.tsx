import React from 'react'

import './Panel.scss'

const Panel = () => {
  return (
    <div>
      <div className='Panel'>
        <header className='no-banner'>
          Panel Header
        </header>
        <div className='content'>
          Panel content
        </div>
      </div>

      <div className='Panel'>
        <div className='banner teal' />
        <header className='with-banner'>
          Panel Header
        </header>
        <div className='content'>
          Panel content
        </div>
      </div>

      <div className='Panel'>
        <div className='banner teal' />
        <header className='detached'>
          Panel Header
        </header>
        <div className='content'>
          Panel content
        </div>
      </div>
    </div>
  )
}

export default Panel

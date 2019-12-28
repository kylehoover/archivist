import React from 'react'

import './Panel.scss'

type Props = {
  title: string,
}

const Panel = ({ title }: Props) => {
  return (
    <div className='Panel'>
      <header>
        <h2 className='teal'>
          {title}
        </h2>
        <div className='actions teal-border'>
          <button>
            New
          </button>
        </div>
      </header>
      {/* <div className='banner teal' />
      <header className='with-banner teal'>
        {title}
      </header> */}
      <div className='content'>
        Panel content
      </div>
    </div>
  )
}

export default Panel

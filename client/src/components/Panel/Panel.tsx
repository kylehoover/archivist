import React from 'react'

import Button from '../Button'
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
          <Button icon='add' onClick={() => {}}>
            New
          </Button>
          <Button icon='add' onClick={() => {}} outlined>
            New
          </Button>
          <Button icon='add' onClick={() => {}} flat>
            New
          </Button>
        </div>
      </header>
      <div className='content'>
        Panel content
      </div>
    </div>
  )
}

export default Panel

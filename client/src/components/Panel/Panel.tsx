import React from 'react'

import Button from '../Button'
import './Panel.scss'

export type PanelAction = {
  callback: () => void,
  color?: string,
  icon?: string,
  label: string,
}

type Props = {
  actions?: PanelAction[],
  title: string,
}

const Panel = ({ actions = [], title }: Props) => {
  return (
    <div className='Panel'>
      <header>
        <h2 className='teal'>
          {title}
        </h2>

        <div className='actions teal-border'>
          {actions.map((action, index) => (
            <Button
              color={action.color}
              icon={action.icon}
              onClick={action.callback}
              flat
              key={index}
            >
              {action.label}
            </Button>
          ))}
        </div>
      </header>

      <div className='content'>
        Panel content
      </div>
    </div>
  )
}

export default Panel

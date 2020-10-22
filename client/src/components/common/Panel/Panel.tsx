import React from 'react'
import { Button } from '../Button'
import { MightHaveChildren } from '../../../types'
import './Panel.scss'

export type PanelAction = {
  callback: () => void,
  color?: string,
  icon?: string,
  label: string,
}

interface Props extends MightHaveChildren {
  actions?: PanelAction[],
  color: string,
  title?: string,
}

export const Panel = ({ actions = [], children, color, title }: Props) => {
  return (
    <div className='Panel'>
      <header>
        {title !== undefined &&
          <h2 className={color}>
            {title}
          </h2>
        }

        <div className={`actions ${color}-border`}>
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
        {children}
      </div>
    </div>
  )
}

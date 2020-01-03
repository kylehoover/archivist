import React from 'react'

import List, { LinkItem } from '../components/List'
import Panel, { PanelAction } from '../components/Panel'

const CampaignsPanel = () => {
  const panelActions: PanelAction[] = [
    {
      callback: () => { console.log('Add new campaign') },
      color: 'indigo',
      icon: 'add',
      label: 'New Campaign',
    },
  ]

  return (
    <Panel title='Campaigns' color='purple' actions={panelActions}>
      <List
        items={['Campaign 1', 'Campaign 2', 'Campaign 3']}
        itemsEmptyText='There are no campaigns'
        renderItem={item => (
          <LinkItem to='/home/'>
            {item}
          </LinkItem>
        )}
      />
    </Panel>
  )
}

export default CampaignsPanel

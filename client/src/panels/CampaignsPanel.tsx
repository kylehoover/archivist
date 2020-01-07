import React from 'react'

import CampaignStore from '../stores/CampaignStore'
import List, { LinkItem } from '../components/List'
import Panel, { PanelAction } from '../components/Panel'

const store = new CampaignStore()

const CampaignsPanel = () => {
  const panelActions: PanelAction[] = [
    {
      callback: store.addCampaign,
      color: 'indigo',
      icon: 'add',
      label: 'New Campaign',
    },
  ]

  return (
    <Panel title='Campaigns' color='purple' actions={panelActions}>
      <List
        items={store.campaigns}
        itemsEmptyText='There are no campaigns'
        renderItem={item => (
          <LinkItem to='/home/'>
            {item.name}
          </LinkItem>
        )}
      />
    </Panel>
  )
}

export default CampaignsPanel

import React from 'react'

import CampaignStore from '../stores/CampaignStore'
import List, { LinkItem } from '../components/List'
import Panel, { PanelAction } from '../components/Panel'
import { AddCampaignForm } from '../forms/campaign'

const store = new CampaignStore()

const CampaignsPanel = () => {
  const panelActions: PanelAction[] = [
    {
      callback: () => {},
      color: 'indigo',
      icon: 'add',
      label: 'New Campaign',
    },
  ]

  return (
    <Panel title='Campaigns' color='purple' actions={panelActions}>
      <div className='mb-1'>
        <AddCampaignForm
          onCancel={() => console.log('Cancel add campaign')}
          onSubmit={data => { store.addCampaign(data.name) }}
        />
      </div>
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

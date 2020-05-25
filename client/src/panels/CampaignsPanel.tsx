import React from 'react'

import List, { LinkItem } from '../components/List'
import Panel, { PanelAction } from '../components/Panel'
import { AddCampaignForm } from '../forms/campaign'

const panelActions: PanelAction[] = [
  {
    callback: () => console.log('New Campaign clicked'),
    color: 'indigo',
    icon: 'add',
    label: 'New Campaign',
  },
]

const CampaignsPanel = () => {
  return (
    <Panel title='Campaigns' color='purple' actions={panelActions}>
      <div className='mb-1'>
        <AddCampaignForm
          onCancel={() => console.log('Cancel add campaign')}
          onSubmit={data => { console.log(data) }}
        />
      </div>
      <List
        items={[]}
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

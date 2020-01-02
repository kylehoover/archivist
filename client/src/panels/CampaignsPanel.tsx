import React from 'react'

import List, { LinkItem } from '../components/List'
import Panel from '../components/Panel'

const CampaignsPanel = () => {
  return (
    <Panel
      title='Campaigns'
      actions={[
        {
          callback: () => { console.log('Add new campaign') },
          icon: 'add',
          label: 'New Campaign',
        },
      ]}
    >
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

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
        items={[1, 2, 3]}
        itemsEmptyText='There are no campaigns'
        renderItem={item => (
          <LinkItem to='/'>
            LinkItem
          </LinkItem>
        )}
      />
    </Panel>
  )
}

export default CampaignsPanel

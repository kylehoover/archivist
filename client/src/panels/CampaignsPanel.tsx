import React from 'react'

import List from '../components/List'
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
      <List textIfEmpty='There are no campaigns' />
    </Panel>
  )
}

export default CampaignsPanel

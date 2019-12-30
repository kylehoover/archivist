import React from 'react'
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
    />
  )
}

export default CampaignsPanel

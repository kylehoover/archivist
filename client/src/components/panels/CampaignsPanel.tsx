import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'

import { LinkItem, List, Panel, PanelAction } from '../common'

const CampaignsPanel = () => {
  const history = useHistory()

  const handleNewCampaignClicked = useCallback(() => {
    history.push('/campaign/new/')
  }, [history])

  const panelActions: PanelAction[] = [
    {
      callback: handleNewCampaignClicked,
      color: 'indigo',
      icon: 'add',
      label: 'New campaign',
    },
  ]

  return (
    <Panel title='Campaigns' color='purple' actions={panelActions}>
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

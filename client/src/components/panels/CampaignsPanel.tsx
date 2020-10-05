import React, { useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { useHistory } from 'react-router-dom'

import { LinkItem, List, Panel, PanelAction } from '../common'
import { useCampaignsLoader, useCampaignStore } from '../../stores'

const CampaignsPanel = observer(() => {
  const { campaignsList } = useCampaignStore()
  const history = useHistory()
  useCampaignsLoader()

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
        items={campaignsList}
        itemsEmptyText='There are no campaigns'
        renderItem={item => (
          <LinkItem to={`/campaign/${item.id}/`}>
            {item.name}
          </LinkItem>
        )}
      />
    </Panel>
  )
})

export default CampaignsPanel

import React from 'react'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import { Panel } from '../../common'
import { IdParam } from '../../../types'
import { useCampaignLoader } from '../../../stores'

export const CampaignView = observer(() => {
  const { id } = useParams<IdParam>()
  const { campaign, isLoading, notFound } = useCampaignLoader(id)

  return (
    <div className='Campaign'>
      {isLoading && 'Loading . . .'}

      {notFound && 'Campaign not found'}

      {campaign !== undefined && (
        <>
          <h1 className='mb-2'>{campaign.name}</h1>
          <div className='row'>
            <div className='col sm-12 lg-6'>
              <Panel title='Encounters' color='purple' />
            </div>
            <div className='col sm-12 lg-6'>
              <Panel title='Characters' color='blue' />
            </div>
            <div className='col sm-12 lg-6'>
              <Panel title='Locations' color='green' />
            </div>
          </div>
        </>
      )}
    </div>
  )
})

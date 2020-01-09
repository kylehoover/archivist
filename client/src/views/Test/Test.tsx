import React from 'react'

import Container from '../../components/Container'
import Input from '../../components/Input'
import Panel from '../../components/Panel'

const Test = () => {
  return (
    <div className='Test'>
      <Container maxWidth={40} centered>
        <Panel title='Forms' color='blue'>
          <Input label='Name' />
        </Panel>
      </Container>
    </div>
  )
}

export default Test

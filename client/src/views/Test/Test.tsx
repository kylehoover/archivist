import React from 'react'

import Container from '../../components/Container'
import Input from '../../components/Input'
import Panel from '../../components/Panel'

const Test = () => {
  return (
    <div className='Test'>
      <Container centered>
        <Panel title='Forms' color='blue'>
          <div style={{marginBottom: 32}}>
            <Input label='Name' name='name' labelPosition='embedded' />
          </div>
          <div style={{marginBottom: 32}}>
            <Input label='Name' name='name' labelPosition='top' />
          </div>
          <div style={{marginBottom: 32}}>
            <Input label='Name' name='name' labelPosition='left' />
          </div>
        </Panel>
      </Container>
    </div>
  )
}

export default Test

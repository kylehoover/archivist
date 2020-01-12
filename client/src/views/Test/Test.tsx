import React from 'react'

import Button from '../../components/Button'
import Container from '../../components/Container'
import Input from '../../components/Input'
import Panel from '../../components/Panel'

const Test = () => {
  return (
    <div className='Test'>
      <Container maxWidth={40} centered>
        <Panel title='Forms' color='blue'>
          <form>
            <div style={{marginBottom: 32}}>
              <Input label='Name' name='name' labelPosition='embedded' />
            </div>
            <div style={{marginBottom: 32}}>
              <Input label='Name' name='name' labelPosition='top' />
            </div>
            <div style={{marginBottom: 32}}>
              <Input label='Name' name='name' labelPosition='left' />
            </div>
          </form>
        </Panel>
      </Container>
    </div>
  )
}

export default Test

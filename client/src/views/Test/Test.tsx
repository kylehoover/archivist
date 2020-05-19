import React from 'react'
import { useForm } from 'react-hook-form'

import Container from '../../components/Container'
// import Input from '../../components/Input'
import Panel from '../../components/Panel'

const Test = () => {
  const { errors, handleSubmit, register } = useForm()
  console.log('Errors', errors)

  return (
    <div className='Test'>
      <Container maxWidth={40} centered>
        <Panel title='Forms' color='blue'>
          <form onSubmit={handleSubmit(data => console.log(data))}>
            <div style={{marginBottom: 32}}>
              {/* <Input label='Name' name='name' /> */}
            </div>
            <div style={{marginBottom: 32}}>
              {/* <Input label='Number' name='number' type='number' /> */}
            </div>
            <input type='submit' />
          </form>
        </Panel>
      </Container>
    </div>
  )
}

export default Test

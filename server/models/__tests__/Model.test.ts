import 'reflect-metadata'
import { withNewModelFields, withUpdatedModelFields } from '../Model'

beforeAll(() => {
  const mockDate = new Date()
  jest.spyOn(global, 'Date').mockImplementation(() => (mockDate).toString())
})

afterAll(() => {
  jest.spyOn(global, 'Date').mockRestore()
})

describe('Model', () => {
  test('withNewModelFields returns createdAt, modifiedAt, and the fields provided', () => {
    const fields = { name: 'Name', value: true }
    const expected = { createdAt: new Date(), modifiedAt: new Date(), ...fields }
    expect(withNewModelFields(fields)).toEqual(expected)
  })

  test('withUpdatedModelFields returns modifiedAt and the fields provided', () => {
    const fields = { name: 'Name', value: true }
    const expected = { modifiedAt: new Date(), ...fields }
    expect(withUpdatedModelFields(fields)).toEqual(expected)
  })
})

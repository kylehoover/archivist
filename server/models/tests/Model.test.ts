import 'reflect-metadata'

import Model from '../Model'

beforeAll(() => {
  const mockDate = new Date()
  jest.spyOn(global, 'Date').mockImplementation(() => (mockDate).toString())
})

afterAll(() => {
  jest.spyOn(global, 'Date').mockReset()
})

describe('Model', () => {
  test('getNewModelFields returns createdAt, modifiedAt, and the fields provided', () => {
    const fields = { name: 'Name', value: true }
    const expected = { createdAt: new Date(), modifiedAt: new Date(), ...fields }
    expect(Model.getNewModelFields(fields)).toEqual(expected)
  })

  test('getUpdatedModelFields returns modifiedAt and the fields provided', () => {
    const fields = { name: 'Name', value: true }
    const expected = { modifiedAt: new Date(), ...fields }
    expect(Model.getUpdatedModelFields(fields)).toEqual(expected)
  })
})

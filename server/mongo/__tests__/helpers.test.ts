import { ObjectId } from 'mongodb'
import { docToFields, modelSchema, objectIdValidator } from '../helpers'

describe('Mongo helpers', () => {
  test('docToFields validates the document and returns the correct fields', () => {
    const id = new ObjectId()
    const date = new Date()
    const doc = { _id: id, createdAt: date, modifiedAt: date }
    const expected = { id: id.toHexString(), createdAt: date, modifiedAt: date }
    const result = docToFields(doc, modelSchema)
    expect(result).toEqual(expected)
  })

  test('docToFields throws an error when validation fails', () => {
    expect(() => docToFields({}, modelSchema)).toThrow()
  })

  test('objectIdValidator returns the value when valid', () => {
    const id = new ObjectId()
    expect(objectIdValidator(id)).toEqual(id)
  })

  test('objectIdValidator throws an error when the value is an invalid ObjectId', () => {
    expect(() => objectIdValidator(null)).toThrow()
    expect(() => objectIdValidator(undefined)).toThrow()
    expect(() => objectIdValidator(12345)).toThrow()
    expect(() => objectIdValidator('12345')).toThrow()
  })
})

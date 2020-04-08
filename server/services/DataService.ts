interface DataService<DataType, NewDataFields, UpdatedDataFields> {
  findAll(): Promise<DataType[]>
  findById(id: string): Promise<DataType | null>
  insertOne(fields: NewDataFields): Promise<DataType>
  updateById(id: string, fields: UpdatedDataFields, options?: {
    returnOriginal: boolean
    upsert: boolean
  }): Promise<DataType>
}

export default DataService

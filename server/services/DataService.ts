export interface DataService<DataType, NewDataFields, UpdatedDataFields, FilterFields> {
  deleteById(id: string): Promise<DataType>
  findAll(filterBy?: Partial<FilterFields>): Promise<DataType[]>
  findById(id: string, filterBy?: Partial<FilterFields>): Promise<DataType | null>
  insertOne(fields: NewDataFields): Promise<DataType>
  updateById(id: string, fields: UpdatedDataFields, options?: {
    returnOriginal: boolean
    upsert: boolean
  }): Promise<DataType>
}

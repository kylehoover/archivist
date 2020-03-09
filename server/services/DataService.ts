interface DataService<DataType, NewDataFields> {
  findAll(): Promise<DataType[]>
  findById(id: string): Promise<DataType | null>
  insertOne(fields: NewDataFields): Promise<DataType>
}

export default DataService

interface DataService<T> {
  findAll(): Promise<T[]>
  findById(id: string): Promise<T | null>
}

export default DataService

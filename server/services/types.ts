export interface UserIdService<T> {
  findAllByUserId(userId: string): Promise<T[]>
}

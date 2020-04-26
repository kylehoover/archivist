import { RequestUserInfo } from '../../server/models/User'

declare global {
  namespace Express {
    interface Request {
      user: RequestUserInfo | null
    }
  }
}

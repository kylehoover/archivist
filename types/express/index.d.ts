import { AccessTokenState } from '../../server/helpers/auth'
import { RequestUserInfo } from '../../server/models/User'

declare global {
  namespace Express {
    interface Request {
      accessTokenState: AccessTokenState
      userInfo: RequestUserInfo | null
    }
  }
}

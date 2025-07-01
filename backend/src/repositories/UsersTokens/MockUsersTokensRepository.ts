import { IUserToken } from '../../entities/userToken'
import {
  ICreateUserTokenDTO,
  IUsersTokensRepository,
} from './IUsersTokensRepository'

export class MockUsersTokensRepository implements IUsersTokensRepository {
  usersTokens: IUserToken[] = []

  async create({
    expiresDate,
    refreshToken,
    user,
  }: ICreateUserTokenDTO): Promise<IUserToken> {
    const newUserToken = {
      expiresDate,
      refreshToken,
      user: user as any,
      createdAt: new Date(),
      id: Math.random().toString(),
    }

    this.usersTokens.push(newUserToken)

    return newUserToken
  }

  async findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<IUserToken> {
    const userToken = this.usersTokens.find(
      token => token.refreshToken === refreshToken && (token.user as any) === userId,
    )

    return userToken
  }

  async deleteById(tokenId: string): Promise<void> {
    this.usersTokens = this.usersTokens.filter(token => (token as any).id !== tokenId)
  }

  async findByRefreshToken(refreshToken: string): Promise<IUserToken> {
    const userToken = this.usersTokens.find(
      (token) => token.refreshToken === refreshToken,
    )

    return userToken
  }
}

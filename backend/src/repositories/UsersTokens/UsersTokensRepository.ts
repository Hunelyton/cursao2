import { Repository } from 'typeorm'
import { IUserToken, UserToken } from '../../entities/userToken'
import {
  ICreateUserTokenDTO,
  IUsersTokensRepository,
} from './IUsersTokensRepository'
import { AppDataSource } from '../../shared/infra/mysql/data-source'

export class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserToken>
  constructor() {
    this.repository = AppDataSource.getRepository(UserToken)
  }

  async create({
    user,
    expiresDate,
    refreshToken,
  }: ICreateUserTokenDTO): Promise<IUserToken> {
    const token = this.repository.create({
      user: user ? ({ id: user } as any) : undefined,
      expiresDate,
      refreshToken,
    })
    await this.repository.save(token)
    return token
  }

  async findByUserIdAndRefreshToken(
    user: string,
    refreshToken: string,
  ): Promise<IUserToken> {
    return await this.repository.findOne({ where: { user: { id: user } as any, refreshToken } })
  }

  async deleteById(tokenId: string): Promise<void> {
    await this.repository.delete({ id: tokenId })
  }

  async findByRefreshToken(refreshToken: string): Promise<IUserToken> {
    return await this.repository.findOne({ where: { refreshToken } })
  }
}

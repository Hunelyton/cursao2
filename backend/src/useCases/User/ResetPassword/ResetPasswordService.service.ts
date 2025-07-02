import { inject, injectable } from 'tsyringe'
import bcrypt from 'bcrypt'
import { IUsersRepository } from '../../../repositories/Users/IUsersRepository'
import { AppError } from '../../../shared/errors/AppError'
const saltRounds = 10

interface IRequest {
  email: string
  newPassword: string
}

@injectable()
export class ResetPasswordService {
  usersRepository: IUsersRepository
  constructor(@inject('UsersRepository') usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({ email, newPassword }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) throw new AppError('Usuário não encontrado')
    const encrypted = await bcrypt.hash(newPassword, saltRounds)
    await this.usersRepository.update({ _id: user._id }, { password: encrypted })
  }
}

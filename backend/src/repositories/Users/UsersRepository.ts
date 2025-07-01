import { Repository } from 'typeorm'
import { User } from '../../entities/user'
import { INewUserDTO, IUsersRepository } from './IUsersRepository'
import { AppDataSource } from '../../shared/infra/mysql/data-source'

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>
  constructor() {
    this.repository = AppDataSource.getRepository(User)
  }

  async create({
    code,
    name,
    password,
    email,
    occupation,
    idTeacher,
  }: INewUserDTO): Promise<User> {
    const newUser = this.repository.create({
      code,
      name,
      password,
      email,
      occupation,
      teacher: idTeacher ? { id: idTeacher } as any : undefined,
    })
    await this.repository.save(newUser)
    return newUser
  }

  async findByEmail(email: string): Promise<User> {
    return await this.repository.findOne({ where: { email } })
  }

  async findById(_id: string): Promise<User> {
    return await this.repository.findOne({
      where: { id: _id },
      select: {
        password: false,
      } as any,
    })
  }

  async update(filters: any, updateFields: any): Promise<void> {
    await this.repository.update(filters, updateFields)
  }

  async delete(idUser: string): Promise<void> {
    await this.repository.delete({ id: idUser })
  }

  async listStudents(idTeacher: string): Promise<User[]> {
    return await this.repository.find({
      where: { teacher: { id: idTeacher }, occupation: 'student' } as any,
    })
  }

  async getStudentsEntries(idTeacher: string): Promise<number> {
    return await this.repository.count({
      where: { teacher: { id: idTeacher }, occupation: 'student' } as any,
    })
  }

  async incrementWarningsAmount(idUser: string): Promise<void> {
    await this.repository.increment({ id: idUser }, 'warningsAmount', 1)
  }
}

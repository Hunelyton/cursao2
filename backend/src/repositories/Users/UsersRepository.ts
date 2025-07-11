import { Model } from 'mongoose'
import { User, UserModel } from '../../entities/user'
import { INewUserDTO, IUsersRepository } from './IUsersRepository'

export class UsersRepository implements IUsersRepository {
  model: Model<User>
  constructor() {
    this.model = UserModel
  }

  async create({
    code,
    name,
    password,
    email,
    occupation,
    idTeacher,
    isActive = true,
    monthlyPayments = {},
  }: INewUserDTO): Promise<User> {
    const newUser = await this.model.create({
      code,
      name,
      password,
      email,
      occupation,
      teacher: idTeacher,
      isActive,
      monthlyPayments,
    })
    await newUser.save()
    return newUser
  }

  async findByEmail(email: string): Promise<User> {
    return await this.model.findOne({ email })
  }

  async findById(_id: string): Promise<User> {
    return await this.model.findOne({ _id }).select('-password')
  }

  async findByIdWithPassword(_id: string): Promise<User> {
    return await this.model.findOne({ _id })
  }

  async update(filters: any, updateFields: any): Promise<void> {
    await this.model.updateMany(filters, updateFields)
  }

  async delete(idUser: string): Promise<void> {
    await this.model.deleteOne({ _id: idUser })
  }

  async listStudents(idTeacher: string): Promise<User[]> {
    return await this.model.find({ teacher: idTeacher, occupation: 'student' })
  }

  async getStudentsEntries(idTeacher: string): Promise<number> {
    return await this.model.count({ teacher: idTeacher, occupation: 'student' })
  }

  async incrementWarningsAmount(idUser: string): Promise<void> {
    await this.model.updateOne({ _id: idUser }, { $inc: { warningsAmount: 1 } })
  }

  async findByCode(code: string): Promise<User | null> {
    return await this.model.findOne({ code })
  }
}

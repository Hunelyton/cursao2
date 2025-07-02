import { inject, injectable } from 'tsyringe'
import { IAttendancesRepository, INewAttendanceDTO } from '../../../repositories/Attendances/IAttendancesRepository'
import { IUsersRepository } from '../../../repositories/Users/IUsersRepository'
import bcrypt from 'bcrypt'
import { AppError } from '../../../shared/errors/AppError'

@injectable()
export class CreateAttendanceService {
  attendancesRepository: IAttendancesRepository
  usersRepository: IUsersRepository

  constructor(
    @inject('AttendancesRepository') attendancesRepository: IAttendancesRepository,
    @inject('UsersRepository') usersRepository: IUsersRepository,
  ) {
    this.attendancesRepository = attendancesRepository
    this.usersRepository = usersRepository
  }

  async execute({ studentId, date }: INewAttendanceDTO): Promise<void> {
    await this.attendancesRepository.create({ studentId, date })
  }
}

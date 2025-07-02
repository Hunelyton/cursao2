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


  async execute({
    studentId,
    date = new Date(),
    code,
    password,
  }: INewAttendanceDTO): Promise<void> {
    const student = await this.usersRepository.findByIdWithPassword(studentId)
    if (!student) throw new AppError('Aluno não encontrado')

    if (student.code !== code)
      throw new AppError('Código ou senha incorreto')

    const passwordMatch = await bcrypt.compare(password || '', student.password)
    if (!passwordMatch) throw new AppError('Código ou senha incorreto')

    const attendanceExists =
      await this.attendancesRepository.findByStudentAndDate(studentId, date)

    if (attendanceExists)
      throw new AppError('Presença deste dia já registrada')

    await this.attendancesRepository.create({ studentId, date })
  }
}

import { inject, injectable } from 'tsyringe'
import { IAttendancesRepository, INewAttendanceDTO } from '../../../repositories/Attendances/IAttendancesRepository'
import { IUsersRepository } from '../../../repositories/Users/IUsersRepository'
import { ISubjectsRepository } from '../../../repositories/Subjects/ISubjectsRepository'
import bcrypt from 'bcrypt'
import { AppError } from '../../../shared/errors/AppError'

@injectable()
export class CreateAttendanceService {
  attendancesRepository: IAttendancesRepository
  usersRepository: IUsersRepository
  subjectsRepository: ISubjectsRepository

  constructor(
    @inject('AttendancesRepository') attendancesRepository: IAttendancesRepository,
    @inject('UsersRepository') usersRepository: IUsersRepository,
    @inject('SubjectsRepository') subjectsRepository: ISubjectsRepository,
  ) {
    this.attendancesRepository = attendancesRepository
    this.usersRepository = usersRepository
    this.subjectsRepository = subjectsRepository
  }


  async execute({
    studentId,
    date = new Date(),
    subjectId,
    code,
    password,
  }: INewAttendanceDTO): Promise<void> {
    const student = await this.usersRepository.findByIdWithPassword(studentId)
    if (!student) throw new AppError('Aluno não encontrado')

    if (!student.isActive) throw new AppError('Aluno inativo')

    const subject = await this.subjectsRepository.findById(subjectId)
    if (!subject || !subject.students.includes(studentId as any)) {
      throw new AppError('Aluno não participa desta disciplina')
    }

    if (student.code !== code)
      throw new AppError('Código ou senha incorreto')

    const passwordMatch = await bcrypt.compare(password || '', student.password)
    if (!passwordMatch) throw new AppError('Código ou senha incorreto')

    const attendanceExists =
      await this.attendancesRepository.findByStudentAndDate(studentId, date)

    if (attendanceExists)
      throw new AppError('Presença deste dia já registrada')

    await this.attendancesRepository.create({ studentId, date, subjectId })
  }
}

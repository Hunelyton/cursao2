import { inject, injectable } from 'tsyringe'
import { IAttendancesRepository, INewAttendanceDTO } from '../../../repositories/Attendances/IAttendancesRepository'
import { IUsersRepository } from '../../../repositories/Users/IUsersRepository'
import { ISubjectsRepository } from '../../../repositories/Subjects/ISubjectsRepository'
import { IClassLessonsRepository } from '../../../repositories/ClassLessons/IClassLessonsRepository'
import bcrypt from 'bcrypt'
import { AppError } from '../../../shared/errors/AppError'

@injectable()
export class CreateAttendanceService {
  attendancesRepository: IAttendancesRepository
  usersRepository: IUsersRepository
  subjectsRepository: ISubjectsRepository
  classLessonsRepository: IClassLessonsRepository

  constructor(
    @inject('AttendancesRepository') attendancesRepository: IAttendancesRepository,
    @inject('UsersRepository') usersRepository: IUsersRepository,
    @inject('SubjectsRepository') subjectsRepository: ISubjectsRepository,
    @inject('ClassLessonsRepository') classLessonsRepository: IClassLessonsRepository,
  ) {
    this.attendancesRepository = attendancesRepository
    this.usersRepository = usersRepository
    this.subjectsRepository = subjectsRepository
    this.classLessonsRepository = classLessonsRepository
  }


  async execute({
    studentId,
    studentCode,
    date = new Date(),
    subjectId,
    code,
    password,
  }: INewAttendanceDTO): Promise<void> {
    const normalizedDate = new Date(date)
    let student = null
    if (studentId) {
      student = await this.usersRepository.findByIdWithPassword(studentId)
    } else if (studentCode) {
      const found = await this.usersRepository.findByCode(studentCode)
      if (found) student = await this.usersRepository.findByIdWithPassword(found._id.toString())
    }
    if (!student) throw new AppError('Aluno não encontrado')

    if (!student.isActive) throw new AppError('Aluno inativo')

    const resolvedStudentId = studentId || student._id.toString()

    const subject = await this.subjectsRepository.findById(subjectId)
    if (!subject || !subject.students.includes(resolvedStudentId as any)) {
      throw new AppError('Aluno não participa desta disciplina')
    }

    if (student.code !== code)
      throw new AppError('Código ou senha incorreto')

    const passwordMatch = await bcrypt.compare(password || '', student.password)
    if (!passwordMatch) throw new AppError('Código ou senha incorreto')

    const attendanceExists =
      await this.attendancesRepository.findByStudentAndDate(
        resolvedStudentId,
        normalizedDate,
      )

    const hasClass = await this.classLessonsRepository.findBySubjectAndDate(
      subjectId,
      normalizedDate,
    )
    if (!hasClass) throw new AppError('Nenhuma aula cadastrada para esta data')

    if (attendanceExists)
      throw new AppError('Presença deste dia já registrada')

    await this.attendancesRepository.create({
      studentId: resolvedStudentId,
      date: normalizedDate,
      subjectId,
    })
  }
}

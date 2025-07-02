import { inject, injectable } from 'tsyringe'
import { IClassLessonsRepository, INewClassLessonDTO } from '../../../repositories/ClassLessons/IClassLessonsRepository'
import { ISubjectsRepository } from '../../../repositories/Subjects/ISubjectsRepository'
import { IUsersRepository } from '../../../repositories/Users/IUsersRepository'
import bcrypt from 'bcrypt'
import { AppError } from '../../../shared/errors/AppError'

interface IRequest extends INewClassLessonDTO {
  teacherId: string
  teacherPassword: string
}

@injectable()
export class CreateClassLessonService {
  classLessonsRepository: IClassLessonsRepository
  subjectsRepository: ISubjectsRepository
  usersRepository: IUsersRepository

  constructor(
    @inject('ClassLessonsRepository') classLessonsRepository: IClassLessonsRepository,
    @inject('SubjectsRepository') subjectsRepository: ISubjectsRepository,
    @inject('UsersRepository') usersRepository: IUsersRepository,
  ) {
    this.classLessonsRepository = classLessonsRepository
    this.subjectsRepository = subjectsRepository
    this.usersRepository = usersRepository
  }

  async execute({ subjectId, date, teacherId, teacherPassword }: IRequest) {
    const teacher = await this.usersRepository.findByIdWithPassword(teacherId)
    if (!teacher) throw new AppError('Professor não encontrado')

    const passwordMatch = await bcrypt.compare(teacherPassword, teacher.password)
    if (!passwordMatch) throw new AppError('Senha incorreta')

    const subject = await this.subjectsRepository.findById(subjectId)
    if (!subject || subject.teacher.toString() !== teacherId)
      throw new AppError('Disciplina inválida')

    await this.classLessonsRepository.create({ subjectId, date })
  }
}

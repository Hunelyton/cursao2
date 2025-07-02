import { inject, injectable } from 'tsyringe'
import { IClassLessonsRepository } from '../../../repositories/ClassLessons/IClassLessonsRepository'
import { AppError } from '../../../shared/errors/AppError'

interface IRequest {
  id: string
  date: Date
  description?: string
}

@injectable()
export class UpdateClassLessonService {
  constructor(
    @inject('ClassLessonsRepository') private classLessonsRepository: IClassLessonsRepository,
  ) {}

  async execute({ id, date, description }: IRequest): Promise<void> {
    if (!id) throw new AppError('Id da aula não informado')
    await this.classLessonsRepository.update(id, { date, description })
  }
}

import { inject, injectable } from 'tsyringe'
import { IClassLessonsRepository } from '../../../repositories/ClassLessons/IClassLessonsRepository'
import { AppError } from '../../../shared/errors/AppError'

@injectable()
export class DeleteClassLessonService {
  constructor(
    @inject('ClassLessonsRepository') private classLessonsRepository: IClassLessonsRepository,
  ) {}

  async execute(id: string): Promise<void> {
    if (!id) throw new AppError('Id da aula não informado')

    await this.classLessonsRepository.delete(id)
  }
}

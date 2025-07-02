import { inject, injectable } from 'tsyringe'
import {
  IClassLessonsRepository,
  INewClassLessonDTO,
} from '../../../repositories/ClassLessons/IClassLessonsRepository'
import { AppError } from '../../../shared/errors/AppError'

interface IRequest {
  id: string
  date?: string | Date
  description?: string
  subjectId?: string
}

@injectable()
export class UpdateClassLessonService {
  constructor(
    @inject('ClassLessonsRepository') private classLessonsRepository: IClassLessonsRepository,
  ) {}

  async execute({ id, date, description, subjectId }: IRequest): Promise<void> {
    if (!id) throw new AppError('Id da aula não informado')

    const updateData: Partial<INewClassLessonDTO> = {}

    if (date) updateData.date = new Date(date)
    if (description !== undefined) updateData.description = description
    if (subjectId) updateData.subjectId = subjectId

    await this.classLessonsRepository.update(id, updateData)
  }
}

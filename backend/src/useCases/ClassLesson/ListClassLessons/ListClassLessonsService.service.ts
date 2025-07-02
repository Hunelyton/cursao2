import { inject, injectable } from 'tsyringe'
import { IClassLessonsRepository } from '../../../repositories/ClassLessons/IClassLessonsRepository'

@injectable()
export class ListClassLessonsService {
  constructor(
    @inject('ClassLessonsRepository') private classLessonsRepository: IClassLessonsRepository,
  ) {}

  async execute() {
    const lessons = await this.classLessonsRepository.listAll()
    return lessons.map((lesson) => ({
      _id: lesson._id,
      date: lesson.date,
      description: lesson.description,
      subject: (lesson.subject as any)?.name || '',
      subjectId: (lesson.subject as any)?._id?.toString() || '',
    }))
  }
}

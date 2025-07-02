import { Model } from 'mongoose'
import { ClassLesson, ClassLessonModel } from '../../entities/classLesson'
import { IClassLessonsRepository, INewClassLessonDTO } from './IClassLessonsRepository'

export class ClassLessonsRepository implements IClassLessonsRepository {
  model: Model<ClassLesson>
  constructor() {
    this.model = ClassLessonModel
  }

  async create({ subjectId, date }: INewClassLessonDTO): Promise<ClassLesson> {
    const newLesson = await this.model.create({
      subject: subjectId,
      date,
    })
    await newLesson.save()
    return newLesson
  }

  async findBySubjectAndDate(subjectId: string, date: Date): Promise<ClassLesson | null> {
    const start = new Date(date)
    start.setHours(0,0,0,0)
    const end = new Date(date)
    end.setHours(23,59,59,999)

    return await this.model.findOne({
      subject: subjectId,
      date: { $gte: start, $lte: end },
    })
  }
}

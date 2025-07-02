import { ClassLesson } from '../../entities/classLesson'

export interface INewClassLessonDTO {
  subjectId: string
  date: Date
}

export interface IClassLessonsRepository {
  create(data: INewClassLessonDTO): Promise<ClassLesson>
  findBySubjectAndDate(subjectId: string, date: Date): Promise<ClassLesson | null>
}

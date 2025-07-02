import { container } from 'tsyringe'
import { ClassLessonsRepository } from '../../repositories/ClassLessons/ClassLessonsRepository'
import { IClassLessonsRepository } from '../../repositories/ClassLessons/IClassLessonsRepository'

container.registerSingleton<IClassLessonsRepository>(
  'ClassLessonsRepository',
  ClassLessonsRepository,
)

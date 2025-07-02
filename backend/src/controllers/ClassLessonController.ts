import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateClassLessonService } from '../useCases/ClassLesson/CreateClassLesson/CreateClassLessonService.service'
import { ListClassLessonsService } from '../useCases/ClassLesson/ListClassLessons/ListClassLessonsService.service'
import { UpdateClassLessonService } from '../useCases/ClassLesson/UpdateClassLesson/UpdateClassLessonService.service'

export class ClassLessonController {
  async create(req: Request, res: Response): Promise<Response> {
    const { subjectId, date, teacherPassword } = req.body
    const { _id: teacherId } = req.user
    const service = container.resolve(CreateClassLessonService)
    await service.execute({ subjectId, date, teacherId, teacherPassword })
    return res.status(201).json({ success: true })
  }

  async list(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(ListClassLessonsService)
    const lessons = await service.execute()
    return res.status(200).json({ success: true, items: lessons })
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { date, description } = req.body
    const service = container.resolve(UpdateClassLessonService)
    await service.execute({ id, date, description })
    return res.status(200).json({ success: true })
  }
}

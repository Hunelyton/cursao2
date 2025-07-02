import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateClassLessonService } from '../useCases/ClassLesson/CreateClassLesson/CreateClassLessonService.service'

export class ClassLessonController {
  async create(req: Request, res: Response): Promise<Response> {
    const { subjectId, date, teacherPassword } = req.body
    const { _id: teacherId } = req.user
    const service = container.resolve(CreateClassLessonService)
    await service.execute({ subjectId, date, teacherId, teacherPassword })
    return res.status(201).json({ success: true })
  }
}

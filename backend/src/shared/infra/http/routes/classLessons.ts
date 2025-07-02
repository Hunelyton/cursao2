import express from 'express'
import { ClassLessonController } from '../../../../controllers/ClassLessonController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const classLessonRoutes = express.Router()
const classLessonController = new ClassLessonController()

classLessonRoutes.use(ensureAuthenticated)
classLessonRoutes.post('/', classLessonController.create)
classLessonRoutes.get('/', classLessonController.list)
classLessonRoutes.put('/:id', classLessonController.update)

export { classLessonRoutes }

import express from 'express'
import { ClassLessonController } from '../../../../controllers/ClassLessonController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const classLessonRoutes = express.Router()
const classLessonController = new ClassLessonController()

classLessonRoutes.post('/', ensureAuthenticated, classLessonController.create)

export { classLessonRoutes }

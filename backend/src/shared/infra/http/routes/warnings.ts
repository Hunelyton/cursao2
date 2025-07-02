import express from 'express'
import { WarningController } from '../../../../controllers/WarningController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const warningsRoutes = express.Router()
const warningController = new WarningController()

warningsRoutes.use(ensureAuthenticated)

warningsRoutes.post('/:idStudent', warningController.createNewWarning)
warningsRoutes.post('/subject/:idSubject', warningController.createWarningsBySubject)

warningsRoutes.get('/:idStudent', warningController.listWarnings)

export { warningsRoutes }

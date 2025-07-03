import express from 'express'
import { MaterialController } from '../../../../controllers/MaterialController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const materialsRoutes = express.Router()
const controller = new MaterialController()

materialsRoutes.post('/', ensureAuthenticated, controller.create)
materialsRoutes.get('/', ensureAuthenticated, controller.list)

export { materialsRoutes }

import express from 'express'
import { AttendanceController } from '../../../../controllers/AttendanceController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const attendancesRoutes = express.Router()
const attendanceController = new AttendanceController()

attendancesRoutes.post('/', ensureAuthenticated, attendanceController.create)
attendancesRoutes.get('/:studentId', ensureAuthenticated, attendanceController.listByStudent)

export { attendancesRoutes }

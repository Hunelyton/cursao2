import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateAttendanceService } from '../useCases/Attendance/CreateAttendance/CreateAttendanceService.service'
import { ListAttendancesService } from '../useCases/Attendance/ListAttendances/ListAttendancesService.service'

export class AttendanceController {
  async create(req: Request, res: Response): Promise<Response> {
    const { studentId, code, password, date } = req.body
    const createAttendanceService = container.resolve(CreateAttendanceService)
    await createAttendanceService.execute({ studentId, code, password, date })
    return res.status(201).json({ success: true })
  }

  async listByStudent(req: Request, res: Response): Promise<Response> {
    const { studentId } = req.params
    const listAttendancesService = container.resolve(ListAttendancesService)
    const attendances = await listAttendancesService.execute(studentId)
    return res.status(200).json({ success: true, items: attendances })
  }
}

import { Model } from 'mongoose'
import { Attendance, AttendanceModel } from '../../entities/attendance'
import { IAttendancesRepository, INewAttendanceDTO } from './IAttendancesRepository'

export class AttendancesRepository implements IAttendancesRepository {
  model: Model<Attendance>

  constructor() {
    this.model = AttendanceModel
  }

  async listByStudent(studentId: string): Promise<Attendance[]> {
    return await this.model.find({ student: studentId }).sort({ date: 1 })
  }

  async create({ studentId, date }: INewAttendanceDTO): Promise<Attendance> {
    const newAttendance = await this.model.create({
      student: studentId,
      date,
    })
    await newAttendance.save()
    return newAttendance
  }
}

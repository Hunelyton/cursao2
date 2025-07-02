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

  async findByStudentAndDate(
    studentId: string,
    date: Date,
  ): Promise<Attendance | null> {
    const start = new Date(date)
    start.setHours(0, 0, 0, 0)
    const end = new Date(date)
    end.setHours(23, 59, 59, 999)

    return await this.model.findOne({
      student: studentId,
      date: { $gte: start, $lte: end },
    })
  }
}

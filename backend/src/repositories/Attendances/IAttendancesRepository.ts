import { Types } from 'mongoose'
import { Attendance } from '../../entities/attendance'

export interface INewAttendanceDTO {
  studentId: string
  date?: Date
}

export interface IAttendancesRepository {
  listByStudent: (studentId: string) => Promise<Attendance[]>
  create: (data: INewAttendanceDTO) => Promise<Attendance>
}

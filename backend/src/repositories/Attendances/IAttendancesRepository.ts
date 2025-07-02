import { Types } from 'mongoose'
import { Attendance } from '../../entities/attendance'

export interface INewAttendanceDTO {
  studentId?: string
  studentCode?: string
  date?: Date
  subjectId: string
  code?: string
  password?: string

}

export interface IAttendancesRepository {
  listByStudent: (studentId: string) => Promise<Attendance[]>
  create: (data: INewAttendanceDTO) => Promise<Attendance>
  findByStudentAndDate: (
    studentId: string,
    date: Date,
  ) => Promise<Attendance | null>
}

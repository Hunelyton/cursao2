import mongoose, { Types } from 'mongoose'

export interface Attendance {
  _id: Types.ObjectId
  student: Types.ObjectId
  subject: Types.ObjectId
  date: Date
  createdAt: Date
}

const attendanceSchema = new mongoose.Schema({
  student: { type: 'ObjectId', ref: 'User', default: null },
  subject: { type: 'ObjectId', ref: 'Subject', default: null },
  date: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
})

export const AttendanceModel = mongoose.model<Attendance>('Attendance', attendanceSchema)

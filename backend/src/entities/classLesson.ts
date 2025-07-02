import mongoose, { Types } from 'mongoose'

export interface ClassLesson {
  _id: Types.ObjectId
  subject: Types.ObjectId
  date: Date
  createdAt: Date
}

const classLessonSchema = new mongoose.Schema({
  subject: { type: 'ObjectId', ref: 'Subject', default: null },
  date: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
})

export const ClassLessonModel = mongoose.model<ClassLesson>('ClassLesson', classLessonSchema)

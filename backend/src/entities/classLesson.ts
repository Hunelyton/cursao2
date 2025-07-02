import mongoose, { Types } from 'mongoose'

export interface ClassLesson {
  _id: Types.ObjectId
  subject: Types.ObjectId
  date: Date
  description?: string
  createdAt: Date
}

const classLessonSchema = new mongoose.Schema({
  subject: { type: 'ObjectId', ref: 'Subject', default: null },
  date: { type: Date, default: Date.now },
  description: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
})

export const ClassLessonModel = mongoose.model<ClassLesson>('ClassLesson', classLessonSchema)

import mongoose, { Types } from 'mongoose'

export interface User {
  _id: Types.ObjectId
  code: string
  name: string
  email: string
  password: string
  occupation: string
  avatar: string
  avatarURL: string
  teacher: Types.ObjectId | User
  createdAt: Date
  warningsAmount: number
  isActive: boolean
  monthlyPayments: {
    july: boolean
    august: boolean
    september: boolean
    october: boolean
    november: boolean
    december: boolean
    january: boolean
    february: boolean
    march: boolean
    april: boolean
    may: boolean
    june: boolean
  }
}

const userSchema = new mongoose.Schema({
  code: { type: String, default: null },
  name: { type: String, default: null, required: true },
  email: { type: String, default: null, required: true },
  password: { type: String, default: null, required: true },
  occupation: { type: String, default: null, required: true },
  avatar: { type: String, default: null },
  avatarURL: { type: String, default: null },
  teacher: { type: 'ObjectId', ref: 'User', default: null },
  createdAt: { type: Date, default: Date.now },
  warningsAmount: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  monthlyPayments: {
    july: { type: Boolean, default: false },
    august: { type: Boolean, default: false },
    september: { type: Boolean, default: false },
    october: { type: Boolean, default: false },
    november: { type: Boolean, default: false },
    december: { type: Boolean, default: false },
    january: { type: Boolean, default: false },
    february: { type: Boolean, default: false },
    march: { type: Boolean, default: false },
    april: { type: Boolean, default: false },
    may: { type: Boolean, default: false },
    june: { type: Boolean, default: false },
  },
})

export const UserModel = mongoose.model<User>('User', userSchema)

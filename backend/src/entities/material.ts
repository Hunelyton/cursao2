import mongoose, { Types } from 'mongoose'

export interface Material {
  _id: Types.ObjectId
  nome: string
  disciplina: Types.ObjectId
  createdAt: Date
}

const materialSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  disciplina: { type: 'ObjectId', ref: 'Subject', required: true },
  createdAt: { type: Date, default: Date.now },
})

export const MaterialModel = mongoose.model<Material>('Material', materialSchema)

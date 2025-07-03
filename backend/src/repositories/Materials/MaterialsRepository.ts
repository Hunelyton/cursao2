import { Model } from 'mongoose'
import { Material, MaterialModel } from '../../entities/material'
import { IMaterialsRepository, INewMaterialDTO } from './IMaterialsRepository'

export class MaterialsRepository implements IMaterialsRepository {
  model: Model<Material>
  constructor() {
    this.model = MaterialModel
  }

  async create({ nome, disciplinaId }: INewMaterialDTO): Promise<Material> {
    const material = await this.model.create({
      nome,
      disciplina: disciplinaId,
    })
    await material.save()
    return material
  }

  async listByDisciplina(disciplinaId: string): Promise<Material[]> {
    return await this.model.find({ disciplina: disciplinaId }).populate('disciplina')
  }

  async listAll(): Promise<Material[]> {
    return await this.model.find().populate('disciplina')
  }
}

import { Material } from '../../entities/material'

export interface INewMaterialDTO {
  nome: string
  disciplinaId: string
}

export interface IMaterialsRepository {
  create(data: INewMaterialDTO): Promise<Material>
  listByDisciplina(disciplinaId: string): Promise<Material[]>
  listAll(): Promise<Material[]>
}

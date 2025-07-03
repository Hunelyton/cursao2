import { inject, injectable } from 'tsyringe'
import { IMaterialsRepository } from '../../../repositories/Materials/IMaterialsRepository'

@injectable()
export class ListMaterialsService {
  constructor(
    @inject('MaterialsRepository') private materialsRepository: IMaterialsRepository,
  ) {}

  async execute(disciplinaId?: string) {
    if (disciplinaId) return this.materialsRepository.listByDisciplina(disciplinaId)
    return this.materialsRepository.listAll()
  }
}

import { inject, injectable } from 'tsyringe'
import { IMaterialsRepository, INewMaterialDTO } from '../../../repositories/Materials/IMaterialsRepository'
import { ISubjectsRepository } from '../../../repositories/Subjects/ISubjectsRepository'
import { AppError } from '../../../shared/errors/AppError'

@injectable()
export class CreateMaterialService {
  constructor(
    @inject('MaterialsRepository') private materialsRepository: IMaterialsRepository,
    @inject('SubjectsRepository') private subjectsRepository: ISubjectsRepository,
  ) {}

  async execute({ nome, disciplinaId }: INewMaterialDTO): Promise<void> {
    const subject = await this.subjectsRepository.findById(disciplinaId)
    if (!subject) throw new AppError('Disciplina não encontrada')
    await this.materialsRepository.create({ nome, disciplinaId })
  }
}

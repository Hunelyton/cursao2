import {
  ISubjectsRepository,
  NewSubject,
} from '../repositories/Subjects/ISubjectsRepository'

export class CreateNewSubjectService {
  subjectsRepository: ISubjectsRepository
  constructor(subjectsRepository: ISubjectsRepository) {
    this.subjectsRepository = subjectsRepository
  }

  async execute({ name }: NewSubject): Promise<NewSubject> {
    if (!name) {
      throw new Error('O nome da disciplina não foi informado.')
    }

    const entries = await this.subjectsRepository.getEntries()
    const code = (entries + 1).toString()

    const newSubject = this.subjectsRepository.create({ code, name })
    return newSubject
  }
}

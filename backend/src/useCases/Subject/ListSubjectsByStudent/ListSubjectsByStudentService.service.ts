import { inject, injectable } from 'tsyringe'
import { ISubjectsRepository } from '../../../repositories/Subjects/ISubjectsRepository'
import { ISubject } from '../../../entities/subject'
import { AppError } from '../../../shared/errors/AppError'

@injectable()
export class ListSubjectsByStudentService {
  constructor(
    @inject('SubjectsRepository') private subjectsRepository: ISubjectsRepository,
  ) {}

  async execute(idStudent: string): Promise<ISubject[]> {
    if (!idStudent) throw new AppError('_id do estudante não foi informado')

    const subjects = await this.subjectsRepository.listByStudent(idStudent)
    return subjects
  }
}

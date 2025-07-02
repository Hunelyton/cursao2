import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../shared/errors/AppError'
import { ISubjectsRepository } from '../../../repositories/Subjects/ISubjectsRepository'
import { IWarningsRepository } from '../../../repositories/Warnings/IWarningsRepository'
import { IUsersRepository } from '../../../repositories/Users/IUsersRepository'
import { Warning } from '../../../entities/warning'

interface IRequest {
  idSubject: string
  title: string
  description: string
}

@injectable()
export class CreateWarningsBySubjectService {
  warningsRepository: IWarningsRepository
  subjectsRepository: ISubjectsRepository
  usersRepository: IUsersRepository
  constructor(
    @inject('WarningsRepository') warningsRepository: IWarningsRepository,
    @inject('SubjectsRepository') subjectsRepository: ISubjectsRepository,
    @inject('UsersRepository') usersRepository: IUsersRepository,
  ) {
    this.warningsRepository = warningsRepository
    this.subjectsRepository = subjectsRepository
    this.usersRepository = usersRepository
  }

  async execute({ idSubject, title, description }: IRequest): Promise<Warning[]> {
    if (!idSubject) throw new AppError('_id da disciplina não foi informado')
    if (!title) throw new AppError('Título não foi informado')

    const subject = await this.subjectsRepository.findById(idSubject)
    if (!subject) throw new AppError('Disciplina não encontrada')

    const warnings: Warning[] = []
    const studentsIds = subject.students as any[]

    for (const idStudent of studentsIds) {
      const entries = await this.warningsRepository.getEntries(idStudent.toString())
      const code = (entries + 1).toString()
      const warning = await this.warningsRepository.create({
        idStudent: idStudent.toString(),
        title,
        description,
        code,
      })
      await this.usersRepository.incrementWarningsAmount(idStudent.toString())
      warnings.push(warning)
    }

    return warnings
  }
}

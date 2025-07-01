import { Repository } from 'typeorm'
import { Warning } from '../../entities/warning'
import { IWarningsRepository, INewWarningDTO } from './IWarningsRepository'
import { AppDataSource } from '../../shared/infra/mysql/data-source'

export class WarningsRepository implements IWarningsRepository {
  private repository: Repository<Warning>
  constructor() {
    this.repository = AppDataSource.getRepository(Warning)
  }

  async list(idStudent?: string): Promise<Warning[]> {
    const where = idStudent ? { student: { id: idStudent } as any } : {}
    return await this.repository.find({ where, order: { date: 'ASC' } })
  }

  async findById(warningId: string): Promise<Warning | null> {
    return await this.repository.findOne({ where: { id: warningId } })
  }

  async create({
    code,
    title,
    description,
    idStudent,
  }: INewWarningDTO): Promise<Warning> {
    const newWarning = this.repository.create({
      code,
      title,
      description,
      student: idStudent ? ({ id: idStudent } as any) : undefined,
    })
    await this.repository.save(newWarning)
    return newWarning
  }

  async getEntries(idStudent: string): Promise<number> {
    return await this.repository.count({ where: { student: { id: idStudent } as any } })
  }
}

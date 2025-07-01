import { Warning } from '../../entities/warning'
import { INewWarningDTO, IWarningsRepository } from './IWarningsRepository'

export class MockWarningsRepository implements IWarningsRepository {
  warnings: Warning[] = []

  async list(idStudent: string): Promise<Warning[]> {
    const warnings = this.warnings.filter(
      warning => (warning.student as any) === idStudent,
    )

    return warnings
  }

  async create({
    code,
    title,
    description,
    idStudent,
  }: INewWarningDTO): Promise<Warning> {
    const newWarning = {
      code,
      title,
      description,
      student: idStudent as any,
      id: Math.random().toString(),
      date: new Date(),
    }

    this.warnings.push(newWarning)

    return newWarning
  }

  async findById(idWarning: string): Promise<Warning> {
    return this.warnings.find(warning => warning.id === idWarning)
  }

  async getEntries(idStudent: string): Promise<number> {
    const warnings = this.warnings.filter(
      warning => (warning.student as any) === idStudent,
    )

    return warnings.length
  }
}

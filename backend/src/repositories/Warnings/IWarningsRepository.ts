import { Warning } from '../../entities/warning'

export interface INewWarningDTO {
  code?: string
  title: string
  description: string
  idStudent: string
}

export interface IWarningsRepository {
  list: (idStudent?: string) => Promise<Warning[]>
  create: (newWarningData: INewWarningDTO) => Promise<Warning>
  findById: (idWarning: string) => Promise<Warning>
  getEntries: (idStudent: string) => Promise<number>
}

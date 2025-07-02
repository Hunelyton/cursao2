import { inject, injectable } from 'tsyringe'
import { IAttendancesRepository } from '../../../repositories/Attendances/IAttendancesRepository'

@injectable()
export class ListAttendancesService {
  attendancesRepository: IAttendancesRepository
  constructor(@inject('AttendancesRepository') attendancesRepository: IAttendancesRepository) {
    this.attendancesRepository = attendancesRepository
  }

  async execute(studentId: string) {
    return await this.attendancesRepository.listByStudent(studentId)
  }
}

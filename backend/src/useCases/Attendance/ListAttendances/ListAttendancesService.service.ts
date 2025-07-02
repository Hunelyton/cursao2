import { inject, injectable } from 'tsyringe'
import { IAttendancesRepository } from '../../../repositories/Attendances/IAttendancesRepository'

@injectable()
export class ListAttendancesService {
  attendancesRepository: IAttendancesRepository
  constructor(@inject('AttendancesRepository') attendancesRepository: IAttendancesRepository) {
    this.attendancesRepository = attendancesRepository
  }

  async execute(studentId: string) {
    const attendances = await this.attendancesRepository.listByStudent(studentId)
    return attendances.map((att) => ({
      _id: att._id,
      date: att.date,
      subject: (att.subject as any)?.name || '',
      subjectId: (att.subject as any)?._id?.toString() || '',
    }))
  }
}

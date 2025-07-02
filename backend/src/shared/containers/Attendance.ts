import { container } from 'tsyringe'
import { AttendancesRepository } from '../../repositories/Attendances/AttendancesRepository'
import { IAttendancesRepository } from '../../repositories/Attendances/IAttendancesRepository'

container.registerSingleton<IAttendancesRepository>(
  'AttendancesRepository',
  AttendancesRepository,
)

import { container } from 'tsyringe'
import { IMaterialsRepository } from '../../repositories/Materials/IMaterialsRepository'
import { MaterialsRepository } from '../../repositories/Materials/MaterialsRepository'

container.registerSingleton<IMaterialsRepository>(
  'MaterialsRepository',
  MaterialsRepository,
)

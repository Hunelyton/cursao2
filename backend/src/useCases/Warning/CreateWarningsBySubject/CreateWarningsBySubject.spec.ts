import { Types } from 'mongoose'
import { MockWarningsRepository } from '../../../repositories/Warnings/MockWarningsRepository'
import { MockUsersRepository } from '../../../repositories/Users/MockUsersRepository'
import { MockSubjectsRepository } from '../../../repositories/Subjects/MockSubjectsRepository'
import { CreateWarningsBySubjectService } from './CreateWarningsBySubjectService.service'
import { CreateStudentService } from '../../Student/CreateStudent/CreateStudentService.service'
import { CreateNewSubjectService } from '../../Subject/CreateNewSubject/CreateNewSubjectService.service'

let mockWarningsRepository: MockWarningsRepository
let mockUsersRepository: MockUsersRepository
let mockSubjectsRepository: MockSubjectsRepository
let createWarningsBySubjectService: CreateWarningsBySubjectService
let createStudentService: CreateStudentService
let createSubjectService: CreateNewSubjectService

describe('Create warnings by subject', () => {
  beforeEach(() => {
    mockWarningsRepository = new MockWarningsRepository()
    mockUsersRepository = new MockUsersRepository()
    mockSubjectsRepository = new MockSubjectsRepository()
    createWarningsBySubjectService = new CreateWarningsBySubjectService(
      mockWarningsRepository,
      mockSubjectsRepository,
      mockUsersRepository,
    ) as any
    createStudentService = new CreateStudentService(mockUsersRepository)
    createSubjectService = new CreateNewSubjectService(mockSubjectsRepository)
  })

  it('should create warnings for all students in subject', async () => {
    const teacherId = new Types.ObjectId().toString()
    const student1 = await createStudentService.execute({
      name: 'John',
      email: 'john@example.com',
      password: '1234',
      idTeacher: teacherId,
    })
    const student2 = await createStudentService.execute({
      name: 'Jane',
      email: 'jane@example.com',
      password: '1234',
      idTeacher: teacherId,
    })

    const subject = await createSubjectService.execute({
      name: 'Math',
      idTeacher: teacherId,
    })

    await mockSubjectsRepository.insertStudent({
      subjectId: subject._id.toString(),
      studentsIds: [student1._id.toString(), student2._id.toString()],
    })

    const warnings = await createWarningsBySubjectService.execute({
      idSubject: subject._id.toString(),
      title: 'Aviso',
      description: 'Prova amanhã',
    })

    expect(warnings).toHaveLength(2)
  })
})

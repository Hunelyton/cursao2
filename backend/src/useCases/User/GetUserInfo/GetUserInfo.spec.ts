import { AppError } from '../../../shared/errors/AppError'
import { MockUsersRepository } from './../../../repositories/Users/MockUsersRepository'
import { GetUserInfoService } from './GetUserInfoService.service'
import { CreateNewUserService } from '../CreateNewUser/CreateNewUserService.service'

let mockUsersRepository: MockUsersRepository

let getUserInfoService: GetUserInfoService
let createNewUserService: CreateNewUserService

describe('Get user info', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository()

    getUserInfoService = new GetUserInfoService(mockUsersRepository)
    createNewUserService = new CreateNewUserService(mockUsersRepository)
  })

  it('should not be able search user info if idUser not sent', async () => {
    await expect(async () => {
      await getUserInfoService.execute(undefined)
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able search user info if idUser is from invalid user', async () => {
    await expect(async () => {
      const idUser = 'invalid-id'

      await getUserInfoService.execute(idUser)
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should be able search user info', async () => {
    const newUser = await createNewUserService.execute({
      name: 'Teste',
      email: 'teste@teste.com',
      password: '123456',
      occupation: 'student',
    })

    const createdUser = await mockUsersRepository.findById(newUser.id)

    expect(createdUser).toBeDefined()
  })
})

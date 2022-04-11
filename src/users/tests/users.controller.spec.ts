import { Test, TestingModule } from '@nestjs/testing'
import { dbSimUser, newMockedUser } from '../../utils/fixtures'
import { UsersController } from '../users.controller'
import { UsersService } from '../users.service'

describe('UsersController', () => {
  let controller: UsersController
  let service: Partial<UsersService> = {
    create: jest.fn().mockImplementation(() => dbSimUser),
    findOne: jest.fn().mockImplementation(() => dbSimUser),
    update: jest
      .fn()
      .mockImplementation(() => ({ ...dbSimUser, name: 'Joao da Silva' })),
    remove: jest
      .fn()
      .mockImplementation(() => ({ ...dbSimUser, deletedAt: new Date() })),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: service,
        },
      ],
    }).compile()

    controller = module.get<UsersController>(UsersController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('should call sucessful methods', () => {
    it('to create a user', async () => {
      const user = await controller.create(newMockedUser)
      expect(user.id).toBe(dbSimUser.id)
    })
    it('to findOne a user', async () => {
      const user = await controller.findOne(dbSimUser.id)
      expect(user.id).toBe(dbSimUser.id)
    })
    it('to update a user', async () => {
      const user = await controller.update(dbSimUser.id, newMockedUser)
      expect(user.name).toBe('Joao da Silva')
    })
    it('to remove a user', async () => {
      const user = await controller.remove(dbSimUser.id)
      expect(user.deletedAt).toBeDefined()
    })
  })
})

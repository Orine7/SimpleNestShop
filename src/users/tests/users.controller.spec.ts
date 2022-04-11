import { Test, TestingModule } from '@nestjs/testing'
import { UsersController } from '../users.controller'
import { UsersService } from '../users.service'

describe('UsersController', () => {
  let controller: UsersController
  let service: Partial<UsersService> = {
    create: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
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
    it('to create a user', () => {})
    it('to create a user', () => {})
    it('to create a user', () => {})
    it('to create a user', () => {})
  })
})

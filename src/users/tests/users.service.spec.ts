import { Test, TestingModule } from '@nestjs/testing'
import { newMockedUser } from '../../utils/fixtures'
import { UsersService } from '../users.service'

describe('UsersService', () => {
  let service: UsersService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile()

    service = module.get<UsersService>(UsersService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('should call sucessful methods', () => {
    it('should create a user', () => {
      expect(service.create(newMockedUser)).toBe('This action adds a new user')
    })

    it('should return all users', () => {
      expect(service.findAll()).toBe('This action returns all users')
    })

    it('should return a user', () => {
      expect(service.findOne(1)).toBe('This action returns a #1 user')
    })

    it('should update a user', () => {
      expect(service.update(1, {})).toBe('This action updates a #1 user')
    })

    it('should remove a user', () => {
      expect(service.remove(1)).toBe('This action removes a #1 user')
    })
  })
})

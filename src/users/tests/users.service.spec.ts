import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Order } from '../../orders/entities/order.entity'
import { connectionTestOptions } from '../../ormconfig'
import { Product } from '../../products/entities/product.entity'
import { newMockedUser } from '../../utils/fixtures'
import { User } from '../entities/user.entity'
import { UsersService } from '../users.service'

describe('UsersService', () => {
  let service: UsersService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
      imports: [
        TypeOrmModule.forRootAsync(
          connectionTestOptions([User, Order, Product]),
        ),
        TypeOrmModule.forFeature([User]),
        ConfigModule,
      ],
    }).compile()

    service = module.get<UsersService>(UsersService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('should call sucessful methods', () => {
    let user: User
    it('to create a user', async () => {
      user = await service.create(newMockedUser)
      expect(user).toBeInstanceOf(User)
      expect(user.name).toBe(newMockedUser.name)
    })

    it('to return a user', async () => {
      const found = await service.findOne(user.id)
      expect(found).toBeInstanceOf(User)
      expect(found.name).toBe(user.name)
    })

    it('to update a user', async () => {
      const updated = await service.update(user.id, {
        name: 'Joao da Silva',
      })
      expect(updated).toBeInstanceOf(User)
      expect(updated.name).toBe('Joao da Silva')
      expect(updated.id).toBe(user.id)
    })

    it('to remove a user', async () => {
      const removed = await service.remove(user.id)
      expect(removed).toBeInstanceOf(User)
      expect(removed.id).toBe(user.id)
      expect(removed.deletedAt).toBeInstanceOf(Date)
      expect(removed.deletedAt).toBeDefined()
    })

    it('to return a deleted user', async () => {
      const found = await service.findOne(user.id)
      expect(found).toBeInstanceOf(User)
      expect(found.id).toBe(user.id)
      expect(found.name).toBe('Joao da Silva')
    })
  })
})

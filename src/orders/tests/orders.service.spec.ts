import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { connectionTestOptions } from '../../ormconfig'
import { Product } from '../../products/entities/product.entity'
import { User } from '../../users/entities/user.entity'
import { newMockedOrder } from '../../utils/fixtures'
import { Order } from '../entities/order.entity'
import { OrdersService } from '../orders.service'

describe('OrdersService', () => {
  let service: OrdersService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersService],
      imports: [
        TypeOrmModule.forRootAsync(
          connectionTestOptions([Order, Product, User]),
        ),
        TypeOrmModule.forFeature([Order]),
      ],
    }).compile()

    service = module.get<OrdersService>(OrdersService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('should call sucessful methods', () => {
    it('should create an order', async () => {
      const order = await service.create(newMockedOrder)
      expect(order).toBeDefined()
      console.log(order)
    })

    it('should find all orders', async () => {
      const orders = await service.findAll()
      expect(orders).toBeDefined()
    })

    it('should find one order', async () => {
      const order = await service.findOne('id')
      expect(order).toBeDefined()
    })

    it('should update an order', async () => {
      const order = await service.update('id', {})
      expect(order).toBeDefined()
    })

    it('should remove an order', async () => {
      const order = await service.remove('id')
      expect(order).toBeDefined()
    })
  })
})

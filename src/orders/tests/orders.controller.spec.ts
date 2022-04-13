import { Test, TestingModule } from '@nestjs/testing'
import { dbSimOrder } from '../../utils/fixtures'
import { OrderStatus } from '../../utils/orderStatus'
import { OrdersController } from '../orders.controller'
import { OrdersService } from '../orders.service'

describe('OrdersController', () => {
  let controller: OrdersController
  let service: Partial<OrdersService> = {
    create: jest.fn().mockImplementation(() => dbSimOrder),
    findOne: jest.fn().mockImplementation(() => dbSimOrder),
    update: jest
      .fn()
      .mockImplementation(() => ({ ...dbSimOrder, quantity: 2 })),
    remove: jest.fn().mockImplementation(() => ({
      ...dbSimOrder,
      deletedAt: new Date(),
      status: OrderStatus.CANCELED,
    })),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [{ provide: OrdersService, useValue: service }],
    }).compile()

    controller = module.get<OrdersController>(OrdersController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})

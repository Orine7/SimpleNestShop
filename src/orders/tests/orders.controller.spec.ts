import { Test, TestingModule } from '@nestjs/testing'
import { dbSimOrder, newMockedOrder } from '../../utils/fixtures'
import { OrderStatus } from '../../utils/orderStatus'
import { OrdersController } from '../orders.controller'
import { OrdersService } from '../orders.service'

describe('OrdersController', () => {
  let controller: OrdersController
  let service: Partial<OrdersService> = {
    create: jest.fn().mockImplementation(() => dbSimOrder),
    findAllBy: jest.fn().mockImplementation(() => [dbSimOrder]),
    findOne: jest.fn().mockImplementation(() => dbSimOrder),
    executeOrder: jest.fn().mockImplementation(() => ({
      ...dbSimOrder,
      status: OrderStatus.FINISHED,
    })),
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

  describe('should be successful method calls', () => {
    it('to create an order', async () => {
      const result = await controller.create(newMockedOrder)
      expect(result).toMatchObject(dbSimOrder)
    })
    it('to find all orders', async () => {
      const result = await controller.findAll()
      expect(result).toBeInstanceOf(Array)
      expect(result).toHaveLength(1)
      expect(result).toMatchObject([dbSimOrder])
    })
    it('to find one order', async () => {
      const result = await controller.findOne(dbSimOrder.id)
      expect(result).toMatchObject(dbSimOrder)
    })
    it('to update an order', async () => {
      const result = await controller.update(dbSimOrder.id, {
        quantity: 2,
      })
      expect(result.quantity).toBe(2)
    })
    it('to execute an order', async () => {
      const result = await controller.executeOrder(dbSimOrder.id)
      expect(result.status).toBe(OrderStatus.FINISHED)
    })
    it('to remove an order', async () => {
      const result = await controller.remove(dbSimOrder.id)
      expect(result.status).toBe(OrderStatus.CANCELED)
    })
  })
})

import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Between, getConnection } from 'typeorm'
import { connectionTestOptions } from '../../ormconfig'
import { Product } from '../../products/entities/product.entity'
import { User } from '../../users/entities/user.entity'
import { DBseeder, newMockedOrder } from '../../utils/fixtures'
import { OrderStatus } from '../../utils/orderStatus'
import { Order } from '../entities/order.entity'
import { OrdersService } from '../orders.service'

describe('OrdersService', () => {
  let service: OrdersService
  let mockedUser: User
  let mockedDisk: Product
  let mockedOrder: Order
  let generatedOrders: Order[]
  let generatedProducts: Product[]
  let generatedUsers: User[]

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
    const { fixed, generated } = await DBseeder()
    mockedUser = fixed.mockedUser
    mockedDisk = fixed.mockedDisk
    mockedOrder = fixed.mockedOrder

    generatedOrders = generated.orders
    generatedProducts = generated.disks
    generatedUsers = generated.users
  })

  afterAll(async () => {
    await getConnection().close()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('should call sucessful methods', () => {
    let order: Order
    it('to create an order', async () => {
      order = await service.create(newMockedOrder)
      expect(order).toBeInstanceOf(Order)
      expect(order).toMatchObject(newMockedOrder)
    })

    it('to find all orders', async () => {
      const found = await service.findAllBy()
      expect(found).toBeInstanceOf(Array)
      expect(found[0]).toBeInstanceOf(Order)
      expect(found[0]).toMatchObject(newMockedOrder)
    })

    it('to find all orders with one user', async () => {
      const found = await service.findAllBy({ user: { id: mockedUser.id } })
      expect(found).toBeInstanceOf(Array)
      expect(found[0]).toBeInstanceOf(Order)
      expect(found[0]).toMatchObject(newMockedOrder)
    })

    it('to find all orders between dates', async () => {
      const found = await service.findAllBy({
        createdAt: Between(new Date('01/01/2020'), new Date('01/02/2021')),
      })
      expect(found).toBeInstanceOf(Array)
      expect(found).toHaveLength(0)
    })

    it('to find one order', async () => {
      const order = await service.findOne(mockedOrder.id)
      expect(order).toBeDefined()
      expect(order).toBeInstanceOf(Order)
      expect(order.user).toMatchObject(mockedUser)
      expect(order.products[0]).toMatchObject(mockedDisk)
    })

    it('to update an order', async () => {
      const order = await service.update(mockedOrder.id, {
        status: OrderStatus.FINISHED,
      })
      expect(order).toBeDefined()
      expect(order).toBeInstanceOf(Order)
      expect(order.status).toBe(OrderStatus.FINISHED)
    })

    it('to remove an order', async () => {
      const order = await service.remove(mockedOrder.id)
      expect(order).toBeDefined()
      expect(order).toBeInstanceOf(Order)
      expect(order.deletedAt).toBeDefined()
      expect(order.status).toBe(OrderStatus.CANCELED)
    })
  })
})

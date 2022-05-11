import { Test, TestingModule } from '@nestjs/testing'
import { dbSimDisk, newMockedDisk } from '../../utils/fixtures'
import { ProductsController } from '../products.controller'
import { ProductsService } from '../products.service'

describe('ProductsController', () => {
  let controller: ProductsController
  let service: Partial<ProductsService> = {
    create: jest.fn().mockImplementation(() => dbSimDisk),
    findAllBy: jest.fn().mockImplementation(() => [dbSimDisk]),
    findOne: jest.fn().mockImplementation(() => dbSimDisk),
    update: jest
      .fn()
      .mockImplementation(() => ({ ...dbSimDisk, name: 'Novo Disco!' })),
    remove: jest
      .fn()
      .mockImplementation(() => ({ ...dbSimDisk, deletedAt: new Date() })),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [{ provide: ProductsService, useValue: service }],
    }).compile()

    controller = module.get<ProductsController>(ProductsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('should call sucessful methods', () => {
    it('to create a product', async () => {
      const result = await controller.create(newMockedDisk)
      expect(result).toMatchObject(dbSimDisk)
    })
    it('to find all products', async () => {
      const result = await controller.findAll()
      expect(result).toBeInstanceOf(Array)
      expect(result).toHaveLength(1)
      expect(result).toMatchObject([dbSimDisk])
    })
    it('to find one product', async () => {
      const result = await controller.findOne(dbSimDisk.id)
      expect(result).toMatchObject(dbSimDisk)
    })
    it('to update a product', async () => {
      const result = await controller.update(dbSimDisk.id, {
        name: 'Novo Disco!',
      })
      expect(result.name).toBe('Novo Disco!')
    })
    it('to remove a product', async () => {
      const result = await controller.remove(dbSimDisk.id)
      expect(result.deletedAt).toBeDefined()
    })
  })
})

import { Test, TestingModule } from '@nestjs/testing'
import { dbSimDisk } from '../../utils/fixtures'
import { ProductsController } from '../products.controller'
import { ProductsService } from '../products.service'

describe('ProductsController', () => {
  let controller: ProductsController
  let service: Partial<ProductsService> = {
    create: jest.fn().mockImplementation(() => dbSimDisk),
    findOne: jest.fn().mockImplementation(() => dbSimDisk),
    update: jest
      .fn()
      .mockImplementation(() => ({ ...dbSimDisk, name: 'Joao da Silva' })),
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
})

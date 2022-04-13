import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { connectionTestOptions } from '../../ormconfig'
import { newMockedDisk } from '../../utils/fixtures'
import { Product } from '../entities/product.entity'
import { ProductsService } from '../products.service'

describe('ProductsService', () => {
  let service: ProductsService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
      imports: [
        TypeOrmModule.forRootAsync(connectionTestOptions([Product])),
        TypeOrmModule.forFeature([Product]),
        ConfigModule,
      ],
    }).compile()

    service = module.get<ProductsService>(ProductsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('should call sucessful methods', () => {
    let product: Product
    it('to create a product', async () => {
      product = await service.create(newMockedDisk)
      expect(product).toBeInstanceOf(Product)
      expect(product).toMatchObject(newMockedDisk)
    })
    it('to return all products', async () => {
      const products = await service.findAll()
      expect(products).toBeInstanceOf(Array)
      expect(products).toHaveLength(1)
      expect(products[0]).toBeInstanceOf(Product)
      expect(products[0]).toMatchObject(newMockedDisk)
    })
    it('to return one product', async () => {
      const found = await service.findOne(product.id)
      expect(found).toBeInstanceOf(Product)
      expect(found).toMatchObject(newMockedDisk)
    })
    it('to update a product', async () => {
      const updated = await service.update(product.id, {
        name: 'New Disk',
      })
      expect(updated).toBeInstanceOf(Product)
      expect(updated).toMatchObject({
        ...newMockedDisk,
        name: 'New Disk',
      })
    })
    it('to remove a product', async () => {
      const removed = await service.remove(product.id)
      expect(removed).toBeInstanceOf(Product)
      expect(removed).toMatchObject({
        ...newMockedDisk,
        name: 'New Disk',
      })
    })
  })
})

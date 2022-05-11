import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm'
import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Order } from '../../orders/entities/order.entity'
import { connectionTestOptions } from '../../ormconfig'
import { User } from '../../users/entities/user.entity'
import { DBseeder, newMockedDisk } from '../../utils/fixtures'
import { Product } from '../entities/product.entity'
import { ProductsService } from '../products.service'

describe('ProductsService', () => {
  let service: ProductsService
  let connection: DataSource
  let mockedUser: User
  let mockedDisk: Product
  let mockedOrder: Order
  let generatedOrders: Order[]
  let generatedProducts: Product[]
  let generatedUsers: User[]

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
      imports: [
        TypeOrmModule.forRootAsync(
          connectionTestOptions([Product, User, Order]),
        ),
        TypeOrmModule.forFeature([Product]),
        ConfigModule,
      ],
    }).compile()
    connection = module.get(getDataSourceToken())
    const { fixed, generated } = await DBseeder(connection, 3)
    mockedUser = fixed.mockedUser
    mockedDisk = fixed.mockedDisk
    mockedOrder = fixed.mockedOrder

    generatedOrders = generated.orders
    generatedProducts = generated.disks
    generatedUsers = generated.users

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
      const products = await service.findAllBy()
      expect(products).toBeInstanceOf(Array)
      expect(products).toHaveLength(5)
      expect(products[0]).toBeInstanceOf(Product)
      expect(products[0]).toMatchObject(newMockedDisk)
    })

    it('to return all products with filters', async () => {
      const productByName = await service.findAllBy({
        name: generatedProducts[0].name,
      })
      expect(productByName).toBeInstanceOf(Array)
      expect(productByName).toHaveLength(1)
      expect(productByName[0]).toBeInstanceOf(Product)
      expect(productByName[0]).toMatchObject(generatedProducts[0])

      const productByYear = await service.findAllBy({
        releaseYear: generatedProducts[1].releaseYear,
      })
      expect(productByYear).toBeInstanceOf(Array)
      expect(productByYear).toHaveLength(1)
      expect(productByYear[0]).toBeInstanceOf(Product)
      expect(productByYear[0]).toMatchObject(generatedProducts[1])

      const productByGenre = await service.findAllBy({
        genre: generatedProducts[2].genre,
      })
      expect(productByGenre).toBeInstanceOf(Array)
      expect(productByGenre[0]).toBeInstanceOf(Product)
      expect(productByGenre[0]).toMatchObject(generatedProducts[2])

      const productByArtist = await service.findAllBy({
        artist: generatedProducts[0].artist,
      })
      expect(productByArtist).toBeInstanceOf(Array)
      expect(productByArtist).toHaveLength(1)
      expect(productByArtist[0]).toBeInstanceOf(Product)
      expect(productByArtist[0]).toMatchObject(generatedProducts[0])
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

import { CreateOrderDto } from '../orders/dto/create-order.dto'
import { Order } from '../orders/entities/order.entity'
import { CreateProductDto } from '../products/dto/create-product.dto'
import { Product } from '../products/entities/product.entity'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { User } from '../users/entities/user.entity'
import { ProductType } from './productTypes'

export const newMockedUser: CreateUserDto = {
  birthDate: new Date('1995-10-25'),
  email: 'johndoe@gmail.com',
  document: '12345678912',
  name: 'John Doe',
  phone: '+5511999999999',
}
let mockedUser = new User(newMockedUser)

export const newMockedDisk: CreateProductDto = {
  name: 'We are Reactive',
  type: ProductType.DISK,
  genre: 'Indie',
  artist: 'Hohpe',
  releaseYear: new Date('2022-04-08'),
  quantity: 500,
}

let mockedDisk = new Product(newMockedDisk)

export const newMockedOrder: CreateOrderDto = {
  quantity: 5,
  products: [mockedDisk],
  user: mockedUser,
}

let mockedOrder = new Order(newMockedOrder)

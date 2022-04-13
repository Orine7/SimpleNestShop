import { faker } from '@faker-js/faker'
import * as fakerBr from 'faker-br'
import { getConnection } from 'typeorm'
import { CreateOrderDto } from '../orders/dto/create-order.dto'
import { Order } from '../orders/entities/order.entity'
import { CreateProductDto } from '../products/dto/create-product.dto'
import { Product } from '../products/entities/product.entity'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { User } from '../users/entities/user.entity'
import { OrderStatus } from './orderStatus'
import { ProductType } from './productTypes'

faker.locale = 'pt_BR'

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
  status: OrderStatus.PENDING,
}

let mockedOrder = new Order(newMockedOrder)

export async function DBseeder(quantity = 1) {
  const connection = getConnection()
  const entityManager = connection.createEntityManager()
  await entityManager.save(mockedUser)
  await entityManager.save(mockedDisk)
  await entityManager.save(mockedOrder)
  const { disks, users, orders } = generateFixture(quantity)
  await entityManager.save(users)
  await entityManager.save(disks)
  await entityManager.save(orders)
  return {
    fixed: { mockedUser, mockedDisk, mockedOrder },
    generated: { disks, users, orders },
  }
}

function generateFixture(quantity = 1) {
  const disks = []
  const users = []
  const orders = []
  for (let i = 0; i < quantity; i++) {
    const newDisk = new Product({
      artist: faker.name.findName(),
      genre: faker.music.genre(),
      name: faker.commerce.productName(),
      releaseYear: faker.date.past(),
      quantity: faker.datatype.number(),
      type: ProductType.DISK,
    })

    const newUser = new User({
      birthDate: faker.date.past(),
      email: faker.internet.email(),
      document: fakerBr.br.cpf(),
      name: faker.name.findName(),
      phone: faker.phone.phoneNumber(),
    })

    const newOrder = new Order({
      quantity: faker.datatype.number(),
      products: [newDisk],
      user: newUser,
      status: faker.random.arrayElement(Object.values(OrderStatus)),
    })

    disks.push(newDisk)
    users.push(newUser)
    if (Math.random() > 0.5) {
      orders.push(newOrder)
    }
  }
  return { disks, users, orders }
}

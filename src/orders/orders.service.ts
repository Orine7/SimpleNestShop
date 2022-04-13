import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, FindOptionsWhere, IsNull, Repository } from 'typeorm'
import { OrderStatus } from '../utils/orderStatus'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { Order } from './entities/order.entity'

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const order = new Order(createOrderDto)
    return await this.orderRepo.save(order)
  }

  async findAllBy(search?: FindOptionsWhere<Order>) {
    const conditions: FindManyOptions<Order> = {
      where: { ...search, deletedAt: IsNull() },
      relations: ['user', 'products'],
    }
    return await this.orderRepo.find(conditions)
  }

  async findOne(id: string, search?: FindOptionsWhere<Order>) {
    return await this.orderRepo.findOne({
      where: { id, deletedAt: IsNull(), ...search },
      relations: ['user', 'products'],
    })
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.findOne(id)
    Object.keys(updateOrderDto).forEach((key) => {
      order[key] = updateOrderDto[key]
    })
    return await this.orderRepo.save(order)
  }

  async remove(id: string) {
    const order = await this.findOne(id)
    order.status = OrderStatus.CANCELED
    await this.orderRepo.save(order)
    await this.orderRepo.softRemove(order)
    return order
  }
}

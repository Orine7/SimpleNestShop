import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
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

  async findAll() {
    return `This action returns all orders`
  }

  async findOne(id: string) {
    return `This action returns a #${id} order`
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`
  }

  async remove(id: string) {
    return `This action removes a #${id} order`
  }
}

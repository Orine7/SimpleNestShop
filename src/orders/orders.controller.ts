import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { OrdersService } from './orders.service'

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto)
  }

  @Get()
  findAll() {
    return this.ordersService.findAllBy()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id)
  }

  @Patch('execute/:id')
  async executeOrder(@Param('id') id: string) {
    return this.ordersService.executeOrder(id)
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    const failConditions = {
      FINISHED: () => {
        throw new Error(`You can't finish an order on this route`)
      },
      CANCELED: () => {
        throw new Error(`You can't cancel an order on this route`)
      },
      DEFAULT: async () => {
        return await this.ordersService.update(id, updateOrderDto)
      },
    }
    const isValid = typeof failConditions[updateOrderDto.status] === 'function'

    const updated = isValid
      ? failConditions[updateOrderDto.status]()
      : await failConditions.DEFAULT()
    return updated
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id)
  }
}

import { Product } from '../../products/entities/product.entity'
import { User } from '../../users/entities/user.entity'
import { OrderStatus } from '../../utils/orderStatus'

export class CreateOrderDto {
  quantity: number
  products: Product[]
  user: User
  status: OrderStatus = OrderStatus.PENDING
}

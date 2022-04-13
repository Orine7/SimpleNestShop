import { Product } from '../../products/entities/product.entity'
import { User } from '../../users/entities/user.entity'

export class CreateOrderDto {
  quantity: number
  products: Product[]
  user: User
}

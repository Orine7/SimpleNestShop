import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Product } from '../../products/entities/product.entity'
import { User } from '../../users/entities/user.entity'
import { OrderStatus } from '../../utils/orderStatus'
import { CreateOrderDto } from '../dto/create-order.dto'

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  quantity: number

  @Column({ enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus = OrderStatus.PENDING

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[]

  @ManyToOne(() => User, (user) => user.orders)
  user: User

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date

  constructor(order: CreateOrderDto) {
    Object.assign(this, order)
  }
}

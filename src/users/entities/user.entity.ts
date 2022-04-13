import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Order } from '../../orders/entities/order.entity'
import { CreateUserDto } from '../dto/create-user.dto'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  document: string

  @Column()
  name: string

  @Column()
  birthDate: Date

  @Column({ unique: true })
  email: string

  @Column()
  phone: string

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[]

  @DeleteDateColumn()
  deletedAt: Date

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  constructor(user: CreateUserDto) {
    Object.assign(this, user)
  }
}

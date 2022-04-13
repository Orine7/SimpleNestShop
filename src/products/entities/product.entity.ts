import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { ProductType } from '../../utils/productTypes'
import { CreateProductDto } from '../dto/create-product.dto'

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({ enum: ProductType })
  type: ProductType

  @Column()
  genre: string

  @Column({ default: 0 })
  quantity: number

  @Column()
  releaseYear: Date

  @Column()
  artist: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date

  constructor(product: CreateProductDto) {
    Object.assign(this, product)
  }
}

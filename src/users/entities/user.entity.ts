import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
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

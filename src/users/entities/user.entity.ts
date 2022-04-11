import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { CreateUserDto } from '../dto/create-user.dto'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  document: string

  @Column()
  name: string

  @Column()
  birthDate: string

  @Column()
  email: string

  @Column()
  phone: string
  constructor(user: CreateUserDto) {
    Object.assign(this, user)
  }
}

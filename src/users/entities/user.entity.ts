import { CreateUserDto } from '../dto/create-user.dto'

export class User {
  constructor(user: CreateUserDto) {
    Object.assign(this, user)
  }
}

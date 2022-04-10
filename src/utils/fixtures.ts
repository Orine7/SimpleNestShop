import { CreateUserDto } from '../users/dto/create-user.dto'
import { User } from '../users/entities/user.entity'

export const newMockedUser: CreateUserDto = {}
const mockedUser = new User(CreateUserDto)

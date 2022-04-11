import { CreateUserDto } from '../users/dto/create-user.dto'
import { User } from '../users/entities/user.entity'

export const newMockedUser: CreateUserDto = {
  birthDate: new Date(),
  email: 'johndoe@gmail.com',
  document: '12345678912',
  name: 'John Doe',
  phone: '+5511999999999',
}
const mockedUser = new User(newMockedUser)

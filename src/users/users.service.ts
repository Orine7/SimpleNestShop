import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = new User(createUserDto)
    await this.userRepo.save(user)
    return user
  }

  async findOne(id: string) {
    return await this.userRepo.findOneByOrFail({ id })
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id)
    Object.keys(updateUserDto).forEach((key) => {
      user[key] = updateUserDto[key]
    })
    return await this.userRepo.save(user)
  }

  async remove(id: string) {
    const user = await this.findOne(id)
    await this.userRepo.softRemove(user)
    return user
  }
}

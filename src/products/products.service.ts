import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IsNull, Repository } from 'typeorm'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { Product } from './entities/product.entity'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const product = new Product(createProductDto)
    return await this.productRepo.save(product)
  }

  async findAll() {
    return await this.productRepo.find({ where: { deletedAt: IsNull() } })
  }

  async findOne(id: string) {
    return await this.productRepo.findOneByOrFail({ id })
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const user = await this.findOne(id)
    Object.keys(updateProductDto).forEach((key) => {
      user[key] = updateProductDto[key]
    })
    return await this.productRepo.save(user)
  }

  async remove(id: string) {
    const user = await this.findOne(id)
    await this.productRepo.softRemove(user)
    return user
  }
}

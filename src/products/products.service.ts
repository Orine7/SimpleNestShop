import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, FindOptionsWhere, IsNull, Repository } from 'typeorm'
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

  async findAllBy(search?: FindOptionsWhere<Product>) {
    const conditions: FindManyOptions<Product> = {
      where: { ...search, deletedAt: IsNull() },
    }
    return await this.productRepo.find(conditions)
  }

  async findOne(id: string) {
    return await this.productRepo.findOneByOrFail({ id })
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id)
    Object.keys(updateProductDto).forEach((key) => {
      product[key] = updateProductDto[key]
    })
    return await this.productRepo.save(product)
  }

  async remove(id: string) {
    const product = await this.findOne(id)
    await this.productRepo.softRemove(product)
    return product
  }
}

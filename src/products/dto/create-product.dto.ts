import { ProductType } from '../../utils/productTypes'

export class CreateProductDto {
  name: string
  type: ProductType
  genre: string
  quantity: number
  artist: string
  releaseYear: Date
}

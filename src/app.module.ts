import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrdersModule } from './orders/orders.module'
import { connectionOptions } from './ormconfig'
import { ProductsModule } from './products/products.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(connectionOptions()),
    OrdersModule,
    UsersModule,
    ProductsModule,
  ],
  providers: [],
})
export class AppModule {}

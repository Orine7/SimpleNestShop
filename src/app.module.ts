import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [OrdersModule, UsersModule, ProductsModule],
  providers: [],
})
export class AppModule {}

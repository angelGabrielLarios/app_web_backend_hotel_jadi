import { Module } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCartController } from './shopping-cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartDetailsModule } from 'src/cart-details/cart-details.module';
import { ShoppingCart } from './entities/shopping-cart.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([ShoppingCart]),
    CartDetailsModule,
  ],
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService],

})
export class ShoppingCartModule { }

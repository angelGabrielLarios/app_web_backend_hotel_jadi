import { Module } from '@nestjs/common';
import { CartDetailsService } from './cart-details.service';
import { CartDetailsController } from './cart-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartDetail } from './entities/cart-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartDetail])],
  controllers: [CartDetailsController],
  providers: [CartDetailsService],
  exports: [CartDetailsService]

})
export class CartDetailsModule { }

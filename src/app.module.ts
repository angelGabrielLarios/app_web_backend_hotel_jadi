import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { EmailModule } from './email/email.module';
import { TokensModule } from './tokens/tokens.module';
import { Token } from './tokens/entities/token.entity';
import { ProductsModule } from './products/products.module';
import { Product } from './products/entities/product.entity';
import { SectionsModule } from './sections/sections.module';
import { Section } from './sections/entities/section.entity';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { ShoppingCart } from './shopping-cart/entities/shopping-cart.entity';
import { CartDetailsModule } from './cart-details/cart-details.module';
import { CartDetail } from './cart-details/entities/cart-detail.entity';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.host,
      port: parseInt(process.env.port),
      username: process.env.username,
      password: process.env.password,
      database: process.env.database,
      entities: [User, Token, Product, Section, ShoppingCart, CartDetail],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    EmailModule,
    TokensModule,
    ProductsModule,
    SectionsModule,
    ShoppingCartModule,
    CartDetailsModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule { }

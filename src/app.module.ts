import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { EmailModule } from './email/email.module';
import { User } from './users/entities/user.entity';
import { BedroomsModule } from './bedrooms/bedrooms.module';
import { ReservationsModule } from './reservations/reservations.module';
import { Bedroom } from './bedrooms/entities/bedroom.entity';
import { Reservation } from './reservations/entities/reservation.entity';



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
      entities: [User, Bedroom, Reservation],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    EmailModule,
    BedroomsModule,
    ReservationsModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule { }

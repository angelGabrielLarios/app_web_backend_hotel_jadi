import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }

  async findOneByEmail(email: string): Promise<User> {

    const user = await this.userRepository.findOne({
      where: {
        email: email
      }
    })
    return user

  }

  async save(createUserDto: CreateUserDto) {
    const user = await this.userRepository.save(createUserDto)
    return user
  }


  async restorePassword({ email, newPassword }: { email: string, newPassword: string }) {

    console.log(newPassword, 'desde user.service.ts')
    const updateUser = await this.userRepository.update({ email: email }, {
      password: newPassword,

    })

    return updateUser
  }

}

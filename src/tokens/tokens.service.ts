import { Injectable } from '@nestjs/common';

import { Token } from './entities/token.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TokensService {

  constructor(
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
    private jwtService: JwtService,
  ) { }

  async save(user: User) {

    const payload = { userId: user.id, email: user.email }

    const tokenGenerated = this.jwtService.sign(payload)

    // Buscar y eliminar el token existente del usuario, si existe
    const existingToken = await this.tokenRepository.findOne({ where: { user: user } });
    if (existingToken) {
      await this.tokenRepository.remove(existingToken);
    }

    await this.tokenRepository.save({
      user: user,
      token: tokenGenerated
    })

    return {
      tokenGenerated
    }

  }

  async validateToken({ token }: { token: string }) {

    const rowToken = await this.tokenRepository.findOne({
      where: {
        token: token
      }
    })

    return {
      isValidateToken: rowToken ? true : false
    }
  }


  async remove({ tokenText }: { tokenText: string }) {
    const tokenRemove = await this.tokenRepository.findOne({ where: { token: tokenText } })
    return await this.tokenRepository.remove(tokenRemove)
  }

}

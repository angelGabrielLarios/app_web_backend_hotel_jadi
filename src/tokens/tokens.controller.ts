import { Controller, Get, Param } from '@nestjs/common';
import { TokensService } from './tokens.service';


@Controller('tokens')
export class TokensController {
  constructor(private readonly tokensService: TokensService) { }

  @Get('validate-token/:token')
  validateToken(
    @Param('token') token: string
  ) {
    return this.tokensService.validateToken({
      token
    })
  }

}

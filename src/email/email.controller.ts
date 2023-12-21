import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { CreateEmailDto } from './dto/create-email.dto';


@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) { }

  /*  @Get()
   sendEmail() {
     return this.emailService.sendEmail();
   } */

  @Post()
  sendEmail(@Body() createEmailDto: CreateEmailDto) {
    return this.emailService.sendEmail(createEmailDto);
  }


}

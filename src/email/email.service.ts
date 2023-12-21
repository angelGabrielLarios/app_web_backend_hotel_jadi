import { Injectable } from '@nestjs/common';
import { Resend } from 'resend'
import { ConfigService } from '@nestjs/config';
import { CreateEmailDto } from './dto/create-email.dto';
@Injectable()
export class EmailService {

  constructor(private configService: ConfigService) { }

  async sendEmail({ html }: CreateEmailDto) {
    try {
      const apiKeyResend = this.configService.get<string>('apiKeyResend');
      const resend: Resend = new Resend(apiKeyResend)
      const response = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: [`lariosacostaa@gmail.com`],
        subject: 'Hello World',
        html: html,


      })

      return response
    } catch (error) {
      console.log(error)
      throw new Error(`thing wrong`)
    }
  }

}

import { Injectable } from '@nestjs/common';
import { Resend } from 'resend'
import { ConfigService } from '@nestjs/config';
@Injectable()
export class EmailService {

  constructor(private configService: ConfigService) { }

  async sendEmail({ email }: { email: string }) {
    try {
      const apiKeyResend = this.configService.get<string>('apiKeyResend');
      const resend: Resend = new Resend(apiKeyResend)
      const response = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: [`${email}`],
        subject: 'Hello World',
        html: '<strong>It works!</strong>'
      })

      return response
    } catch (error) {
      console.log(error)
      throw new Error(`thing wrong`)
    }
  }

}

import { BadRequestException, Injectable } from '@nestjs/common';
import { Resend } from 'resend'
import { ConfigService } from '@nestjs/config';
import { CreateEmailDto } from './dto/create-email.dto';
import { MailerService } from '@nestjs-modules/mailer';


@Injectable()
export class EmailService {

  constructor(
    private configService: ConfigService,
    private readonly mailerService: MailerService
  ) { }


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

  async sendEmailRecoveryPassWithGmail({ email, firstName, lastName, token }: { email: string, firstName: string, lastName: string, token: string }) {


    try {
      const response = await this.mailerService.sendMail({
        to: `${email}`, // list of receivers
        from: 'lariosacostaa@gmail.com', // sender address
        subject: 'Recuperacion de contraseña', // Subject line
        template: `${process.cwd()}/src/email/templates/email-template.ejs`,
        html: `
        <section>
        <p>Hola ${firstName} ${lastName}</p>
        <a href="http://localhost:5173/auth/restore-password?token=${token}" target="_blank">Reestablecer contraseña</a>
        </section>
        `
      })
      return response
    } catch (error) {
      console.log(error)
      throw new BadRequestException(`thing wrong`, 'thing wrong')
    }
  }

}

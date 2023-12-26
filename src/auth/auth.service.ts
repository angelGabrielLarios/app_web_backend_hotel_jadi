import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateLoginUserDto } from './dto/create-login-user.dto';
import { CreateRegisterUserDto } from './dto/create-register-user.dto';
import { TokensService } from 'src/tokens/tokens.service';
import { EmailService } from 'src/email/email.service';
import { CreateRestorePasswordDto } from './dto/create-restore-password.dto';
import { CreateRecoveryPassByEmailDto } from './dto/create-recovery-pass-by-email.dto';


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private tokensService: TokensService,
        private emailService: EmailService,
    ) { }

    async register(createRegisterUserDto: CreateRegisterUserDto) {



        const userExistWithPhone = await this.usersService.findOneByPhoneNumber({ phoneNumber: createRegisterUserDto.phone })

        console.log(userExistWithPhone)

        if (userExistWithPhone) {
            throw new BadRequestException(`already_phone`, `This phone ${createRegisterUserDto.phone} has already been registered.`)
        }

        const userExistWithEmail = await this.usersService.findOneByEmail(createRegisterUserDto.email);

        if (userExistWithEmail) {
            throw new BadRequestException(`already_email`, `This email ${createRegisterUserDto.email} has already been registered.`)
        }

        const hashedPassword = await bcrypt.hash(createRegisterUserDto.password, 10);

        const newUser = await this.usersService.save({
            firstName: createRegisterUserDto.firstName,
            lastName: createRegisterUserDto.lastName,
            email: createRegisterUserDto.email,
            password: hashedPassword,
            phone: createRegisterUserDto.phone,
            address: createRegisterUserDto.address
        });

        const payload = {
            id: newUser.id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            phone: newUser.phone
        };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };

    }




    async login(createLoginUserDto: CreateLoginUserDto) {

        const user = await this.usersService.findOneByEmail(createLoginUserDto.email);

        if (!user) {
            throw new UnauthorizedException(`error_credentials`, `error_credentials`)
        }

        const isMatchPassword = await bcrypt.compare(createLoginUserDto.password, user.password);

        if (!isMatchPassword) {
            throw new UnauthorizedException(`error_credentials`, `error_credentials`)
        }

        const payload = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone
        };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async recoveryPassByEmail(createRecoveryPassByEmailDto: CreateRecoveryPassByEmailDto) {

        const user = await this.usersService.findOneByEmail(createRecoveryPassByEmailDto.email);

        if (!user) {
            throw new BadRequestException(`email_does_not_exist`, `To recover a password, the email must previously be in a user's account.`)
        }

        const { tokenGenerated } = await this.tokensService.save(user)

        await this.emailService.sendEmailRecoveryPassWithGmail({
            email: createRecoveryPassByEmailDto.email,
            firstName: user.firstName,
            lastName: user.lastName,
            token: tokenGenerated
        })

        return {
            emailRecoveryPass: createRecoveryPassByEmailDto.email
        }

    }

    async restorePassword({ token, email, newPassword }: CreateRestorePasswordDto) {

        const { isValidateToken } = await this.tokensService.validateToken({ token })

        if (!isValidateToken) {
            throw new BadRequestException(`invalidate_token`, `invalidate_token`)
        }
        const user = await this.usersService.findOneByEmail(email);
        console.log(user, 'desde auth_service')

        if (!user) {
            throw new BadRequestException(`email_does_not_exist`, `To recover a password, the email must previously be in a user's account.`)
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);


        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const updateUser = await this.usersService.restorePassword({
            email,
            newPassword: hashedPassword
        })

        await this.tokensService.remove({ tokenText: token })


        return {
            status: true,
            success: `restore_password`,
            message: `Restore password with successulfy`
        }
    }
}


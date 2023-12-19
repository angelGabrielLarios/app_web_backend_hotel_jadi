import {
    Body,
    Controller,
    Get,
    Patch,
    Post,
    Request,
    UseGuards
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { CreateLoginUserDto } from './dto/create-login-user.dto';
import { CreateRegisterUserDto } from './dto/create-register-user.dto';
import { CreateRestorePasswordDto } from './dto/create-restore-password.dto';
import { CreateRecoveryPassByEmailDto } from './dto/create-recovery-pass-by-email.dto';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }


    @Post('register')
    register(@Body() createRegisterUserDto: CreateRegisterUserDto) {
        return this.authService.register(createRegisterUserDto)
    }

    @Post('login')
    login(@Body() createLoginUserDto: CreateLoginUserDto) {
        return this.authService.login(createLoginUserDto)
    }

    @Post('recovery-password-by-email')
    recoveryPassByEmail(@Body() createRecoveryPassByEmailDto: CreateRecoveryPassByEmailDto) {
        return this.authService.recoveryPassByEmail(createRecoveryPassByEmailDto)
    }

    @Patch('restore-password')
    restorePassword(@Body() createRestorePasswordDto: CreateRestorePasswordDto) {
        return this.authService.restorePassword(createRestorePasswordDto)
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}


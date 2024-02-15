import {
    Body,
    Controller,
    Get,
    Post,
    Request,
    UseGuards
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { CreateLoginUserDto } from './dto/create-login-user.dto';
import { CreateRegisterUserDto } from './dto/create-register-user.dto';

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



    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}


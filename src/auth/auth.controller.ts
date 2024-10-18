import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
//import { Get, Request } from "@nestjs/common";
import { Role } from '../common/enums/role.enum';
import { Auth } from './decorators/auth.decorators';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import { ActiveUserInterface } from '../common/interfaces/active-user.interface';

// interface RequestWithUser extends Request {
//     user: { email: string; role: string };
//   }

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @Post('register')
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Get('profile')
    @Auth(Role.USER)
    profile(@ActiveUser() user: ActiveUserInterface) {
      return this.authService.profile(user);
    }
}

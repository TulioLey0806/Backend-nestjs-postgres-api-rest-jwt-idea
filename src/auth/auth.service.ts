import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async register({ password, email, name }: RegisterDto) {
      const user = await this.usersService.findOneByEmail(email);
  
      if (user) {
        throw new BadRequestException("Email already exists");
      }
  
      const hashedPassword = await bcryptjs.hash(password, 10);
  
      await this.usersService.create({
        name,
        email,
        password: hashedPassword,
      });
  
      return {
        name,
        email,
        message: "User created successfully",
      };
    }
  
    async login({ email, password }: LoginDto) {
      //const user = await this.usersService.findOneByEmail(email);
      const user = await this.usersService.findOneByEmailWithPassword(email);
  
      if (!user) {
        throw new UnauthorizedException("Invalid email");
      }
      
      // Verificando la password
      const isPasswordValid = await bcryptjs.compare(password, user.password);
  
      if (!isPasswordValid) {
         throw new UnauthorizedException("Invalid password");
      }
  
      const payload = { email: user.email, role: user.role };

      const token = await this.jwtService.signAsync(payload);    
      
      return {
        id: user.id,
        email: user.email,
        token,
      };
    }

    async profile({ email, role }: { email: string; role: string }) {
      return await this.usersService.findOneByEmail(email);
    }
  }
 
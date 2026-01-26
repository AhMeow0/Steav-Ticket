import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthGuard } from './auth.guard';
import { UseGuards, Get, Request } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { LoginDto } from './dto/login.dto';

type JwtPayload = {
  sub: string;
  email: string;
  role?: string;
};

type AuthenticatedRequest = ExpressRequest & { user: JwtPayload };

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    // Never trust role from public registration.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { role, ...safeDto } = createUserDto;
    return this.usersService.create(safeDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.authService.signIn(body.email, body.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req: AuthenticatedRequest) {
    return this.usersService.findOne(req.user.sub);
  }

}

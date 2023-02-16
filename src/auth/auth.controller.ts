import {
  BadRequestException,
  Controller,
  HttpException,
  HttpStatus,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { Get, UseGuards } from '@nestjs/common/decorators';
import {
  Body,
  Req,
} from '@nestjs/common/decorators/http/route-params.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger/dist';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger/dist/decorators';
import { Request } from 'express';

import { AuthService } from './auth.service';
import { User, User_Login } from './dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //Đăng nhập
  @ApiBody({ type: User_Login })
  @Post('login')
  async login(@Req() req: Request): Promise<string> {
    const { email, password } = req.body;
    const checkLogin = await this.authService.login(email, password);
    if (checkLogin.check) {
      return checkLogin.data;
    } else {
      throw new NotFoundException(checkLogin.data);
    }
  }

  //Đăng ký
  @ApiBody({ type: User })
  @Post('signUp')
  async signUp(@Req() req: Request): Promise<string> {
    const { email, password, name, phone, birthday, gender } = req.body;
    const signUpCheck = await this.authService.signUp(
      email,
      password,
      name,
      phone,
      birthday,
      gender,
    );
    if (signUpCheck.check) {
      return signUpCheck.data;
    } else {
      throw new HttpException(signUpCheck.data, HttpStatus.NOT_FOUND);
    }
  }
}

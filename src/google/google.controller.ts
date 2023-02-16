import { Controller,Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOAuth2, ApiTags } from '@nestjs/swagger';
import { GoogleService } from './google.service';

@ApiTags("Google Login")
@Controller('google')
export class GoogleController {

    constructor(private readonly googleService: GoogleService) {}

    
    @Get()
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) {}
  
    @Get('redirect')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req) {
      return this.googleService.googleLogin(req)
    }

}

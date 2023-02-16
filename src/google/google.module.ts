import { Module } from '@nestjs/common';
import { GoogleStrategy } from 'src/googleStrategy/google.strategy';
import { GoogleController } from './google.controller';
import { GoogleService } from './google.service';

@Module({
  controllers: [GoogleController],
  providers: [GoogleService,GoogleStrategy]
})
export class GoogleModule {}

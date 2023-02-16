import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { ReservationModule } from './reservation/reservation.module';
import { RoomModule } from './room/room.module';
import { GoogleModule } from './google/google.module';
import { EmailModule } from './email/email.module';
import { LocationModule } from './location/location.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true
  }), AuthModule, CommentModule, ReservationModule, RoomModule, GoogleModule, EmailModule, LocationModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

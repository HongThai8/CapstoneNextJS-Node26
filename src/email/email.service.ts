import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Email } from './dto';

@Injectable()
export class EmailService {
    constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(email: Email, token: string) {
    const url = `example.com/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: email.email,
      subject: 'Thank you for your Reservation!',
      template: './confirmation', // `.hbs` extension is appended automatically
      context: { // ✏️ filling curly brackets with content
        name: email.name,
        room_name: email.room_name
      },
    });
  }
}

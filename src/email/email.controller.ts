import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Email, User } from './dto';
import { EmailService } from './email.service';

@ApiTags("Email Confirmation")
@Controller('email')
export class EmailController {
    constructor(private emailService: EmailService) {}

    @ApiBody({type:Email})
    @Post("send-email")
    async sendConfirmEmai(@Body() email:Email){
        const token = Math.floor(1000 + Math.random() * 9000).toString();
        await this.emailService.sendUserConfirmation(email,token)
        return "Send Email Success"
    }
}

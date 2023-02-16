import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { users } from '@prisma/client';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { FileUploadDto } from 'src/room/dto';
import { User, UserResultDto } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUser(): Promise<users[]> {
    return this.userService.getUser();
  }

  @ApiBody({ type: User })
  @Post()
  createUser(@Body() user: User): Promise<User> {
    return this.userService.createUser(user);
  }

  @ApiParam({ name: 'user_id' })
  @Delete(':user_id')
  deleteUserByID(@Param('user_id') user_id: string): Promise<UserResultDto> {
    return this.userService.deleteUser(user_id);
  }

  @ApiParam({ name: 'pageIndex' })
  @ApiParam({ name: 'pageSize' })
  @Get('/paginate/:pageIndex/:pageSize')
  getUserPaginate(@Req() req: Request): Promise<users[]> {
    const { pageIndex, pageSize } = req.params;
    return this.userService.userPagination(
      parseInt(pageIndex),
      parseInt(pageSize),
    );
  }

  @ApiParam({ name: 'user_id' })
  @Get(':user_id')
  getUserByID(@Param('user_id') user_id: string): Promise<users> {
    return this.userService.getUserByID(user_id);
  }

  @Put(':user_id')
  updateUserByID(
    @Param('user_id') user_id: string,
    @Body() user: User,
  ): Promise<users> {
    return this.userService.updateUser(user_id, user);
  }

  @ApiParam({ name: 'username' })
  @Get('/search/:username')
  searchUsername(@Param('username') username: string): Promise<users[]> {
    return this.userService.searchUsername(username);
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'image',
    type: FileUploadDto,
  })
  @ApiParam({ name: 'user_id' })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './public/img',
        filename(req, file, callback) {
          const date = new Date();
          callback(null, `${date.getTime()}-${file.originalname}`);
        },
      }),
    }),
  )
  @Post('upload-avatar/:user_id')
  uploadUserImage(
    @Param('user_id') user_id: string,
    @UploadedFile() file: Express.Multer.File,
  ): any {
    return this.userService.uploadAvatar(user_id, file);
  }
}

import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class User {
  @ApiProperty({ description: 'user_id', type: 'number' })
  user_id: number;

  @ApiProperty({ description: 'name', type: 'string' })
  name: string;

  @ApiProperty({ description: 'email', type: 'string' })
  email: string;

  @ApiProperty({ description: 'password', type: 'string' })
  password: string;

  @ApiProperty({ description: 'phone', type: 'string' })
  phone: string;

  @ApiProperty({ description: 'birthday', type: 'string' })
  birthday: string;

  @ApiProperty({ description: 'gender', type: 'string' })
  gender: string;

  @ApiProperty({ description: 'role', type: 'string' })
  role: string;
}

export class User_Login {
  @ApiProperty({ description: 'email', type: 'string' })
  email: string;

  @ApiProperty({ description: 'password', type: 'string' })
  password: string;
}

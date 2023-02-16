import { ApiProperty } from "@nestjs/swagger";

export class User{
    @ApiProperty({description:"name",type:"string"})
    name:string;

    @ApiProperty({description:"email",type:"string"})
    email:string;

    @ApiProperty({description:"password",type:"string"})
    password:string;

    @ApiProperty({description:"phone",type:"string"})
    phone:string;

    @ApiProperty({description:"birthday",type:"string"})
    birthday:string;

    @ApiProperty({description:"gender",type:"string"})
    gender:string;

    @ApiProperty({description:"role",type:"string"})
    role:string;
}

export interface UserResultDto{
    status:boolean;
    data:any;
}
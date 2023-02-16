import { ApiProperty } from "@nestjs/swagger";

export interface User {
    email: string;
    name: string;
}

export class Email {
    @ApiProperty({description:"email",type:"string"})
    email: string;

    @ApiProperty({description:"name",type:"string"})
    name: string;

    @ApiProperty({description:"room_name",type:"string"})
    room_name: string;
}

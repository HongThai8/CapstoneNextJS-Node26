import { ApiProperty } from "@nestjs/swagger";


export class Comment{
    @ApiProperty({description:"comment_id",type:"number"})
    comment_id: number;

    @ApiProperty({description:"user_id",type:"number"})
    user_id:number;

    @ApiProperty({description:"room_id",type:"number"})
    room_id:number;

    @ApiProperty({description:"comment_date",type:"string"})
    comment_date:Date;

    @ApiProperty({description:"star",type:"number"})
    star:number;

    @ApiProperty({description:"content",type:"string"})
    content:string;
}

export class UpdateCommentDto{
    @ApiProperty({description:"star",type:"number"})
    star:number;

    @ApiProperty({description:"content",type:"string"})
    content:string;
}

export class CommentResultDto {
    status:boolean
    data:any
}
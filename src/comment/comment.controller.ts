import { Controller, Get, Delete, Post, Put, Body, Param } from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiTags } from '@nestjs/swagger/dist';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger/dist/decorators';

import { comments } from '@prisma/client';
import { Comment, CommentResultDto, UpdateCommentDto } from './dto';

@ApiTags("Comment")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
@Controller("comment")
export class CommentController {
    constructor(
        private commentService: CommentService
    ) { }


    @Get()
    getComment(): Promise<comments[]> {
        return this.commentService.getComments();
    }


    @Post()
    postComment(@Body() comment: Comment): Promise<Comment> {
        return this.commentService.postComments(comment);
    }

    @ApiParam({ name: "id" })
    @Put("/:id")
    putComment(@Param("id") id:string,@Body() comment: UpdateCommentDto): Promise<CommentResultDto> {
        return this.commentService.updateComments(id,comment);
    }

    @ApiParam({ name: "id" })
    @Delete("/:id")
    deleteComment(@Param("id") id:string): Promise<CommentResultDto> {
        return this.commentService.deleteComments(id);
    }

    @ApiParam({ name: "room_id" })
    @Get("/get-comment-by-room/:room_id")
    getCommentByRoom(@Param("room_id") room_id:string): Promise<comments[]> {
        return this.commentService.getCommentByRoomID(room_id)
    }
}

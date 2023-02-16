import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { comments, PrismaClient } from '@prisma/client';
import { Comment, CommentResultDto, UpdateCommentDto } from './dto';



@Injectable()
export class CommentService {
    constructor(
        private config:ConfigService
    ){}
    private prisma: PrismaClient = new PrismaClient();

    async getComments():Promise<comments[]>{
        return await this.prisma.comments.findMany();
    }

    async postComments(comment:Comment):Promise<Comment>{
        return await this.prisma.comments.create({ 
            data:{
                user_id:comment.user_id,
                room_id:comment.room_id,
                content:comment.content,
                star:comment.star
            }
        });
    }

    async updateComments(comment_id:string,comment:UpdateCommentDto):Promise<CommentResultDto>{
        try {
            let res =await this.prisma.comments.update({ 
                data:{
                    content:comment.content,
                    star:comment.star,
                    comment_date:new Date()
                },
                where:{
                    comment_id:parseInt(comment_id)
                }
            });
            return {
                status:true,
                data:res
            }
        } catch (error) {
            return {
                status:false,
                data:error
            }
        }
        
    }

    async deleteComments(comment_id:string):Promise<CommentResultDto>{
        try {
            let res =await this.prisma.comments.delete({ 
                where:{
                    comment_id:parseInt(comment_id)
                }
            });
            return {
                status:true,
                data:"Delete comment Success!"
            }
        } catch (error) {
            return {
                status:false,
                data:error
            }
        }
        
    }
    async getCommentByRoomID(room_id:string):Promise<comments[]>{
        try {
            let res =await this.prisma.comments.findMany({ 
                where:{
                    room_id:parseInt(room_id)
                }
            });
            return res
        } catch (error) {
            return error
        }
        
    }
}

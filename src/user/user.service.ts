import { Injectable } from '@nestjs/common';
import { PrismaClient, users } from '@prisma/client';
import { User, UserResultDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { ResultDto } from 'src/room/dto';

const fs = require('fs');

@Injectable()
export class UserService {

    private prisma: PrismaClient = new PrismaClient();

    async getUser(): Promise<users[]> {
        return await this.prisma.users.findMany()
    }

    async createUser(user:User): Promise<users> {
        let passWordHash = bcrypt.hashSync(user.password, 10);
        return await this.prisma.users.create({
            data:{
                email: user.email,
                password: passWordHash,
                phone: user.phone,
                name: user.name,
                birthday: user.birthday,
                gender:user.gender,
                role: user.role
            }
        })
    }

    async deleteUser(user_id: string):Promise<UserResultDto>{
        try {
            let res =await this.prisma.users.delete({
                where:{
                   user_id:parseInt(user_id)
                }
            })
            return {
                status:true,
                data:`Delete user ${user_id} successfully!`
            }
        } catch (error) {
            return {
                status:false,
                data:`Error deleting user ${user_id}`
            }
        }
        
    }

    async userPagination(pageIndex:number,pageSize:number): Promise<users[]> {
        
        return await this.prisma.users.findMany({
            skip:pageIndex*pageSize,
            take:pageSize
        })
    }

    async getUserByID(user_id:string): Promise<users> {
        return await this.prisma.users.findUnique({
            where:{
                user_id:parseInt(user_id)
            }
        })
    }

    async updateUser(user_id:string,user:User): Promise<users> {
        let passWordHash
        if(user.password){
            passWordHash = bcrypt.hashSync(user.password, 10);
        }
        
        return await this.prisma.users.update({
            where:{
                user_id:parseInt(user_id)
            },
            data:{
                email: user.email,
                password: passWordHash,
                phone: user.phone,
                name: user.name,
                birthday: user.birthday,
                gender:user.gender,
                role: user.role
            }
        })
    }

    async searchUsername(username:string): Promise<users[]>{
        return await this.prisma.users.findMany({
            where: {
                name: {
                  contains: username,
                },
              },
        })
    }

    async uploadAvatar(user_id: string, file: Express.Multer.File): Promise<ResultDto> {
        if (file.size >= 400000) {
            return {
                status: false,
                data: "Only upload 4Mb file!"
            }
        }
        if (file.mimetype != "image/jpeg" && file.mimetype != "image/jpg" && file.mimetype != "image/png") {
            return {
                status: false,
                data: "Wrong format, jpeg/jpg/png only!"
            }
        }

        fs.readFile(process.cwd() + "/public/img/" + file.filename, async (err, data) => {


            let image_path = `data:${file.mimetype};base64,${Buffer.from(data).toString("base64")}`;


            await this.prisma.user_image.create({
                data: {
                    user_id: parseInt(user_id),
                    image_path: image_path
                }
            })

        })
        return {
            status: true,
            data: "Upload Image Success"
        }

    }
}

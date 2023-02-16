import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { PrismaClient, Prisma, rooms } from '@prisma/client';

const fs = require('fs');

import { ResultDto } from './dto';

@Injectable()
export class RoomService {

    

    private prisma: PrismaClient = new PrismaClient();

    async getRoom(): Promise<rooms[]> {
        return await this.prisma.rooms.findMany();
    }

    async createRoom(
        room_name: string,
        guest: number,
        bedroom: number,
        bed: number,
        bathroom: number,
        description: string,
        price: number,
        washer: boolean,
        iron: boolean,
        tv: boolean,
        air_condition: boolean,
        wifi: boolean,
        kitchen: boolean,
        parking_lot: boolean,
        pool: boolean,
        location_id: number
    ): Promise<ResultDto> {
        let data = await this.prisma.rooms.create({
            data: {
                room_name,
                guest,
                bedroom,
                bed,
                bathroom,
                description,
                price,
                washer,
                iron,
                tv,
                air_condition,
                wifi,
                kitchen,
                parking_lot,
                pool,
                location_id
            }
        })
        return {
            status: true,
            data
        }
    }

    async getRoomByLocation(location_id: string): Promise<rooms[]> {
        return await this.prisma.rooms.findMany({
            where: {
                location_id: parseInt(location_id)
            }
        })
    }


    async roomPagination(pageIndex:number,pageSize:number): Promise<rooms[]> {
        
        return await this.prisma.rooms.findMany({
            skip:pageIndex*pageSize,
            take:pageSize
        })
    }

    async getRoomByID(room_id:string): Promise<rooms> {
        return await this.prisma.rooms.findUnique({
            where:{
                room_id:parseInt(room_id)
            }
        })
    }

    async updateRoomByID(
        room_id:string,
        room_name: string,
        guest: number,
        bedroom: number,
        bed: number,
        bathroom: number,
        description: string,
        price: number,
        washer: boolean,
        iron: boolean,
        tv: boolean,
        air_condition: boolean,
        wifi: boolean,
        kitchen: boolean,
        parking_lot: boolean,
        pool: boolean,
        location_id: number): Promise<rooms> {
        return await this.prisma.rooms.update({
            where:{
                room_id:parseInt(room_id)
            },
            data: {
                room_name,
                guest,
                bedroom,
                bed,
                bathroom,
                description,
                price,
                washer,
                iron,
                tv,
                air_condition,
                wifi,
                kitchen,
                parking_lot,
                pool,
                location_id
            },
        })
    }

    async deleteRoomByID(room_id: string):Promise<ResultDto>{
        try {
            let res =await this.prisma.rooms.delete({
                where:{
                    room_id:parseInt(room_id)
                }
            })
            return {
                status:true,
                data:`Delete room ${room_id} successfully!`
            }
        } catch (error) {
            return {
                status:false,
                data:`Error deleting room ${room_id}`
            }
        }
        
    }

    async uploadRoomImage(room_id: string, file: Express.Multer.File): Promise<ResultDto> {
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


            await this.prisma.room_image.create({
                data: {
                    room_id: parseInt(room_id),
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



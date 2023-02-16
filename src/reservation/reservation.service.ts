import { Injectable } from '@nestjs/common';
import {  PrismaClient, reserve } from '@prisma/client';
import { Reservation, ReserveResultDto } from './dto';

@Injectable()
export class ReservationService {

    private prisma: PrismaClient = new PrismaClient();

    async getReservation(): Promise<reserve[]> {
        return await this.prisma.reserve.findMany()
    }

    async createReservation(reserve:reserve): Promise<reserve> {
        console.log((new Date(reserve.date_in)));
        return await this.prisma.reserve.create({
            data:{
                room_id:reserve.room_id,
                date_in:new Date(reserve.date_in),
                date_out:new Date(reserve.date_out),
                guest_amount:reserve.guest_amount,
                user_id:reserve.user_id
            }
        })
    }

    async getResereByID(reserve_id:string): Promise<reserve> {
        return await this.prisma.reserve.findUnique({
            where:{
                reserve_id:parseInt(reserve_id)
            }
        })
    }

    async updateReserve(reserve_id: string,reserve:Reservation): Promise<reserve> {
        return await this.prisma.reserve.update({
            where:{
                reserve_id:parseInt(reserve_id)
            },
            data:{
                room_id:reserve.room_id,
                date_in:new Date(reserve.date_in),
                date_out:new Date(reserve.date_out),
                guest_amount:reserve.guest_amount,
                user_id:reserve.user_id
            }
        })
    }

    async deleteReserveByID(reserve_id: string):Promise<ReserveResultDto>{
        try {
            let res =await this.prisma.reserve.delete({
                where:{
                    reserve_id:parseInt(reserve_id)
                }
            })
            return {
                status:true,
                data:`Delete reserve ${reserve_id} successfully!`
            }
        } catch (error) {
            return {
                status:false,
                data:`Error deleting reserve ${reserve_id}`
            }
        }
        
    }

    async getResereByUserID(user_id:string):Promise<reserve[]>{
        return await this.prisma.reserve.findMany({
            where: {
                user_id:parseInt(user_id)
            }
        })
    }
}

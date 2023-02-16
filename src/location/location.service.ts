import { Injectable } from '@nestjs/common';
import { location, PrismaClient } from '@prisma/client';
import { Location, LocationResultDto, LocationUpdateDto } from './dto';

@Injectable()
export class LocationService {

    private prisma: PrismaClient = new PrismaClient();

    async getLocation(): Promise<location[]> {
        return await this.prisma.location.findMany()
    }

    async createLocation(loc:location): Promise<location> {
        return await this.prisma.location.create({
            data:{
                location_name:loc.location_name,
                province:loc.province,
                country:loc.country
            }
        })
    }

    async locationPagination(pageIndex:number,pageSize:number): Promise<location[]> {
        
        return await this.prisma.location.findMany({
            skip:pageIndex*pageSize,
            take:pageSize
        })
    }

    async getLocationByID(location_id:string): Promise<location> {
        return await this.prisma.location.findUnique({
            where:{
                location_id:parseInt(location_id)
            }
        })
    }

    async updateLocation(location_id:string,loc:LocationUpdateDto): Promise<location> {
        return await this.prisma.location.update({
            where:{
                location_id:parseInt(location_id)
            },
            data:{
                location_name:loc.location_name,
                province:loc.province,
                country:loc.country
            }
        })
    }

    async deleteLocationByID(location_id: string):Promise<LocationResultDto>{
        try {
            let res =await this.prisma.location.delete({
                where:{
                    location_id:parseInt(location_id)
                }
            })
            return {
                status:true,
                data:`Delete location ${location_id} successfully!`
            }
        } catch (error) {
            return {
                status:false,
                data:`Error deleting location ${location_id}`
            }
        }
        
    }
}

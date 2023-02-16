import { Controller, Get, Post, UseGuards, Param } from '@nestjs/common';
import { Delete, Put, Req, UploadedFile, UseInterceptors } from '@nestjs/common/decorators';

import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { rooms } from '@prisma/client';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { FileUploadDto, PaginateDto, ResultDto, Room, } from './dto/room.dto';
import { RoomService } from './room.service';


@ApiTags("Room")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
@Controller('room')
export class RoomController {

    constructor(
        private roomService: RoomService
    ) { }

    //Get all Room
    @Get()
    getRooms(): Promise<rooms[]> {
        return this.roomService.getRoom()
    }

    //Create New Room
    @ApiBody({ type: Room })
    @Post()
    createRoom(@Req() req: Request): Promise<any> {
        const {
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
            location_id } = req.body;
        return this.roomService.createRoom(
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
        );
    }

    //Get Room By Location
    @ApiParam({ name: "location_id" })
    @Get("location/:location_id")
    getRoomByLocationID(@Param("location_id") location_id: string) {
        return this.roomService.getRoomByLocation(location_id);
    }

    //Get Room Paginate
    @ApiParam({ name: "pageIndex" })
    @ApiParam({ name: "pageSize" })
    @Get("/paginate/:pageIndex/:pageSize")
    getRoomPaginate(@Req() req: Request): Promise<rooms[]> {
        const { pageIndex, pageSize } = req.params
        return this.roomService.roomPagination(parseInt(pageIndex), parseInt(pageSize))
    }

    //Get Room By ID
    @ApiParam({ name: "room_id" })
    @Get(":room_id")
    getRoomByID(@Param("room_id") room_id: string): Promise<rooms> {

        return this.roomService.getRoomByID(room_id)
    }

    //Update Room By ID
    @ApiParam({ name: "room_id" })
    @ApiBody({ type: Room })
    @Put(":room_id")
    updateRoomByID(@Param("room_id") room_id: string, @Req() req: Request): Promise<rooms> {
        const {
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
            location_id } = req.body;
        return this.roomService.updateRoomByID(
            room_id,
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
            location_id)
    }

    //Delete Room By ID
    @ApiParam({ name: "room_id" })
    @Delete(":room_id")
    deleteRoomByID(@Param("room_id") room_id: string): Promise<ResultDto> {
        return this.roomService.deleteRoomByID(room_id)
    }

    //Upload Room Image
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: "image",
        type: FileUploadDto
    })
    @ApiParam({ name: "room_id" })
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: "./public/img",
            filename(req, file, callback) {
                let date = new Date();
                callback(null, `${date.getTime()}-${file.originalname}`)
            },
        }),

    }))
    @Post("upload-room-image/:room_id")
    uploadRoomImage(@Param("room_id") room_id: string, @UploadedFile() file: Express.Multer.File): any {

        return this.roomService.uploadRoomImage(room_id, file)
    }
}

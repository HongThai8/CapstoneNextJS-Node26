import { ApiProperty } from "@nestjs/swagger"

export class Room {

    @ApiProperty({description:"Room_name",type:"string"})
    room_name: string

    @ApiProperty({description:"Guest",type:"number"})
    guest: number

    @ApiProperty({description:"Bedroom",type:"number"})
    bedroom: number

    @ApiProperty({description:"Bed",type:"number"})
    bed: number

    @ApiProperty({description:"Bathroom",type:"number"})
    bathroom: number

    @ApiProperty({description:"Description",type:"string"})
    description: string

    @ApiProperty({description:"Price",type:"number"})
    price: number

    @ApiProperty({description:"Washer",type:"boolean"})
    washer: boolean

    @ApiProperty({description:"Iron",type:"boolean"})
    iron: boolean

    @ApiProperty({description:"TV",type:"boolean"})
    tv: boolean

    @ApiProperty({description:"Air_condition",type:"boolean"})
    air_condition: boolean

    @ApiProperty({description:"Wifi",type:"boolean"})
    wifi: boolean

    @ApiProperty({description:"Kitchen",type:"boolean"})
    kitchen: boolean

    @ApiProperty({description:"Parking_lot",type:"boolean"})
    parking_lot: boolean

    @ApiProperty({description:"Pool",type:"boolean"})
    pool: boolean

    @ApiProperty({description:"Location_id",type:"number"})
    location_id: number
}

// export interface UploadDto {
//     "fieldname": string,
//     "originalname": string,
//     "encoding": string,
//     "mimetype": string,
//     "destination": string,
//     "filename": string,
//     "path": string,
//     "buffer": Blob,
//     "size": number
// }

export interface ResultDto{
    status:boolean,
    data:any
}

export class FileUploadDto {
    @ApiProperty({type: 'file'  })
    image: any;
}

export class PaginateDto{
    @ApiProperty({description:"pageIndex",name:"pageIndex"})
    pageIndex:number;

    @ApiProperty({description:"pageIndex",name:"pageNumber"})
    pageSize:number;
}
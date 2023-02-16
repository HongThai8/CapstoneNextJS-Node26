import { ApiProperty } from "@nestjs/swagger";

export class Location{
    @ApiProperty({description:"location_id",type:"number"})
    location_id: number;

    @ApiProperty({description:"location_name",type:"string"})
    location_name:string;

    @ApiProperty({description:"province",type:"string"})
    province:string;

    @ApiProperty({description:"country",type:"string"})
    country:string

    @ApiProperty({description:"image",type:"string"})
    image:string
}

export class LocationUpdateDto{
    @ApiProperty({description:"location_name",type:"string"})
    location_name:string;

    @ApiProperty({description:"province",type:"string"})
    province:string;

    @ApiProperty({description:"country",type:"string"})
    country:string
}

export interface LocationResultDto{
    status:boolean;
    data:any
}


import { ApiProperty } from "@nestjs/swagger";

export class Reservation {
    @ApiProperty({ description: "room_id", type: "number" })
    room_id: number;

    @ApiProperty({ description: "date_in", type: "string" })
    date_in: Date;

    @ApiProperty({ description: "date_out", type: "string" })
    date_out: Date;

    @ApiProperty({ description: "guest_amount", type: "number" })
    guest_amount: number;

    @ApiProperty({ description: "user_id", type: "number" })
    user_id: number;
}

export interface ReserveResultDto{
    status:boolean,
    data:string;
}
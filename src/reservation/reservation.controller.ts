import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { ReservationService } from './reservation.service';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { reserve } from '@prisma/client';
import { Reservation, ReserveResultDto } from './dto';

@ApiTags('Reservation')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('reservation')
export class ReservationController {
  constructor(private reserveService: ReservationService) {}

  @Get()
  getReserve(): Promise<reserve[]> {
    return this.reserveService.getReservation();
  }

  @ApiBody({ type: Reservation })
  @Post()
  createReserve(@Body() reserve: reserve): Promise<reserve> {
    return this.reserveService.createReservation(reserve);
  }

  @ApiParam({ name: 'reserve_id' })
  @Get(':reserve_id')
  getReserveByID(@Param('reserve_id') reserve_id: string): Promise<reserve> {
    return this.reserveService.getResereByID(reserve_id);
  }

  @Put(':reserve_id')
  updateReserveByID(
    @Param('reserve_id') reserve_id: string,
    @Body() reserve: Reservation,
  ): Promise<reserve> {
    return this.reserveService.updateReserve(reserve_id, reserve);
  }

  @ApiParam({ name: 'reserve_id' })
  @Delete(':reserve_id')
  deleteReserveByID(
    @Param('reserve_id') reserve_id: string,
  ): Promise<ReserveResultDto> {
    return this.reserveService.deleteReserveByID(reserve_id);
  }

  @ApiParam({ name: 'user_id' })
  @Get('get-reserve-by-user/:user_id')
  getReserveByUserID(@Param('user_id') user_id: string): Promise<reserve[]> {
    return this.reserveService.getResereByUserID(user_id);
  }
}

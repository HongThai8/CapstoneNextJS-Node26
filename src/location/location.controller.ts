import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { location } from '@prisma/client';
import { Location, LocationResultDto, LocationUpdateDto } from './dto';
import { LocationService } from './location.service';
import { Request } from 'express';

@ApiTags('Location')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('location')
export class LocationController {
  constructor(private locationService: LocationService) {}

  @Get()
  getLocation(): Promise<location[]> {
    return this.locationService.getLocation();
  }

  @ApiBody({ type: Location })
  @Post()
  postComment(@Body() location: location): Promise<location> {
    return this.locationService.createLocation(location);
  }

  @ApiParam({ name: 'pageIndex' })
  @ApiParam({ name: 'pageSize' })
  @Get('/paginate/:pageIndex/:pageSize')
  getLocationPaginate(@Req() req: Request): Promise<location[]> {
    const { pageIndex, pageSize } = req.params;
    return this.locationService.locationPagination(
      parseInt(pageIndex),
      parseInt(pageSize),
    );
  }

  @ApiParam({ name: 'location_id' })
  @Get(':location_id')
  getLocationByID(
    @Param('location_id') location_id: string,
  ): Promise<location> {
    return this.locationService.getLocationByID(location_id);
  }

  @Put(':location_id')
  updateLocationByID(
    @Param('location_id') location_id: string,
    @Body() location: LocationUpdateDto,
  ): Promise<location> {
    return this.locationService.updateLocation(location_id, location);
  }

  @ApiParam({ name: 'location_id' })
  @Delete(':location_id')
  deleteLocationByID(
    @Param('location_id') location_id: string,
  ): Promise<LocationResultDto> {
    return this.locationService.deleteLocationByID(location_id);
  }
}

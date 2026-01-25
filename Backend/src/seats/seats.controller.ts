import { Controller, Get, Param } from '@nestjs/common';
import { SeatsService } from './seats.service';

@Controller('seats')
export class SeatsController {
  constructor(private readonly seatsService: SeatsService) {}

  @Get('trip/:tripId')
  async getTripSeats(@Param('tripId') tripId: string) {
    return this.seatsService.getSeatsByTrip(tripId);
  }
}

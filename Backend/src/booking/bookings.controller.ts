import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { HoldSeatsDto } from './dto/hold-seats.dto';
import { AuthGuard } from '../auth/auth.guard';
import type { Request } from 'express';

type AuthedRequest = Request & { user: { sub: string } };

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post('hold')
  @UseGuards(AuthGuard)
  async hold(@Body() dto: HoldSeatsDto, @Req() req: AuthedRequest) {
    // TODO: compute real totalPrice from Trip/Route price
    const totalPrice = dto.seatNos.length * 5; // dummy price
    return this.bookingsService.holdAndCreateBooking({
      tripId: dto.tripId,
      seatNos: dto.seatNos,
      userId: req.user.sub,
      totalPrice,
    });
  }
}

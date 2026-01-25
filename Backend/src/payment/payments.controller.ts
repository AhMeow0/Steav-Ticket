import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { AuthGuard } from '../auth/auth.guard';
import { BookingsService } from '../booking/bookings.service';
import type { Request } from 'express';

type AuthedRequest = Request & { user: { sub: string } };

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly bookingsService: BookingsService,
  ) {}

  @Post('mock')
  @UseGuards(AuthGuard)
  async mockPay(
    @Body() body: { bookingId: string },
    @Req() req: AuthedRequest,
  ) {
    const userId = req.user.sub;
    const booking = await this.bookingsService.getById(body.bookingId, userId);

    const pay = this.paymentsService.mockPay(booking.totalPrice);
    if (pay.success) {
      await this.bookingsService.markPaid(body.bookingId, userId);
    }
    return pay;
  }
}

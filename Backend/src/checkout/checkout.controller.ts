import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CheckoutService } from './checkout.service';
import type { Request } from 'express';

type AuthedRequest = Request & { user: { sub: string } };

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post('confirm')
  @UseGuards(AuthGuard)
  async confirm(
    @Body() body: { bookingId: string },
    @Req() req: AuthedRequest,
  ) {
    const userId = req.user.sub;
    return this.checkoutService.confirmPaidBooking({
      bookingId: body.bookingId,
      userId,
    });
  }
}

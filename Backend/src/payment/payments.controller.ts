import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { AuthGuard } from '../auth/auth.guard';
import { BookingsService } from '../booking/bookings.service';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly bookingsService: BookingsService,
  ) {}

  /**
   * STEP 1 — Create booking + Stripe intent
   */
  @Post('intent')
  @UseGuards(AuthGuard)
  async createPaymentIntent(
    @Body() body: { scheduleId: string; seats: string[] },
    @Req() req,
  ) {
    const userId = req.user.id;
    const { scheduleId, seats } = body;

    // 1️⃣ Calculate total amount
    const totalPrice = await this.bookingsService.calculateTotalPrice(
      scheduleId,
      seats,
    );

    // 2️⃣ Create booking with PENDING status
    const booking = await this.bookingsService.holdAndCreateBooking({
      tripId: scheduleId,
      seatNos: seats,
      userId,
      totalPrice,
    });

    // 3️⃣ Create Stripe payment intent
    const clientSecret = await this.paymentsService.createIntent(totalPrice);

    return {
      clientSecret,
      bookingId: booking._id.toString(),
    };
  }

  /**
   * STEP 2 — Confirm payment (Stripe success)
   */
  @Post('confirm')
  @UseGuards(AuthGuard)
  async confirmPayment(@Body() body: { bookingId: string }, @Req() req) {
    const userId = req.user.id;
    const { bookingId } = body;

    const booking = await this.bookingsService.markPaid(bookingId, userId);

    return {
      success: true,
      booking,
    };
  }

  /**
   * Fake payments (testing only)
   */
  @Post('mock')
  @UseGuards(AuthGuard)
  async mockPay(@Body('amount') amount: number) {
    return this.paymentsService.mockPay(amount);
  }
}

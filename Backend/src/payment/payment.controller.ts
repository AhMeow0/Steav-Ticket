import { Controller, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payment.service';

@Controller('payments')
export class PaymentsController {
  constructor(private paymentService: PaymentsService) {}

  @Post('intent')
  async createIntent(@Body() body: any) {
    const { userId, scheduleId, seats } = body;

    const intent = await this.paymentService.createPaymentIntent({
      userId,
      scheduleId,
      seats,
    });

    return { clientSecret: intent.client_secret };
  }
}

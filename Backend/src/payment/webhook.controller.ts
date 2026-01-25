import {
  Controller,
  Post,
  Req,
  HttpCode,
  BadRequestException,
} from '@nestjs/common';
import Stripe from 'stripe';
import { NotificationsService } from '../notification/noti.service';

@Controller('webhook')
export class WebhookController {
  private stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    // Remove apiVersion so Stripe chooses automatically
    // OR use the correct version for your SDK:
    // apiVersion: "2025-12-15.clover",
  });

  constructor(private notifService: NotificationsService) {}

  @Post('stripe')
  @HttpCode(200)
  async handleStripeWebhook(@Req() req: any) {
    const sig = req.headers['stripe-signature'];

    let event;

    try {
      event = this.stripe.webhooks.constructEvent(
        req.rawBody,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!, // <-- ADD !
      );
    } catch (err) {
      throw new BadRequestException(`Webhook error: ${err.message}`);
    }

    if (event.type === 'payment_intent.succeeded') {
      const intent = event.data.object;

      await this.notifService.create({
        userId: intent.metadata.userId,
        message: `Payment successful for ${intent.metadata.seats} seats.`,
      });
    }

    return { received: true };
  }
}

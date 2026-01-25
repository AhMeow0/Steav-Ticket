import { Inject, Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  constructor(
    @Inject('STRIPE') private readonly stripe: Stripe,
  ) {}

  async createIntent(amount: number) {
    // Stripe requires cents
    const intent = await this.stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
    });

    return intent.client_secret;
  }

  // Keep mockPay if you still want fake payments
  mockPay(amount: number) {
    const ok = Math.random() < 0.9;
    return {
      success: ok,
      transactionId: ok ? `TX-${Date.now()}` : null,
      message: ok ? 'Payment success' : 'Payment failed',
      amount,
    };
  }
}

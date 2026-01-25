import { Injectable } from '@nestjs/common'
import Stripe from 'stripe'

@Injectable()
export class StripeService {
  private stripe: Stripe

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)
  }

  async chargeCard(amount: number, paymentMethodId: string) {
    return this.stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      },
    })
  }
}

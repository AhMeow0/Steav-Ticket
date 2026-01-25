import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Stripe from 'stripe';
import { Schedule } from '../schedule/schema/schedule.schema';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor(
    @InjectModel(Schedule.name)
    private scheduleModel: Model<Schedule>,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2025-12-15.clover",
    });
  }

  async createPaymentIntent(data: { userId: string; scheduleId: string; seats: string[] }) {

    // 1. Fetch schedule
    const schedule = await this.scheduleModel.findById(data.scheduleId);
    if (!schedule) throw new NotFoundException("Schedule not found");

    // 2. Calculate price
    const amount = schedule.price * data.seats.length * 100;

    // 3. Create Stripe PaymentIntent
    return this.stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      metadata: {
        userId: data.userId,
        scheduleId: data.scheduleId,
        seats: JSON.stringify(data.seats),
      },
    });
  }
}

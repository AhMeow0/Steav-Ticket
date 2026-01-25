import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { BookingsModule } from '../booking/bookings.module';
import { SeatsModule } from '../seats/seats.module';    
import Stripe from 'stripe';

@Module({
  imports: [
    BookingsModule,
    SeatsModule,                                       
  ],
  providers: [
    PaymentsService,
    {
      provide: 'STRIPE',
      useFactory: () =>
        new Stripe(process.env.STRIPE_SECRET_KEY!, {
          apiVersion: '2023-10-16' as any,
        }),
    },
  ],
  controllers: [PaymentsController],
})
export class PaymentsModule {}

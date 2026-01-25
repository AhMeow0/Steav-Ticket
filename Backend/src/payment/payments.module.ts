import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { BookingsModule } from '../booking/bookings.module';
import { SeatsModule } from '../seats/seats.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Module({
  imports: [
    ConfigModule,     // <--- REQUIRED
    BookingsModule,
    SeatsModule,
  ],
  providers: [
    PaymentsService,
    {
      provide: 'STRIPE',
      useFactory: (config: ConfigService) => {
        const key = config.get<string>('STRIPE_SECRET_KEY');
        console.log('Loaded Stripe key:', key);

        if (!key) {
          throw new Error('Missing STRIPE_SECRET_KEY in environment variables');
        }

        return new Stripe(key, {
          apiVersion: '2023-10-16' as any,
        });
      },
      inject: [ConfigService],
    }

  ],
  controllers: [PaymentsController],
})
export class PaymentsModule {}

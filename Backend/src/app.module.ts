import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketsModule } from './tickets/tickets.module';
import { RoutesModule } from './routes/routes.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BusModule } from './buses/buses.module';
import { PromotionModule } from './promotions/promotions.modules';//
import { ScheduleModule } from './schedule/schedule.module';
//import { ScheduleModule } from '@nestjs/schedule';
import { AdminModule } from './admin/admin.module';
import { TicketPricesModule } from './ticket-prices/ticket-prices.module';
import { SeatsModule } from './seats/seats.module';
import { BookingsModule } from './booking/bookings.module';
import { PaymentsModule } from './payment/payments.module';
import { CheckoutModule } from './checkout/checkout.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',   // <-- LOAD THIS FILE
    }),

    MongooseModule.forRoot('mongodb://localhost:27017/bus-ticket'),
    TicketsModule,
    RoutesModule,
    UsersModule,
    AuthModule,
    BusModule,
    PromotionModule,
    //ScheduleModule.forRoot(),
    AdminModule,
    TicketPricesModule,
    SeatsModule,
    BookingsModule,
    PaymentsModule,
    CheckoutModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  
}
)

export class AppModule {}
console.log("Loaded Stripe key:", process.env.STRIPE_SECRET_KEY);
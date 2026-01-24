import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketsModule } from './tickets/tickets.module';
import { RoutesModule } from './routes/routes.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BusModule } from './buses/buses.module';
import { PromotionModule } from './promotions/promotions.modules';
import { ScheduleModule } from './schedule/schedule.module';
import { AdminModule } from './admin/admin.module';
import { TicketPricesModule } from './ticket-prices/ticket-prices.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/bus-ticket'),
    TicketsModule,
    RoutesModule,
    UsersModule,
    AuthModule,
    BusModule,
    PromotionModule,
    ScheduleModule,
    AdminModule,
    TicketPricesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
